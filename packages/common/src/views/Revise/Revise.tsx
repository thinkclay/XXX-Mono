/** @format */

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Editor } from '@tiptap/react'
import { fetchSuggestions } from '@common/helpers/eberhardt'
import { pluginKey, RevisionedOptions } from '@common/extensions'

import { menuState, rootState, rootDefault } from '@common/helpers/root'
import Next from './Next'
import Flag from './Flag'
import Replace from './Replace'
import Suggestion from './Suggestion'
import Menu from './Menu'

import '@common/assets/styles/revise.css'

interface Props {
  editor: Editor | null
}

const Revise = ({ editor }: Props) => {
  const [state, setState] = useState<RevisionedOptions>({} as RevisionedOptions)
  const [suggestions, setSuggestions] = useState([])
  const [root, setRoot] = useRecoilState(rootState)

  const _toggleMenu = () => {
    console.log('Toggle Menu')
    setRoot({ ...rootDefault, menuOpen: !root.menuOpen })
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

  return (
    <aside className="Revise">
      <div className="Toolbar">
        <div className="Actions">
          <Replace handler={_replaceHandler} />
          <Next handler={_nextHandler} />
          <span className="count">{suggestions.length > 0 && `${index + 1} / ${suggestions.length}`}</span>
        </div>
        <Menu open={root.menuOpen} handler={_toggleMenu} />
      </div>

      <Suggestion suggestions={suggestions} highlighted={highlighted} />
    </aside>
  )
}

export default Revise
