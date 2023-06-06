/** @format */

import { useState } from 'react'
import { Editor } from '@tiptap/react'

import { Popup } from '@common/tiptap/language'
import { Replacement } from '@common/tiptap/language/language-types'

import Close from './Popup/Close'
import { v4 } from 'uuid'
import Ignore from './Popup/Ignore'

interface SuggestionProps {
  editor: Editor
  message: string | undefined
  replacements: Replacement[]
  ignore: () => void
  accept: (replacement: Replacement) => void
}

function Suggestion({ editor, message, replacements, ignore, accept }: SuggestionProps) {
  return (
    <Popup editor={editor}>
      {message && (
        <>
          <header className="header">
            <Ignore handler={ignore} />
          </header>

          <div className="message">{message}</div>

          <ul className="suggestions">
            {replacements.slice(0, 5).map(replacement => {
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
        </>
      )}
    </Popup>
  )
}

export default Suggestion
