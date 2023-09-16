/**
 * @see https://github.com/sereneinserenade/tiptap-languagetool/blob/main/src/components/extensions/languagetool.ts
 * @format
 */
import { debounce } from 'lodash'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, collection, addDoc, getDocs, updateDoc, query } from 'firebase/firestore'
import { Extension } from '@tiptap/core'
import { Decoration, DecorationSet, EditorView } from '@tiptap/pm/view'
import { Node as PMModel } from 'prosemirror-model'
import { Plugin, PluginKey, Transaction } from 'prosemirror-state'
import { v4 as uuidv4 } from 'uuid'

import { LanguageToolResponse, Match, TextNodesWithPosition, LanguageToolOptions, LanguageToolStorage } from './language-types'
import { fetchProof } from './language-service'
import { changedDescendants, moreThan500Words, selectElementText } from './language-helpers'
import { DB } from '@common/helpers/db'
import { auth, db } from '@common/services/firebase'
import { TIPTAP } from '@common/helpers/logger'
import { Timestamp } from 'firebase-admin/firestore'

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

  editorView.dispatch(editorView.state.tr.setMeta(TIPTAP.LANGUAGE.MATCH, true))
}

const mouseEnter = (e: Event) => {
  if (!e.target) return
  selectElementText(e.target)

  const matchString = (e.target as HTMLSpanElement).getAttribute('match')

  if (matchString) updateMatch(JSON.parse(matchString))
  else updateMatch()
}

const mouseLeave = () => updateMatch()

const addListenerDecorations = () => {
  const decos = document.querySelectorAll('span.language')

  if (decos.length) {
    decos.forEach(el => {
      el.addEventListener('click', mouseEnter)
      el.addEventListener('mouseleave', mouseLeave)
    })
  }
}

const decorate = (from: number, to: number, match: Match): Decoration => {
  DB.suggestion.add({
    category: 'language',
    type: match.rule.issueType,
    input: match.sentence,
    date: Date.now(),
  })

  return Decoration.inline(from, to, {
    class: `language ${match.rule.issueType}`,
    nodeName: 'span',
    match: JSON.stringify(match),
    uuid: uuidv4(),
  })
}

const handleStoreData = (newSubmisionData: Array<any>) => {
  onAuthStateChanged(auth, async user => {
    if (!user) return
    const userCollection = collection(db, 'users')
    const userDocRef = doc(userCollection, user.uid)
    const languageCollection = collection(userDocRef, 'language')
    const queryDocs = query(languageCollection)
    getDocs(queryDocs)
      .then(checkQuery => {
        if (checkQuery.size > 0) {
          getDocs(languageCollection)
            .then(querySnapshot => {
              querySnapshot.forEach((data: any) => {
                const biasListCollection = collection(db, 'users', user.uid, 'language')
                const newDocRef = doc(biasListCollection, data.id)
                const newData = data.data().language
                newSubmisionData.forEach(data => {
                  newData.push(data)
                })
                updateDoc(newDocRef, { language: newData })
                  .then(data => console.log('UPDATED Firebase', data))
                  .catch(e => console.log('Error', e))
              })
            })
            .catch(error => {
              console.error('Error getting documents: ', error)
            })
        } else {
          console.log('new', newSubmisionData)
          addDoc(languageCollection, { language: newSubmisionData })
            .then(data => console.log('NEW_ADDED Firebase', data))
            .catch(e => console.log('Error', e))
        }
      })
      .catch(error => {
        console.error('Error getting languageCollection:', error)
      })
  })
}

async function matchesToDecorations(doc: PMModel, res: LanguageToolResponse, offset: number): Promise<Decoration[]> {
  const { matches } = res
  const decorations: Decoration[] = []

  if (matches.length > 0) {
    const submitData = matches.map(d => {
      return {
        category: 'language',
        type: d.rule.issueType,
        input: d.sentence,
        date: Date.now(),
      }
    })
    handleStoreData(submitData)
  }

  for (const match of matches) {
    if (!match) continue

    const from = match.offset + offset
    const to = from + match.length

    if (extensionDocId) {
      const result = await DB.dictionary.get({ value: doc.textBetween(from, to) })
      if (!result) decorations.push(decorate(from, to, match))
    } else {
      decorations.push(decorate(from, to, match))
    }
  }

  return decorations
}

const proofDecoratorJIT = async (node: PMModel, offset: number, cur: PMModel) => {
  console.log('language/proofDecoratorJIT')
  if (editorView?.state) dispatch(editorView.state.tr.setMeta(TIPTAP.LANGUAGE.FETCH, false))

  const res: LanguageToolResponse = await fetchProof(node.textContent)
  const decorations = await matchesToDecorations(editorView.state.doc, res, offset)

  decorationSet = decorationSet.remove(decorationSet.find(offset, offset + node.nodeSize))
  decorationSet = decorationSet.add(cur, decorations)

  if (editorView?.state) dispatch(editorView.state.tr.setMeta(TIPTAP.LANGUAGE.INIT, true))
}

const debouncedProofDecorator = debounce(proofDecoratorJIT, 500)

const proofDecoratorDOC = async (doc: PMModel, text: string, originalFrom: number) => {
  console.log('language/proofDecoratorDOC')
  const res = await fetchProof(text)
  const decorations = await matchesToDecorations(doc, res, originalFrom)

  decorationSet = decorationSet.remove(decorationSet.find(originalFrom, originalFrom + text.length))
  decorationSet = decorationSet.add(doc, decorations)

  if (editorView) dispatch(editorView.state.tr.setMeta(TIPTAP.LANGUAGE.INIT, true))

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

  if (editorView) dispatch(editorView.state.tr.setMeta(TIPTAP.LANGUAGE.FETCH, true))

  Promise.all(requests)
    .then(() => {
      if (editorView) dispatch(editorView.state.tr.setMeta(TIPTAP.LANGUAGE.FETCH, false))
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
                          newData.push({ Key: newData.length + 1, Value: content,timestamp: Timestamp.now() })
                          updateDoc(newDocRef, { data: newData })
                            .then(data => console.log('UPDATED Firebase', data))
                            .catch(e => console.log('Error', e))
                        })
                      })
                      .catch(error => {
                        console.error('Error getting documents: ', error)
                      })
                  } else {
                    addDoc(ignoreCollection, { data: [{ Key: 1, Value: content,timestamp: Timestamp.now() }] })
                      .then(data => console.log('NEW_ADDED Firebase', data))
                      .catch(e => console.log('Error', e))
                  }
                })
                .catch(error => {
                  console.error('Error getting ignoreCollection:', error)
                })
            }
          })
          DB.dictionary.add({ value: content })

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

            proofDoc(state.doc)

            if (documentId) {
              extensionDocId = documentId
            }

            return decorationSet
          },
          apply: (tr, value, oldState) => {
            const matchUpdated = tr.getMeta(TIPTAP.LANGUAGE.MATCH)
            const loading = tr.getMeta(TIPTAP.LANGUAGE.FETCH)

            this.storage.loading = loading
            if (matchUpdated) this.storage.match = match

            const languageToolDecorations = tr.getMeta(TIPTAP.LANGUAGE.INIT)

            if (languageToolDecorations) return decorationSet

            if (tr.docChanged) {
              if (!proofReadInitially) debouncedProofreadAndDecorate(tr.doc)
              // @ts-ignore
              else changedDescendants(oldState.doc, tr.doc, 0, debouncedProofDecorator)
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
