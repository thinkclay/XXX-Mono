import { Modifier, EditorState, RichUtils } from 'draft-js'
import { INLINE_STYLES } from '../config'
import { HandlerFunction } from '../types'

export const removeStylesHandler: HandlerFunction = (e, editorState) => {
  e.preventDefault()

  const contentState = editorState.getCurrentContent()
  const contentWithoutStyles = Object.keys(INLINE_STYLES).reduce(
    (acc, key) => Modifier.removeInlineStyle(acc, editorState.getSelection(), INLINE_STYLES[key]),
    contentState
  )

  return EditorState.push(editorState, contentWithoutStyles, 'change-inline-style')
}

export const inlineHandler: HandlerFunction = (e, editorState) => {
  e.preventDefault()
  return RichUtils.toggleInlineStyle(editorState, e.currentTarget.value)
}

export const blockHandler: HandlerFunction = (e, editorState) => {
  e.preventDefault()
  return RichUtils.toggleBlockType(editorState, e.currentTarget.value)
}
