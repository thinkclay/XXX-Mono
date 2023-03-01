/** @format */

import { Extension } from '@tiptap/core'

import { PopupPlugin, PopupPluginProps } from './popup-plugin'

export type PopupOptions = Omit<PopupPluginProps, 'editor' | 'element'> & {
  element: HTMLElement | null
}

export const Popup = Extension.create<PopupOptions>({
  name: 'popup',

  addOptions() {
    return {
      element: null,
      tippyOptions: {},
      pluginKey: 'popup',
      updateDelay: undefined,
      shouldShow: null,
    }
  },

  addProseMirrorPlugins() {
    if (!this.options.element) {
      return []
    }

    return [
      PopupPlugin({
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
