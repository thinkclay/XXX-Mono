import { AnyExtension, Extension, Command, getMarkRange } from '@tiptap/core'
import { debounce } from 'lodash'
import { Plugin, PluginKey, TextSelection, Transaction } from '@tiptap/pm/state'
import { DecorationSet, EditorView } from '@tiptap/pm/view'

import { fetchBiases } from './bias-service'
import { BIAS_TR } from './bias-types'
import { Editor } from '@tiptap/react'
import { Match } from './bias-types'

interface BiasStorage {
  updating: boolean
  match?: Match
}

function checkBias(editor: Editor, storage: BiasStorage) {
  if (storage.updating) return

  console.log('Bias onUpdate')

  const { state, view } = editor
  const { tr, schema } = state
  const transactions: Transaction[] = []
  const originalText = editor.getText()

  const getMatches = debounce(async () => {
    storage.updating = true

    await fetchBiases(originalText).then(bias => {
      bias.results.forEach(r => {
        if (r.biases[0].name === 'none') return

        const m = new RegExp(r.input, 'gid').exec(originalText)

        if (!m || !m[0]) return

        const from = m.index + 1
        const to = m.index + r.input.length + 1
        const message = `This phrase may contain ${r.biases[0].name
          .toLocaleLowerCase()
          .replace('potential ', '')} bias. Here are some examples of alternative statements:`
        const suggestions = JSON.stringify(r.replacements)

        transactions.push(
          tr.addMark(
            from,
            to,
            schema.marks.biasMark.create({
              from,
              to,
              message,
              suggestions,
            })
          )
        )

        // const nodeType = state.schema.nodes.biasNode
        // const content = nodeType.create({ type: 'bias-node' }, state.schema.text(r.input))
        // transactions.push(tr.replaceWith(from, to, content))
      })
    })

    transactions.forEach(tr => {
      tr.setMeta('biasMarkUpdate', { storage })
      view.dispatch(tr)
    })
  }, 500)

  getMatches()

  storage.updating = false
}

const debouncedCheckBias = debounce(checkBias)

export const Bias: AnyExtension = Extension.create<BiasStorage>({
  name: 'bias',

  addStorage(): BiasStorage {
    return {
      updating: false,
      match: undefined,
    }
  },

  onUpdate(this) {
    debouncedCheckBias(this.editor as Editor, this.storage)
  },

  addCommands() {
    return {
      proofread: () => () => {
        debouncedCheckBias(this.editor as Editor, this.storage)
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
            const suggestions = mark.attrs?.suggestions || []
            const from = mark.attrs?.from || -1
            const to = mark.attrs?.to || -1
            const target = view.domAtPos(pos)
            const markType = view.state.schema.marks.biasMark

            console.log('Node:', target)
            console.log('Message:', message)
            console.log('Suggestions:', suggestions)
            console.log('From:', from)
            console.log('To:', to)

            view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, from, to)))
          },
        },
        state: {
          init(config, instance) {},
          apply(tr, value, oldState, newState) {},
        },
      }),
    ]
  },
})
