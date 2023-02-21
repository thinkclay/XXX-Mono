/** @jsx createElement **/
import { createElement, FC, SyntheticEvent, useRef, useState, useEffect, RefObject, ReactNode, Fragment } from 'react'
import { EditorState } from 'draft-js'
import { getBoundsForNode } from '../helpers/selectionHelper'
import { buttonEntities } from '../config'
import { SelectState, ButtonEntity } from '../types'
import ToolbarButton from './ToolbarButton'
import CheckIcon from './icons/CheckIcon'
import CancelIcon from './icons/CancelIcon'

interface Props {
  editorRef: RefObject<HTMLDivElement>
  editorState: EditorState
  selectState: SelectState
  onChange: (s: EditorState) => void
}

interface Position {
  left: number
  top: number
}

const Toolbar: FC<Props> = ({
  editorRef,
  editorState,
  selectState: { showToolbar, toolbarPosition, currentBlockType, show },
  onChange,
}) => {
  const _defaultPosition: Position = { left: 0, top: -40 }
  const [_editorRect, _setEditorRect] = useState<ClientRect>(null)
  const [_toolbarRect, _setToolbarRect] = useState<ClientRect>(null)
  const [_position, _setPosition] = useState(_defaultPosition)
  const [_showToolbar, _setShowToolbar] = useState(false)
  const [_showInput, _setShowInput] = useState(false)
  const [_inputVal, _setInputVal] = useState('')
  const [_currentEntity, _setCurrentEntity] = useState<null | ButtonEntity>(null)
  const _ref = useRef(null)

  useEffect(() => {
    _setEditorRect(getBoundsForNode(editorRef))
    _setToolbarRect(getBoundsForNode(_ref))
    _setShowToolbar(showToolbar)

    if (showToolbar && toolbarPosition && _editorRect && _toolbarRect) {
      const editorMidPoint = _editorRect.width / 2
      const left =
        toolbarPosition.left > editorMidPoint
          ? 0
          : Math.max(0, toolbarPosition.left - _editorRect.left + toolbarPosition.width / 2 - _toolbarRect.width / 2)
      const top =
        toolbarPosition.top - _editorRect.top - _toolbarRect.height - 10 < 0
          ? -40
          : toolbarPosition.top - _editorRect.top - _toolbarRect.height - 10

      _setPosition({
        left,
        top,
      })
    }
  }, [toolbarPosition, showToolbar])

  const _onChange: typeof onChange = editorState => {
    onChange(editorState)
    _setCurrentEntity(null)
    _setPosition(_defaultPosition)
  }

  const _buttonHandler = (e: SyntheticEvent<HTMLButtonElement>, entity: ButtonEntity): void => {
    if (!entity.handler) return

    if (entity.needsInput) {
      _setShowInput(true)
      _setCurrentEntity(entity)
    } else {
      onChange(entity.handler(e, editorState))
    }
  }

  const _renderInput = (): ReactNode => (
    <Fragment>
      <input className="toolbar-input" type="text" onChange={e => _setInputVal(e.currentTarget.value)} />
      <button
        className="toolbar-button confirm visible"
        onClick={e => {
          _setShowInput(false)
          _onChange(_currentEntity.handler(e, editorState, _inputVal))
        }}
      >
        {CheckIcon()}
      </button>
      <button
        className="toolbar-button cancel visible"
        onClick={() => {
          _setInputVal('')
          _setShowInput(false)
        }}
      >
        {CancelIcon()}
      </button>
    </Fragment>
  )

  const _renderButtons = (): ReactNode =>
    buttonEntities.map(entity => (
      <ToolbarButton
        key={entity.style}
        active={entity.style === currentBlockType}
        visible={!entity.showOn || entity.showOn === 'any' || entity.showOn === show}
        clickHandler={e => _buttonHandler(e, entity)}
        entity={entity}
        nestedActions={
          entity.nestedActions &&
          entity.nestedActions.map(b => (
            <ToolbarButton key={b.style} active={b.style === currentBlockType} clickHandler={e => _buttonHandler(e, b)} entity={b} />
          ))
        }
      />
    ))

  return (
    <div
      className={`editor-toolbar toolbar-float visible-${_showToolbar || _showInput}`}
      style={{ left: _position.left, top: _position.top }}
      ref={_ref}
    >
      {_showInput ? _renderInput() : _renderButtons()}
    </div>
  )
}

export default Toolbar
