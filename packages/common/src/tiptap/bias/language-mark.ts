import { Mark, mergeAttributes } from '@tiptap/core'

export const LanguageMark = Mark.create({
  name: 'languageMark',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      class: {
        default: 'language',
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
      setLanguageMark:
        attributes =>
        ({ commands }) => {
          return commands.setMark(this.name, attributes)
        },
      toggleLanguageMark:
        attributes =>
        ({ commands }) => {
          return commands.toggleMark(this.name, attributes)
        },
      unsetLanguageMark:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name)
        },
    }
  },
})
