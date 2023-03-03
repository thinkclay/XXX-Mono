/** @format */

import { Editor } from '@tiptap/react'

import { Popup } from '@common/tiptap/language'
import { Replacement } from '@common/tiptap/language/language-types'

import Close from './Close'

interface SuggestionProps {
  editor: Editor
  message: string
  replacements: Replacement[]
  ignore: () => void
  accept: (replacement: Replacement) => void
}

function Suggestion({ editor, message, replacements, ignore, accept }: SuggestionProps) {
  return (
    <Popup editor={editor} tippyOptions={{ placement: 'bottom', animation: 'fade' }}>
      <header className="header">
        <Close handler={ignore} />
      </header>

      <div className="message">{message}</div>

      <ul className="suggestions">
        {replacements.map((replacement, index) => {
          return (
            <li key={index} onClick={() => accept(replacement)}>
              {replacement.value}
            </li>
          )
        })}
      </ul>
    </Popup>
  )
}

export default Suggestion
