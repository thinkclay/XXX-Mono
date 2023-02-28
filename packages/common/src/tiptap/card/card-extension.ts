/** @format */

import { Extension } from '@tiptap/react'
import { CardPlugin, CardOptions } from './card-plugin'

export const Card = Extension.create<CardOptions>({
  name: 'card',

  addOptions() {
    return {
      element: null,
      tippyOptions: {},
      pluginKey: 'card',
      updateDelay: undefined,
      shouldShow: null,
    }
  },

  addProseMirrorPlugins() {
    if (!this.options.element) {
      return []
    }

    return [
      CardPlugin({
        pluginKey: this.options.pluginKey,
        editor: this.editor,
        element: this.options.element,
        tippyOptions: this.options.tippyOptions,
        updateDelay: this.options.updateDelay,
        shouldShow: this.options.shouldShow,
      }),
    ]
  },
})
