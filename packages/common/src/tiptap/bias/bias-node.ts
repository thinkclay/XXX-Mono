import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import BiasHighlight from './views/BiasHighlight'

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
