import { SyntheticEvent, ReactNode } from 'react'
import { EditorState, DraftHandleValue, ContentBlock, ContentState, RawDraftContentState } from 'draft-js'
import { INLINE_STYLES } from './config'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HandlerFunction = (e: SyntheticEvent<HTMLButtonElement>, editorState: EditorState, data?: any) => EditorState

export type KeyHandler = (editorState: EditorState, onChange: (editorState: EditorState) => void, command: string) => DraftHandleValue

export type Strategy = (block: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) => void

export interface Rect {
  bottom: number
  height: number
  left: number
  right: number
  top: number
  width: number
}

export interface SelectState {
  showToolbar: boolean
  show: ButtonEntityShowOn
  currentBlockType?: string
  toolbarPosition?: Rect
}

export interface RichTextClassNames {
  root: string
}

export interface RichTextProps {
  editorKey?: string
  content?: RawDraftContentState
  editorState?: EditorState
  readOnly?: boolean
  classNames?: RichTextClassNames
  placeholder?: string
  enableToolbar?: boolean
  onChange?: (editorState: EditorState) => void
}

export type ButtonEntityShowOn = 'selection' | 'newline' | 'any'

export interface ButtonEntity {
  label: string
  style: INLINE_STYLES | string
  showOn?: ButtonEntityShowOn
  icon?: string
  nestedActions?: ButtonEntity[]
  needsInput?: boolean
  handler?: HandlerFunction
  component?: () => ReactNode
}
