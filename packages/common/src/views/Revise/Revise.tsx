/** @format */

import { useCallback, useEffect, useMemo, useState } from 'react'
import { Editor } from '@tiptap/react'
import { fetchSuggestions } from '@common/helpers/eberhardt'
import { pluginKey, RevisionedOptions } from '@common/extensions'

import '@common/assets/styles/revise.css'
import Next from './Next'
import Flag from './Flag'
import Replace from './Replace'
import Suggestion from './Suggestion'

interface Props {
  editor: Editor | null
}

const Revise = ({ editor }: Props) => {
  const [state, setState] = useState<RevisionedOptions>({} as RevisionedOptions)
  const [suggestions, setSuggestions] = useState([])

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

  return (
    <aside className="Revise">
      <nav className="Toolbar">
        <Replace handler={_replaceHandler} />
        <Next handler={_nextHandler} />
        <span className="count">{suggestions.length > 0 && `${index + 1} / ${suggestions.length}`}</span>
      </nav>

      <Suggestion suggestions={suggestions} highlighted={highlighted} />
    </aside>
  )
}

export default Revise
