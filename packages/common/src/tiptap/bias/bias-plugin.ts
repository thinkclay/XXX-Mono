import { AnyExtension, Extension, Command } from '@tiptap/core'
import { debounce } from 'lodash'
import { Transaction } from '@tiptap/pm/state'

import { fetchBiases } from './bias-service'
import { Editor } from '@tiptap/react'

// function selectElementText(el: EventTarget) {
//   const range = document.createRange()
//   range.selectNode(el as HTMLSpanElement)

//   const sel = window.getSelection()
//   sel?.removeAllRanges()
//   sel?.addRange(range)
// }

interface BiasStorage {
  updating: boolean
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

    transactions.forEach(view.dispatch)
  }, 500)

  getMatches()

  storage.updating = false
}

export const Bias: AnyExtension = Extension.create<BiasStorage>({
  name: 'bias',

  addStorage(): BiasStorage {
    return {
      updating: false,
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
})
