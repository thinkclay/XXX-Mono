/**
 * @see https://github.com/sereneinserenade/tiptap-languagetool/blob/main/src/components/extensions/languagetool.ts
 * @format
 */

import { debounce } from 'lodash'
import { Decoration, DecorationSet, EditorView } from 'prosemirror-view'
import { Dexie } from 'dexie'
import { Extension } from '@tiptap/core'
import { Node } from 'prosemirror-model'
import { Plugin, PluginKey, Transaction } from 'prosemirror-state'
import { v4 as uuidv4 } from 'uuid'
import { LanguageToolResponse, Match } from './language-types'
import { fetchCompletions, fetchProof } from './language-service'

let db: Dexie

let editorView: EditorView
let decorationSet: DecorationSet
let extensionDocId: string | number
let textNodesWithPosition: TextNodesWithPosition[] = []
let match: Match | undefined = undefined
let proofReadInitially = false

export enum LanguageToolHelpingWords {
  LanguageToolTransactionName = 'languageToolTransaction',
  MatchUpdatedTransactionName = 'matchUpdated',
  LoadingTransactionName = 'languageToolLoading',
}

const dispatch = (tr: Transaction) => editorView.dispatch(tr)

const updateMatch = (m?: Match) => {
  if (m) match = m
  else match = undefined

  editorView.dispatch(editorView.state.tr.setMeta('matchUpdated', true))
}

const selectElementText = (el: EventTarget) => {
  const range = document.createRange()
  range.selectNode(el as HTMLSpanElement)

  const sel = window.getSelection()
  sel?.removeAllRanges()
  sel?.addRange(range)
}

const mouseEnterEventListener = (e: Event) => {
  if (!e.target) return
  selectElementText(e.target)

  const matchString = (e.target as HTMLSpanElement).getAttribute('match')

  if (matchString) updateMatch(JSON.parse(matchString))
  else updateMatch()
}

const mouseLeaveEventListener = () => updateMatch()

const addEventListenersToDecorations = () => {
  const decos = document.querySelectorAll('span.lt')

  if (decos.length) {
    decos.forEach(el => {
      el.addEventListener('click', mouseEnterEventListener)
      el.addEventListener('mouseleave', mouseLeaveEventListener)
    })
  }
}

export function changedDescendants(old: Node, cur: Node, offset: number, f: (node: Node, pos: number, cur: Node) => void): void {
  const oldSize = old.childCount,
    curSize = cur.childCount
  outer: for (let i = 0, j = 0; i < curSize; i++) {
    const child = cur.child(i)

    for (let scan = j, e = Math.min(oldSize, i + 3); scan < e; scan++) {
      if (old.child(scan) === child) {
        j = scan + 1
        offset += child.nodeSize
        continue outer
      }
    }

    f(child, offset, cur)

    if (j < oldSize && old.child(j).sameMarkup(child)) changedDescendants(old.child(j), child, offset + 1, f)
    else child.nodesBetween(0, child.content.size, f, offset + 1)

    offset += child.nodeSize
  }
}

const gimmeDecoration = (from: number, to: number, match: Match) =>
  Decoration.inline(from, to, {
    class: `lt lt-${match.rule.issueType}`,
    nodeName: 'span',
    match: JSON.stringify(match),
    uuid: uuidv4(),
  })

const proofreadNodeAndUpdateItsDecorations = async (node: Node, offset: number, cur: Node) => {
  console.log('proofreadNodeAndUpdateItsDecorations')
  // Mocking the Loading state when text from a node is changed
  // await new Promise(r => setTimeout(r, 500))

  if (editorView?.state) dispatch(editorView.state.tr.setMeta(LanguageToolHelpingWords.LoadingTransactionName, false))

  const ltRes: LanguageToolResponse = await fetchProof(node.textContent)
  const nodeSpecificDecorations: Decoration[] = []
  decorationSet = decorationSet.remove(decorationSet.find(offset, offset + node.nodeSize))

  for (const match of ltRes.matches) {
    const from = match.offset + offset
    const to = from + match.length

    if (extensionDocId) {
      const content = editorView.state.doc.textBetween(from, to)
      const result = await (db as any).ignoredWords.get({ value: content, documentId: extensionDocId })

      if (!result) nodeSpecificDecorations.push(gimmeDecoration(from, to, match))
    } else {
      nodeSpecificDecorations.push(gimmeDecoration(from, to, match))
    }
  }

  decorationSet = decorationSet.add(cur, nodeSpecificDecorations)

  if (editorView?.state) dispatch(editorView.state.tr.setMeta(LanguageToolHelpingWords.LanguageToolTransactionName, true))
}

const debouncedProofreadNodeAndUpdateItsDecorations = debounce(proofreadNodeAndUpdateItsDecorations, 500)

const moreThan500Words = (s: string) => s.trim().split(/\s+/).length >= 500

const getMatchAndSetDecorations = async (doc: Node, text: string, originalFrom: number) => {
  const ltRes = await fetchProof(text)
  const biasRes = await fetchCompletions(text)

  console.log('getMatchAndSetDecorations', biasRes)

  const { matches } = ltRes
  const decorations: Decoration[] = []

  for (const match of matches) {
    const from = match.offset + originalFrom
    const to = from + match.length

    if (extensionDocId) {
      const content = doc.textBetween(from, to)
      const result = await (db as any).ignoredWords.get({ value: content })

      if (!result) decorations.push(gimmeDecoration(from, to, match))
    } else {
      decorations.push(gimmeDecoration(from, to, match))
    }
  }

  decorationSet = decorationSet.remove(decorationSet.find(originalFrom, originalFrom + text.length))
  decorationSet = decorationSet.add(doc, decorations)

  if (editorView) dispatch(editorView.state.tr.setMeta(LanguageToolHelpingWords.LanguageToolTransactionName, true))

  setTimeout(addEventListenersToDecorations)
}

const proofreadAndDecorateWholeDoc = async (doc: Node) => {
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

  let finalText = ''

  const chunksOf500Words: { from: number; text: string }[] = []

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

  const requests = chunksOf500Words.map(({ text, from }) => getMatchAndSetDecorations(doc, text, from))

  if (editorView) dispatch(editorView.state.tr.setMeta(LanguageToolHelpingWords.LoadingTransactionName, true))

  Promise.all(requests)
    .then(() => {
      if (editorView) dispatch(editorView.state.tr.setMeta(LanguageToolHelpingWords.LoadingTransactionName, false))
    })
    .finally(() => (proofReadInitially = true))
}

const debouncedProofreadAndDecorate = debounce(proofreadAndDecorateWholeDoc, 1000)

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
      match: match,
      loading: false,
    }
  },

  addCommands() {
    return {
      proofread:
        () =>
        ({ tr }) => {
          proofreadAndDecorateWholeDoc(tr.doc)
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

          const { selection, doc } = editor.state
          const { from, to } = selection
          decorationSet = decorationSet.remove(decorationSet.find(from, to))

          const content = doc.textBetween(from, to)

          ;(db as any).ignoredWords.add({ value: content, documentId: `${extensionDocId}` })

          return false
        },
    }
  },

  addProseMirrorPlugins() {
    const { documentId } = this.options

    return [
      new Plugin({
        key: new PluginKey('languagetool'),
        props: {
          decorations(state) {
            return this.getState(state)
          },
          attributes: {
            spellcheck: 'false',
          },
        },
        state: {
          init: (config, state) => {
            decorationSet = DecorationSet.create(state.doc, [])

            if (this.options.automaticMode) proofreadAndDecorateWholeDoc(state.doc)

            if (documentId) {
              extensionDocId = documentId

              db = new Dexie('LanguageToolIgnoredSuggestions')

              db.version(1).stores({
                ignoredWords: `
                  ++id,
                  &value,
                  documentId
                `,
              })
            }

            return decorationSet
          },
          apply: (tr, oldPluginState, oldEditorState) => {
            const matchUpdated = tr.getMeta(LanguageToolHelpingWords.MatchUpdatedTransactionName)
            const loading = tr.getMeta(LanguageToolHelpingWords.LoadingTransactionName)

            if (loading) this.storage.loading = true
            else this.storage.loading = false

            if (matchUpdated) this.storage.match = match

            const languageToolDecorations = tr.getMeta(LanguageToolHelpingWords.LanguageToolTransactionName)

            if (languageToolDecorations) return decorationSet

            if (tr.docChanged && this.options.automaticMode) {
              if (!proofReadInitially) debouncedProofreadAndDecorate(tr.doc)
              else changedDescendants(oldEditorState.doc, tr.doc, 0, debouncedProofreadNodeAndUpdateItsDecorations)
            }

            decorationSet = decorationSet.map(tr.mapping, tr.doc)
            setTimeout(addEventListenersToDecorations)

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
