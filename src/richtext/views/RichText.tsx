/** @jsx createElement **/
import { createElement, FC, RefObject, useState, useRef, useEffect } from 'react'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
import { keyHandler, returnHandler } from '../helpers/keyHelper'
import { selectionHandler, defaultSelectState } from '../helpers/selectionHelper'
import Toolbar from './Toolbar'
import { blockRenderMap, defaultProps, styleMap, decorators } from '../config'
import { RichTextProps } from '../types'
import { blockRenderer } from '../helpers/richtextHelper'

export const RichText: FC<RichTextProps> = ({
  editorKey,
  classNames = defaultProps.classNames,
  content,
  editorState,
  onChange,
  placeholder = defaultProps.placeholder,
  readOnly = defaultProps.readOnly,
  enableToolbar = defaultProps.enableToolbar,
}) => {
  const _ref: RefObject<HTMLDivElement> = useRef(null)
  const [_selectState, _setSelectState] = useState(defaultSelectState)
  const [_showToolbar, _setShowToolbar] = useState(false)

  if (enableToolbar) {
    useEffect(() => {
      setTimeout(() => {
        _setShowToolbar(_selectState.showToolbar)
      }, 1000)
    }, [_selectState.showToolbar])
  }

  const _changeHandler = (editorState: EditorState): void => {
    if (onChange) onChange(editorState)

    _setSelectState(selectionHandler(editorState))
  }

  const unmanagedState = content ? EditorState.createWithContent(convertFromRaw(content), decorators) : EditorState.createEmpty(decorators)

  return (
    <div className={classNames.root} ref={_ref}>
      {enableToolbar && !readOnly && _showToolbar && (
        <Toolbar editorRef={_ref} onChange={_changeHandler} editorState={editorState} selectState={_selectState} />
      )}

      <Editor
        editorKey={editorKey}
        readOnly={readOnly}
        placeholder={placeholder}
        spellCheck={true}
        editorState={editorState || unmanagedState}
        customStyleMap={styleMap}
        blockRenderMap={blockRenderMap}
        blockRendererFn={blockRenderer}
        onChange={_changeHandler}
        handleReturn={e => returnHandler(editorState, _changeHandler, e)}
        handleKeyCommand={command => keyHandler(editorState, _changeHandler, command)}
      />
    </div>
  )
}
