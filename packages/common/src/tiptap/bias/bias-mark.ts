import { Mark, mergeAttributes } from '@tiptap/core'

export const BiasMark = Mark.create({
  name: 'biasMark',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      class: {
        default: 'bias',
        renderHTML: attributes => {
          return {
            class: attributes.class,
          }
        },
      },
      message: {
        default: null,
        renderHTML: attributes => ({ 'data-message': attributes.message }),
      },
      replacements: {
        default: [],
        renderHTML: attributes => ({ 'data-replacements': JSON.stringify(attributes.replacements) }),
      },
      from: {
        default: -1,
        renderHTML: attributes => ({ 'data-from': attributes.from }),
      },
      to: {
        default: -1,
        renderHTML: attributes => ({ 'data-from': attributes.from }),
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'mark',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['mark', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setBiasMark:
        attributes =>
        ({ commands }) => {
          return commands.setMark(this.name, attributes)
        },
      toggleBiasMark:
        attributes =>
        ({ commands }) => {
          return commands.toggleMark(this.name, attributes)
        },
      unsetBiasMark:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name)
        },
    }
  },
})
