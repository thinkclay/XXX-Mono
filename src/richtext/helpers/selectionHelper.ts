import { EditorState, getVisibleSelectionRect } from 'draft-js'
import { RefObject } from 'react'
import { SelectState, Rect } from '../types'

export const defaultSelectState: SelectState = {
  showToolbar: false,
  show: 'newline',
  toolbarPosition: {
    left: 0,
    width: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: 0,
  },
}

const getCursorPosition = (): Rect => {
  const selection = window.getSelection()

  if (!selection || !selection.anchorNode || !selection.anchorNode.parentElement) return defaultSelectState.toolbarPosition

  return selection.anchorNode.parentElement.getBoundingClientRect()
}

export const selectionHandler = (editorState: EditorState): SelectState => {
  const selection = editorState.getSelection()
  const currentContent = editorState.getCurrentContent()
  const currentBlock = currentContent.getBlockForKey(selection.getStartKey())
  const selectionIsEmpty = selection.getAnchorOffset() === selection.getFocusOffset()
  const hasFocus = selection.getHasFocus()
  let position = defaultSelectState.toolbarPosition

  if (hasFocus) position = selectionIsEmpty ? getCursorPosition() : getVisibleSelectionRect(window)

  return {
    showToolbar: hasFocus,
    show: selectionIsEmpty ? 'newline' : 'selection',
    currentBlockType: currentBlock.getType(),
    toolbarPosition: position,
  }
}

export const getBoundsForNode = (ref: RefObject<HTMLDivElement>): ClientRect | DOMRect => {
  if (!ref || !ref.current || !ref.current || typeof ref.current.getBoundingClientRect !== 'function') return null

  return ref.current.getBoundingClientRect()
}
