/**
 * Override the behavior of pasting. `slice` is the
 * pasted content parsed by the editor, but you can directly access
 * the event to get at the raw content.
 *
 * @format
 */

import { Slice } from '@tiptap/pm/model'
import { EditorView } from '@tiptap/pm/view'

export function handlePaste(view: EditorView, event: ClipboardEvent, slice: Slice) {
  event.preventDefault()
  const text = event.clipboardData?.getData('text/plain') || ''
  // navigator.clipboard.writeText(text)
  document.execCommand('insertHTML', false, text)
}
