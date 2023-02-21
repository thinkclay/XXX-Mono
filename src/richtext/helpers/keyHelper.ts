import { EditorState, RichUtils, DraftHandleValue } from 'draft-js'
import { KeyboardEvent } from 'react'
import { KeyHandler } from '../types'

export const keyHandler: KeyHandler = (editorState, onChange, command) => {
  const nextState = RichUtils.handleKeyCommand(editorState, command)
  if (nextState) {
    onChange(nextState)
    return 'handled'
  }
  return 'not-handled'
}

type ReturnHandler = (editorState: EditorState, onChange: (editorState: EditorState) => void, e: KeyboardEvent<{}>) => DraftHandleValue

export const returnHandler: ReturnHandler = (editorState, onChange, e): DraftHandleValue => {
  const nextState = RichUtils.insertSoftNewline(editorState)
  if (e.shiftKey) {
    onChange(nextState)
    return 'handled'
  }

  return 'not-handled'
}
