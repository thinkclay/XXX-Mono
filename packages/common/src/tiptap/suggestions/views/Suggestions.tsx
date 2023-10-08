import { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { Editor } from '@tiptap/react'

import { Match, Replacement } from '@common/tiptap/bias/bias'
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
    if (!element || editor.isDestroyed) return

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

export interface SuggestionProps {
  editor: Editor
  match: Match | null
}

export function SuggestionsModal({ editor, match }: SuggestionProps) {
  const handler = {
    ignore: () => console.log('@TODO: add ignore logic'),
    accept: (replacement: Replacement) => {
      editor.chain().toggleBiasMark().insertContent(replacement.value).run()
    },
  }

  return (
    <Suggestions editor={editor}>
      <header className="header">
        <div className="message">{match?.message}</div>
      </header>

      <ul className="suggestions">
        {match?.replacements.slice(0, 5).map(replacement => {
          return (
            <li
              key={v4()}
              onClick={() => {
                console.log('Suggestion clicked')
                handler.accept(replacement)
              }}
            >
              {String(replacement.value)}
            </li>
          )
        })}
      </ul>

      <footer className="footer">
        <Ignore handler={handler.ignore} />
      </footer>
    </Suggestions>
  )
}
