/**
 * @format
 */
import { atom, selector } from 'recoil'
import { Slice } from '@tiptap/pm/model'
import { EditorView } from '@tiptap/pm/view'

export interface ToneState {
  fetching: boolean
  message: string
}

export const toneDefault: ToneState = {
  fetching: false,
  message: '',
}

export const toneState = atom({
  key: 'main',
  default: toneDefault,
})

export const toneFetching = selector({
  key: 'main.toneFetching',
  get: ({ get }) => get(toneState).fetching,
})

export const toneMessage = selector({
  key: 'main.toneState',
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
