/**
 * @see https://github.com/sereneinserenade/tiptap-languagetool/blob/main/src/components/extensions/languagetool.ts
 * @format
 */
import { debounce } from 'lodash'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, collection, addDoc, getDocs, updateDoc, query } from 'firebase/firestore'
import { Decoration, DecorationSet, EditorView } from 'prosemirror-view'
import { Extension } from '@tiptap/core'
import { Node as PMModel } from 'prosemirror-model'
import { Plugin, PluginKey, Transaction } from 'prosemirror-state'
import { v4 as uuidv4 } from 'uuid'

import {
  LanguageToolResponse,
  Match,
  TextNodesWithPosition,
  LanguageToolOptions,
  LanguageToolStorage,
  ltTypes,
  LTMeta,
} from './language-types'
import { fetchProof } from './language-service'
import { changedDescendants, getBiasMatches, moreThan500Words, selectElementText } from './language-helpers'
import IgnoredDB from '@common/helpers/db'
import { auth, db } from '@common/services/firebase'

let DB: IgnoredDB
let editorView: EditorView
let decorationSet: DecorationSet
let extensionDocId: string | number
let textNodesWithPosition: TextNodesWithPosition[] = []
let match: Match | undefined = undefined
let proofReadInitially = false

const dispatch = (tr: Transaction) => editorView.dispatch(tr)

const updateMatch = (m?: Match) => {
  if (m) match = m
  else match = undefined

  editorView.dispatch(editorView.state.tr.setMeta('matchUpdated', true))
}

const mouseEnterEventListener = (e: Event) => {
  if (!e.target) return
  selectElementText(e.target)

  const matchString = (e.target as HTMLSpanElement).getAttribute('match')

  if (matchString) updateMatch(JSON.parse(matchString))
  else updateMatch()
}

const mouseLeaveEventListener = () => updateMatch()

const addListenerDecorations = () => {
  const decos = document.querySelectorAll('.lt')

  if (decos.length) {
    decos.forEach(el => {
      el.addEventListener('click', mouseEnterEventListener)
      el.addEventListener('mouseleave', mouseLeaveEventListener)
    })
  }
}

const decorate = (from: number, to: number, match: Match) =>
  Decoration.inline(from, to, {
    class: `lt lt-${match.rule.issueType}`,
    nodeName: ltTypes.includes(match.rule.issueType as any) ? 'mark' : 'span',
    match: JSON.stringify(match),
    uuid: uuidv4(),
  })

const proofDecoratorJIT = async (node: PMModel, offset: number, cur: PMModel) => {
  console.log('proofDecoratorJIT')
  if (editorView?.state) dispatch(editorView.state.tr.setMeta(LTMeta.LoadingTransaction, false))

  const ltRes: LanguageToolResponse = await fetchProof(node.textContent)
  const nodeSpecificDecorations: Decoration[] = []
  let { matches } = ltRes

  decorationSet = decorationSet.remove(decorationSet.find(offset, offset + node.nodeSize))

  // TODO: Migrate to AI plugin
  matches.push(...(await getBiasMatches(node.textContent)))

  for (const match of matches) {
    const from = match.offset + offset
    const to = from + match.length

    if (extensionDocId) {
      const content = editorView.state.doc.textBetween(from, to)
      const result = await DB.ignoredWords.get({ value: content })

      if (!result) nodeSpecificDecorations.push(decorate(from, to, match))
    } else {
      nodeSpecificDecorations.push(decorate(from, to, match))
    }
  }

  decorationSet = decorationSet.add(cur, nodeSpecificDecorations)

  if (editorView?.state) dispatch(editorView.state.tr.setMeta(LTMeta.InitTransaction, true))
}

const debouncedProofDecorator = debounce(proofDecoratorJIT, 500)

const proofDecoratorDOC = async (doc: PMModel, text: string, originalFrom: number) => {
  console.log('proofDecoratorDOC')
  const ltRes = await fetchProof(text)

  let { matches } = ltRes
  const decorations: Decoration[] = []

  // TODO: Migrate to AI plugin
  matches.push(...(await getBiasMatches(text)))

  for (const match of matches) {
    if (!match) return
    const from = match.offset + originalFrom
    const to = from + match.length

    if (extensionDocId) {
      const content = doc.textBetween(from, to)
      const result = await DB.ignoredWords.get({ value: content })

      if (!result) decorations.push(decorate(from, to, match))
    } else {
      decorations.push(decorate(from, to, match))
    }
  }

  decorationSet = decorationSet.remove(decorationSet.find(originalFrom, originalFrom + text.length))
  decorationSet = decorationSet.add(doc, decorations)

  if (editorView) dispatch(editorView.state.tr.setMeta(LTMeta.InitTransaction, true))

  setTimeout(addListenerDecorations)
}

const proofDoc = async (doc: PMModel) => {
  textNodesWithPosition = []

  let index = 0
  doc?.descendants((node, pos) => {
    if (node.isText) {
      if (textNodesWithPosition[index]) {
        const text = textNodesWithPosition[index].text + node.text
        const from = textNodesWithPosition[index].from
        const to = from + text.length

        textNodesWithPosition[index] = { text, from, to }
      } else {
        const text = node.text as string
        const from = pos
        const to = pos + text.length

        textNodesWithPosition[index] = { text, from, to }
      }
    } else {
      index += 1
    }
  })

  textNodesWithPosition = textNodesWithPosition.filter(Boolean)

  const chunksOf500Words: { from: number; text: string }[] = []
  let finalText = ''
  let upperFrom = 0
  let newDataSet = true
  let lastPos = 1

  for (const { text, from, to } of textNodesWithPosition) {
    if (!newDataSet) {
      upperFrom = from

      newDataSet = true
    } else {
      const diff = from - lastPos
      if (diff > 0) finalText += Array(diff + 1).join(' ')
    }

    lastPos = to

    finalText += text

    if (moreThan500Words(finalText)) {
      const updatedFrom = chunksOf500Words.length ? upperFrom : upperFrom + 1

      chunksOf500Words.push({
        from: updatedFrom,
        text: finalText,
      })

      finalText = ''
      newDataSet = false
    }
  }

  chunksOf500Words.push({
    from: chunksOf500Words.length ? upperFrom : 1,
    text: finalText,
  })

  const requests = chunksOf500Words.map(({ text, from }) => proofDecoratorDOC(doc, text, from))

  if (editorView) dispatch(editorView.state.tr.setMeta(LTMeta.LoadingTransaction, true))

  Promise.all(requests)
    .then(() => {
      if (editorView) dispatch(editorView.state.tr.setMeta(LTMeta.LoadingTransaction, false))
    })
    .finally(() => (proofReadInitially = true))
}

const debouncedProofreadAndDecorate = debounce(proofDoc, 1000)

/**
 * Extension Registration
 */
export const LanguageTool = Extension.create<LanguageToolOptions, LanguageToolStorage>({
  name: 'languagetool',

  addOptions() {
    return {
      language: 'auto',
      automaticMode: true,
      documentId: undefined,
    }
  },

  addStorage() {
    return {
      active: true,
      match: match,
      loading: false,
    }
  },

  addCommands() {
    return {
      proofread:
        () =>
        ({ tr }) => {
          proofDoc(tr.doc)
          return true
        },
      toggleProofreading: () => () => {
        // TODO: implement toggling proofreading
        return false
      },
      ignoreLanguageToolSuggestion:
        () =>
        ({ editor }) => {
          if (this.options.documentId === undefined) throw new Error('Please provide a unique Document ID(number|string)')

          const { selection } = editor.state
          const { from, to } = selection
          decorationSet = decorationSet.remove(decorationSet.find(from, to))

          const content = editor.state.doc.textBetween(from, to)

          onAuthStateChanged(auth, async user => {
            if (user) {
              const userCollection = collection(db, 'users')
              const userDocRef = doc(userCollection, user.uid)
              const ignoreCollection = collection(userDocRef, 'ignorelist')
              const queryDocs = query(ignoreCollection)
              getDocs(queryDocs)
                .then(checkQuery => {
                  if (checkQuery.size > 0) {
                    getDocs(ignoreCollection)
                      .then(querySnapshot => {
                        querySnapshot.forEach((data: any) => {
                          const ignoreListCollection = collection(db, 'users', user.uid, 'ignorelist')
                          const newDocRef = doc(ignoreListCollection, data.id)
                          const newData = data.data().data
                          console.log(newData.length)
                          newData.push({ Key: newData.length + 1, Value: content })
                          updateDoc(newDocRef, { data: newData })
                            .then(data => console.log('UPDATED Firebase', data))
                            .catch(e => console.log('Error', e))
                        })
                      })
                      .catch(error => {
                        console.error('Error getting documents: ', error)
                      })
                  } else {
                    addDoc(ignoreCollection, { data: [{ Key: 1, Value: content }] })
                      .then(data => console.log('NEW_ADDED Firebase', data))
                      .catch(e => console.log('Error', e))
                  }
                })
                .catch(error => {
                  console.error('Error getting ignoreCollection:', error)
                })
            }
          })
          DB.ignoredWords.add({ value: content })

          return false
        },
    }
  },

  addProseMirrorPlugins() {
    const { documentId } = this.options
    const spellCheck = localStorage.getItem('spellCheck')

    return [
      new Plugin({
        key: new PluginKey('languagetool'),
        props: {
          decorations(state) {
            return this.getState(state)
          },
          attributes: {
            spellcheck: spellCheck !== null ? spellCheck : 'true',
          },
        },
        state: {
          init: (config, state) => {
            decorationSet = DecorationSet.empty

            // if (this.options.automaticMode) proofDoc(state.doc)

            if (documentId) {
              extensionDocId = documentId
            }

            DB = new IgnoredDB()

            return decorationSet
          },
          apply: (tr, oldPluginState, oldEditorState) => {
            const matchUpdated = tr.getMeta(LTMeta.MatchUpdatedTransaction)
            const loading = tr.getMeta(LTMeta.LoadingTransaction)

            if (loading) this.storage.loading = true
            else this.storage.loading = false

            if (matchUpdated) this.storage.match = match

            const languageToolDecorations = tr.getMeta(LTMeta.InitTransaction)

            if (languageToolDecorations) return decorationSet

            if (tr.docChanged && this.options.automaticMode) {
              if (!proofReadInitially) debouncedProofreadAndDecorate(tr.doc)
              // @ts-ignore
              else changedDescendants(oldEditorState.doc, tr.doc, 0, debouncedProofDecorator)
            }

            decorationSet = decorationSet.map(tr.mapping, tr.doc)
            setTimeout(addListenerDecorations)

            return decorationSet
          },
        },
        view: view => {
          return {
            update(view) {
              editorView = view
            },
          }
        },
      }),
    ]
  },
})
