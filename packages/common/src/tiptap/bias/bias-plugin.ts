import { AnyExtension, Extension, escapeForRegEx } from '@tiptap/core'
import { Plugin, PluginKey, TextSelection } from '@tiptap/pm/state'
import { EditorView } from '@tiptap/pm/view'
import { Editor } from '@tiptap/react'

import { fetchBiases } from './bias-service'
import { TIPTAP, logger } from '@common/helpers/logger'
import { BiasStorage } from './bias'
import { MSuggestion, upsertSuggestion } from '@common/models'

async function checkBias(editor: Editor, storage: BiasStorage) {
  const originalText = editor.getText()

  // Sensible checks so we're not querying too much
  if (originalText.length < 150 || Date.now() - storage.lastCheckedAt < 10000 || storage.fetching) return

  logger(TIPTAP.BIAS.FETCHING, true)
  storage.fetching = true

  const response = await fetchBiases(originalText)

  if (!response || !response.results) return

  const data = response.results
    .map(({ input, biases, replacements }) => {
      const type = biases[0].name
      const m = new RegExp(escapeForRegEx(input), 'gid').exec(originalText)

      if (type === 'none' || !m || !m[0]) return

      const from = m.index + 1
      const to = m.index + input.length + 1
      const message = `This phrase may contain ${type.replace('potential ', '')} bias. Here are some examples of alternative statements:`

      logger(TIPTAP.BIAS.RESULT, { from, to, message })

      editor.view.dispatch(
        editor.state.tr.addMark(
          from,
          to,
          editor.state.schema.marks.biasMark.create({
            from,
            to,
            message,
            replacements: replacements.map(value => ({ value })),
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

  logger(TIPTAP.BIAS.FETCHING, false)

  data.map(s => upsertSuggestion(s as MSuggestion))

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
    checkBias(this.editor as Editor, this.storage)
  },

  addCommands() {
    return {
      proofread: () => () => {
        checkBias(this.editor as Editor, this.storage)

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
            const mark = view.state.doc.nodeAt(pos)?.marks.find(mark => mark.type.name === 'biasMark')

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
