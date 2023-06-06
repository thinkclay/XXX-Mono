/**
 * @format
 */
import { atom, selector } from 'recoil'
import { Slice } from '@tiptap/pm/model'
import { EditorView } from '@tiptap/pm/view'

export interface ToneState {
  fetching: boolean
  icon?: string | null
  message?: string | null
}

export const toneDefault: ToneState = {
  fetching: false,
  icon: null,
  message: null,
}

export const toneState = atom({
  key: 'tone',
  default: toneDefault,
})

export const toneFetching = selector({
  key: 'tone.fetching',
  get: ({ get }) => get(toneState).fetching,
})

export const toneIcon = selector({
  key: 'tone.icon',
  get: ({ get }) => get(toneState).icon,
})

export const toneMessage = selector({
  key: 'tone.message',
  get: ({ get }) => get(toneState).message,
})

/**
 * Override the behavior of pasting. `slice` is the
 * pasted content parsed by the editor, but you can directly access
 * the event to get at the raw content.
 *
 * @param view
 * @param event
 * @param slice
 */
export function handlePaste(view: EditorView, event: ClipboardEvent, slice: Slice) {
  event.preventDefault()
  const text = event.clipboardData?.getData('text/plain') || ''
  // navigator.clipboard.writeText(text)
  document.execCommand('insertHTML', false, text)
}
