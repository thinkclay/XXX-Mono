/** @format */

import { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { Editor } from '@tiptap/react'

import { Replacement } from '@common/tiptap/language/language-types'
import { SuggestionsPluginProps, SuggestionsPlugin } from '../suggestions-plugin'

import Ignore from './Ignore'

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export type SuggestionsProps = Omit<Optional<SuggestionsPluginProps, 'pluginKey'>, 'element'> & {
  className?: string
  children: React.ReactNode
}

export const Suggestions = ({ editor, className, children, tippyOptions }: SuggestionsProps) => {
  const [element, setElement] = useState<HTMLDivElement | null>(null)
  const pluginKey = 'suggestions'

  useEffect(() => {
    if (!element) {
      return
    }

    if (editor.isDestroyed) {
      return
    }

    const plugin = SuggestionsPlugin({
      pluginKey,
      editor,
      element,
      tippyOptions,
      shouldShow: null,
    })

    editor.registerPlugin(plugin)
    return () => editor.unregisterPlugin(pluginKey)
  }, [editor, element])

  return (
    <div ref={setElement} className={className} style={{ visibility: 'hidden' }}>
      {children}
    </div>
  )
}

interface SuggestionProps {
  editor: Editor
  message: string | undefined
  replacements: Replacement[]
  ignore: () => void
  accept: (replacement: Replacement) => void
}

export function SuggestionsModal({ editor, message, replacements, ignore, accept }: SuggestionProps) {
  return (
    <Suggestions editor={editor}>
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
    </Suggestions>
  )
}
