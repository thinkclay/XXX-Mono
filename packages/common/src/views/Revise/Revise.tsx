/** @format */

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import { CreateCompletionResponseChoicesInner } from 'openai'
import { Editor } from '@tiptap/react'
import { useLocation } from 'wouter'

import { getRevisedCopy } from '@common/helpers/openai'
import { rootState } from '@common/helpers/root'
import Next from './Next'
import Replace from './Replace'
import Flag from './Flag'
import Suggestion from './Suggestion'
import Revision from './Revision'

import '@common/assets/styles/revise.css'
import { pluginKey, RevisionedOptions } from '@common/tiptap/suggestion/suggestion-extension'
import { fetchCompletions } from '@common/tiptap/suggestion/suggestion-service'
import Copy from './Copy'
import Reload from './Reload'

interface Props {
  loading: boolean
  editor: Editor
}

const key = 'c2stamZ5UmhQZDIyRHNURUxBUU9iMFlUM0JsYmtGSjVPRThoRTR6bndtRHl5YWpHMjh5'
const placeholder =
  'Cyrus is disruptive in class. He is constantly distracting other students and is aggressive with me when I try to correct his behavior. Can you please respond to me ASAP so that we can discus a course of action?'

const Revise = ({ loading, editor }: Props) => {
  const [_root, _setRoot] = useRecoilState(rootState)
  const [_location, _setLocation] = useLocation()
  const [_state, _setState] = useState<RevisionedOptions>({} as RevisionedOptions)
  const [_suggestions, _setSuggestions] = useState([])
  const [_result, _setResult] = useState<void | CreateCompletionResponseChoicesInner[]>()
  const [_index, _setIndex] = useState<number>(0)
  const _highlighted: string = _suggestions[_index]

  const updateHtml = () => navigator.clipboard.writeText(editor.getHTML())
  const proofread = () => editor.commands.proofread()

  const _issue = useMemo(() => {
    return _state.issue
  }, [_state])

  const _fetchRevision = async () => {
    _setRoot({ ..._root, loading: true })

    const result = await getRevisedCopy(placeholder, atob(key))
      .then(response => {
        console.log('Response', Response)
        return response.data.choices
      })
      .catch(console.log)

    _setResult(result)
    _setRoot({ ..._root, loading: false })
  }

  useEffect(() => {
    editor?.on('transaction', ({ editor, transaction }) => {
      const newState = pluginKey.getState(editor.view.state)
      _setState({
        ..._state,
        ...newState,
      })
    })

    return () => {
      editor?.off('transaction')
    }
  }, [editor, _state])

  useEffect(() => {
    ;(async () => {
      if (!_issue) return

      const result = _state.result[_issue.id]
      const response = await fetchCompletions(result.input)

      console.log('Response in Revise', response)

      _setSuggestions(() => {
        return response.results
      })
    })()
  }, [_issue, _state.result])

  const _replaceHandler = useCallback(() => {
    if (!editor) return
    if (!_issue) return

    editor
      ?.chain()
      .focus()
      .insertContentAt(
        {
          from: _issue.from,
          to: _issue.to,
        },
        _highlighted.replace(/\.$/, '')
      )
      .run()
  }, [editor, _highlighted, _issue])

  const _prevHandler = () => _setIndex(_index - 1 < 0 ? _suggestions.length - 1 : _index - 1)
  const _nextHandler = () => _setIndex(_index + 1 > _suggestions.length - 1 ? 0 : _index + 1)

  const _acceptHandler = (content: string) => {
    editor?.commands.setContent(content)
    _setSuggestions([])
  }

  return (
    <aside className="Revise">
      <div className="Toolbar">
        <div className="Actions">
          <button onClick={updateHtml}>
            <Copy />
          </button>
          <button onClick={proofread}>
            <Reload />
          </button>
          <Replace active={_suggestions.length > 0} handler={_replaceHandler} />
          <Next handler={_nextHandler} />
          <span className="count">{_suggestions.length > 0 && `${_index + 1} / ${_suggestions.length}`}</span>
        </div>
        <Flag handler={_fetchRevision} />
      </div>

      {loading ? 'Loading...' : ''}

      <Suggestion suggestions={_suggestions} highlighted={_highlighted} />

      <Revision acceptHandler={_acceptHandler} result={_result} />
    </aside>
  )
}

export default Revise
