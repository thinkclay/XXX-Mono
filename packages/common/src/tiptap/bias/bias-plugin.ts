import { AnyExtension, Extension, escapeForRegEx } from '@tiptap/core'
import { Plugin, PluginKey, TextSelection } from '@tiptap/pm/state'
import { EditorView } from '@tiptap/pm/view'
import { Editor } from '@tiptap/react'

import { fetchBiases, fetchLanguage } from './bias-service'
import { TIPTAP, logger } from '@common/helpers/logger'
import { BiasStorage } from './bias'
import { MSuggestion, upsertSuggestion } from '@common/models'

async function getLanguageMarks(text: string, editor: Editor) {
  logger(TIPTAP.LANGUAGE.FETCHING, true)

  const languageResponse = await fetchLanguage(text)

  languageResponse.matches.map(({ sentence, shortMessage, rule, replacements, offset, length }) => {
    const m = new RegExp(escapeForRegEx(sentence), 'gid').exec(text)

    if (!m || !m[0]) return

    const from = offset + 1
    const to = offset + length + 1

    logger(TIPTAP.LANGUAGE.RESULT, { from, to, message: shortMessage, replacements })

    editor.view.dispatch(
      editor.state.tr.addMark(
        from,
        to,
        editor.state.schema.marks.languageMark.create({
          from,
          to,
          message: shortMessage,
          replacements,
        })
      )
    )

    return {
      category: 'language',
      type: rule.issueType,
      input: sentence,
      date: Date.now(),
    }
  })
}

async function getBiasMarks(text: string, editor: Editor) {
  logger(TIPTAP.BIAS.FETCHING, true)

  const response = await fetchBiases(text)

  if (!response || !response.results) return

  const data = response.results
    .map(({ input, biases, replacements }) => {
      const type = biases[0].name
      const m = new RegExp(escapeForRegEx(input), 'gid').exec(text)

      if (type === 'none' || !m || !m[0]) return

      const from = m.index + 1
      const to = m.index + input.length + 1
      const message = `This phrase may contain ${type.replace('potential ', '')} bias. Here are some examples of alternative statements:`
      const suggestions = replacements.map(value => ({ value }))

      logger(TIPTAP.BIAS.RESULT, { from, to, message, suggestions })

      editor.view.dispatch(
        editor.state.tr.addMark(
          from,
          to,
          editor.state.schema.marks.biasMark.create({
            from,
            to,
            message,
            replacements: suggestions,
          })
        )
      )

      return {
        category: 'bias',
        type,
        input: input,
        date: Date.now(),
      }
    })
    .filter(i => i !== undefined)

  data.map(s => upsertSuggestion(s as MSuggestion))
}

async function proof(editor: Editor, storage: BiasStorage) {
  const text = editor.getText()

  // TODO: Add debounce here and more throttling logic
  if (storage.fetching || text.length < 150 || Date.now() - storage.lastCheckedAt < 10000 || storage.fetching) return

  storage.fetching = true

  await getLanguageMarks(text, editor)
  await getBiasMarks(text, editor)

  storage.fetching = false
}

export const Bias: AnyExtension = Extension.create<BiasStorage>({
  name: 'bias',

  addStorage(): BiasStorage {
    return {
      fetching: false,
      match: null,
      lastCheckedAt: Date.now(),
    }
  },

  onUpdate(this) {
    proof(this.editor as Editor, this.storage)
  },

  addCommands() {
    return {
      proofread: () => () => {
        proof(this.editor as Editor, this.storage)

        return true
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('bias'),
        props: {
          handleClick(view: EditorView, pos: number, _event: MouseEvent) {
            const biasMark = view.state.doc.nodeAt(pos)?.marks.find(mark => mark.type.name === 'biasMark')
            const languageMark = view.state.doc.nodeAt(pos)?.marks.find(mark => mark.type.name === 'languageMark')
            const mark = languageMark || biasMark

            if (!mark) return

            const message = mark.attrs?.message
            const replacements = mark.attrs?.replacements || []
            const from = mark.attrs?.from || -1
            const to = mark.attrs?.to || -1

            view.dispatch(view.state.tr.setMeta(TIPTAP.BIAS.MATCH, { message, replacements, from, to }))
            view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, from, to)))
          },
        },
      }),
    ]
  },
})
