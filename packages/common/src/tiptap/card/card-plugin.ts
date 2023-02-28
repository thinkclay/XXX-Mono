/** @format */

import { Plugin, PluginKey, EditorState } from '@tiptap/pm/state'
import { EditorView } from '@tiptap/pm/view'
import { Editor } from '@tiptap/react'
import { Props } from 'tippy.js'
import { CardView } from './CardView'

export interface CardPluginProps {
  pluginKey: PluginKey | string
  editor: Editor
  element: HTMLElement
  tippyOptions?: Partial<Props>
  updateDelay?: number
  shouldShow?:
    | ((props: { editor: Editor; view: EditorView; state: EditorState; oldState?: EditorState; from: number; to: number }) => boolean)
    | null
}

export type CardOptions = Omit<CardPluginProps, 'editor' | 'element'> & {
  element: HTMLElement | null
}

export const CardPlugin = (options: CardPluginProps) => {
  return new Plugin({
    key: typeof options.pluginKey === 'string' ? new PluginKey(options.pluginKey) : options.pluginKey,
    view: view => new CardView({ view, ...options }),
  })
}
