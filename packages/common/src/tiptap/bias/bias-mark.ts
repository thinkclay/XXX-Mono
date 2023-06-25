import { Mark, mergeAttributes } from '@tiptap/core'

export interface BiasMarkOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    mark: {
      /**
       * Set a bias mark
       */
      setBiasMark: (attributes?: { class: string; message: string; suggestions: string[]; from: number; to: number }) => ReturnType
      /**
       * Toggle a bias mark
       */
      toggleBiasMark: (attributes?: { class: string; message: string; suggestions: string[]; from: number; to: number }) => ReturnType
      /**
       * Unset a bias mark
       */
      unsetBiasMark: () => ReturnType
    }
  }
}

export const BiasMark = Mark.create<BiasMarkOptions>({
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
      suggestions: {
        default: [],
        renderHTML: attributes => ({ 'data-suggestions': attributes.suggestions }),
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
