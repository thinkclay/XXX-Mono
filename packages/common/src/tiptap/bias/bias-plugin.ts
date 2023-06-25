import { Extension, Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import { v4 as uuidv4 } from 'uuid'

import { getBiasMatches } from './bias-helpers'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import { Plugin, PluginKey, Transaction } from '@tiptap/pm/state'
import BiasHighlight from './views/BiasHighlight'
import { Transform } from '@tiptap/pm/transform'
import { debounce } from 'lodash'

let decorationSet = DecorationSet.empty

export const BiasNode = Node.create({
  name: 'biasNode',
  group: 'inline',
  inline: true,
  content: 'inline*',

  addAttributes() {
    return {
      count: {
        default: 0,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'bias-node',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['bias-node', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(BiasHighlight)
  },
})

const Bias = Extension.create({
  name: 'bias',

  addStorage() {
    return {
      updating: false,
    }
  },

  // The editor is ready.
  onCreate() {},

  // Editor content has changed.
  // onUpdate(this) {
  //   console.log('Bias onUpdate')

  //   const getMatches = async () => {
  //     await getBiasMatches(this.editor.getText()).then(matches => {
  //       const decorations: Decoration[] = []
  //       matches.forEach(match => {
  //         // Somehow we get an off-by-one issue here, so correcting
  //         const from = match.offset + 1
  //         const to = from + match.length + 1

  //         decorations.push(
  //           Decoration.inline(from, to, {
  //             class: `lt lt-${match.rule.issueType}`,
  //             nodeName: 'bias-node',
  //             match: JSON.stringify(match),
  //             uuid: uuidv4(),
  //           })
  //         )
  //       })

  //       decorationSet = DecorationSet.empty
  //       decorationSet = decorationSet.add(this.editor.state.doc, decorations)
  //     })
  //   }

  onUpdate(this) {
    if (this.storage.updating) return

    console.log('Bias onUpdate')

    const { editor } = this
    const { state } = editor
    const { tr, schema } = state
    const nodeType = state.schema.nodes.biasNode
    const transactions: Transaction[] = []

    const getMatches = debounce(async () => {
      this.storage.updating = true

      // const content = nodeType.create({ type: 'bias-node' }, state.schema.text(`Hey y'all, listen up!`))
      // this.editor.view.dispatch(tr.replaceWith(0, 22, content))

      await getBiasMatches(this.editor.getText()).then(matches => {
        matches.map(match => {
          const from = match.offset
          const to = from + match.sentence.length
          console.log('From/To', from, to, match.sentence, match.sentence.length)

          const currentNode = state.doc.nodeAt(from)
          if (currentNode && currentNode.type === nodeType) {
            console.log('Node already of the desired type. Skipping replacement.')
            return
          } else {
            const content = nodeType.create({ type: 'bias-node' }, state.schema.text(match.sentence))
            transactions.push(tr.replaceWith(from, to, content))
          }

          // const transaction = tr.delete(from, to).insert(from, newNode).scrollIntoView()
        })
      })

      transactions.forEach(this.editor.view.dispatch)
    }, 500)

    getMatches()

    this.storage.updating = false
  },

  // addProseMirrorPlugins() {
  //   return [
  //     new Plugin({
  //       key: new PluginKey('bias'),
  //       props: {
  //         decorations(state) {
  //           return this.getState(state)
  //         },
  //       },
  //       state: {
  //         init: () => {
  //           return DecorationSet.empty
  //         },
  //         apply: tr => {
  //           return tr.docChanged ? decorationSet.map(tr.mapping, tr.doc) : decorationSet
  //         },
  //       },
  //     }),
  //   ]
  // },
})

export default Bias
