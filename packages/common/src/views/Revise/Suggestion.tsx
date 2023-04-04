/** @format */

import { Editor } from '@tiptap/react'

import { Popup } from '@common/tiptap/language'
import { Replacement } from '@common/tiptap/language/language-types'

import Close from './Close'
import { v4 } from 'uuid'
import { useEffect, useState } from 'react'

interface SuggestionProps {
  editor: Editor
  message: string
  replacements: Replacement[]
  ignore: () => void
  accept: (replacement: Replacement) => void
}

function Suggestion({ editor, message, replacements, ignore, accept }: SuggestionProps) {
  const [_show, _setShow] = useState<boolean>(false)

  useEffect(() => {
    _setShow(replacements || message ? true : false)
  }, [replacements, message])

  return (
    <Popup editor={editor} tippyOptions={{ placement: 'bottom', animation: 'fade' }}>
      <header className="header">
        <Close handler={ignore} />
      </header>

      <div className="message">{message}</div>

      <ul className="suggestions">
        {replacements.slice(0,5).map(replacement => {
          return (
            <li
              key={v4()}
              onClick={() => {
                console.log('Suggestion clicked')
                accept(replacement)
              }}
            >
              {replacement.value}
            </li>
          )
        })}
      </ul>
    </Popup>
  )
}

export default Suggestion
