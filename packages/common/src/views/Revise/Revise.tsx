/** @format */

import { useCallback, useEffect, useMemo, useState, SyntheticEvent } from 'react'
import { useRecoilState } from 'recoil'
import { CreateCompletionResponseChoicesInner } from 'openai'
import { Editor } from '@tiptap/react'
import { fetchSuggestions } from '@common/helpers/eberhardt'
import { pluginKey, RevisionedOptions } from '@common/extensions'
import { getRevisedCopy, getRevision, parseRevision } from '@common/helpers/openai'
import { rootState } from '@common/helpers/root'
import Next from './Next'
import Replace from './Replace'
import Suggestion from './Suggestion'
import Flag from './Flag'

import '@common/assets/styles/revise.css'

interface Props {
  editor: Editor | null
}

const key = 'c2stamZ5UmhQZDIyRHNURUxBUU9iMFlUM0JsYmtGSjVPRThoRTR6bndtRHl5YWpHMjh5'
const placeholder =
  'Cyrus is disruptive in class. He is constantly distracting other students and is aggressive with me when I try to correct his behavior. Can you please respond to me ASAP so that we can discus a course of action?'

const Revise = ({ editor }: Props) => {
  const [state, setState] = useState<RevisionedOptions>({} as RevisionedOptions)
  const [suggestions, setSuggestions] = useState([])
  const [root, setRoot] = useRecoilState(rootState)
  const [_result, _setResult] = useState<void | CreateCompletionResponseChoicesInner[]>()

  const _fetchRevision = async () => {
    setRoot({ ...root, loading: true, menuOpen: false })

    const result = await getRevisedCopy(placeholder, atob(key))
      .then(response => {
        console.log('Response', Response)
        return response.data.choices
      })
      .catch(console.log)
    _setResult(result)

    setRoot({ ...root, loading: false })
  }

  useEffect(() => {
    editor?.on('transaction', ({ editor, transaction }) => {
      const newState = pluginKey.getState(editor.view.state)
      setState({
        ...state,
        ...newState,
      })
    })

    return () => {
      editor?.off('transaction')
    }
  }, [editor, state])

  const [index, setIndex] = useState<number>(0)

  const highlighted: string = suggestions[index]

  const issue = useMemo(() => {
    return state.issue
  }, [state])

  useEffect(() => {
    ;(async () => {
      if (!issue) return

      const result = state.result[issue.id]
      const response = await fetchSuggestions(result.input)

      setSuggestions(() => {
        return response.results
      })
    })()
  }, [issue, state.result])

  const _replaceHandler = useCallback(() => {
    if (!editor) return
    if (!issue) return

    editor
      ?.chain()
      .focus()
      .insertContentAt(
        {
          from: issue.from,
          to: issue.to,
        },
        highlighted.replace(/\.$/, '')
      )
      .run()
  }, [editor, highlighted, issue])

  const _prevHandler = () => setIndex(index - 1 < 0 ? suggestions.length - 1 : index - 1)
  const _nextHandler = () => setIndex(index + 1 > suggestions.length - 1 ? 0 : index + 1)

  const _renderRevision = () => {
    if (!_result) return

    return _result.map(r => <p>{r.text}</p>)
  }

  return (
    <aside className="Revise">
      <div className="Toolbar">
        <div className="Actions">
          <Replace handler={_replaceHandler} />
          <Next handler={_nextHandler} />
          <span className="count">{suggestions.length > 0 && `${index + 1} / ${suggestions.length}`}</span>
        </div>
        <Flag handler={_fetchRevision} />
      </div>

      <Suggestion suggestions={suggestions} highlighted={highlighted} />

      <div className="Suggestion">{_renderRevision()}</div>
    </aside>
  )
}

export default Revise
