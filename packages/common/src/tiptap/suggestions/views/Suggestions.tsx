/** @format */

import { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { Editor } from '@tiptap/react'
import { Match, Replacement } from '@common/tiptap/language/language-types'
import { SuggestionsPluginProps, SuggestionsPlugin } from '../suggestions-plugin'
import { auth, db } from '@common/services/firebase'
import Ignore from './Ignore'
import Close from './Close'
import { onAuthStateChanged } from 'firebase/auth'
import { Timestamp, addDoc, collection, doc, getDocs, query, setDoc } from 'firebase/firestore'
import { useRecoilValue } from 'recoil'
import { biasCountState } from '@common/helpers/root'

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

export interface SuggestionProps {
  editor: Editor
  match: Match | null
}

export function SuggestionsModal({ editor, match }: SuggestionProps) {
  const biasCount = useRecoilValue(biasCountState)
  const [acceptCount, setAcceptCount] = useState(0);
  const handler = {
    ignore: () => editor.commands.ignoreLanguageToolSuggestion(),
    accept: (replacement: Replacement) => {
      setAcceptCount((prevCount) => prevCount + 1);
      editor.chain().toggleBiasMark().insertContent(replacement.value).run()
    },
    close: () => null,
  }
  useEffect(() => {
    if (acceptCount <= 0) {
      return;
    }
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userCollection = collection(db, 'users');
        const userDocRef = doc(userCollection, user.uid);
        const flagsCollection = collection(userDocRef, 'acceptedflags');
        const queryDocs = query(flagsCollection);
        try {
          const checkQuery = await getDocs(queryDocs);
          if (checkQuery.size > 0) {
            const querySnapshot = await getDocs(flagsCollection);
            querySnapshot.forEach((data) => {
              const flagsListDocument = doc(flagsCollection, data.id);
              const newData = data.data().data;
              newData.push({ timestamp: Timestamp.now(), value: 1 });
              setDoc(flagsListDocument, { data: newData })
                .then(() => console.log('UPDATED Firebase', JSON.stringify(data)))
                .catch((e) => console.log('Error', e));
            });
          } else {
            await addDoc(flagsCollection, { data: [{ timestamp: Timestamp.now(), value: 1 }] });
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    });
  }, [acceptCount]);

  return (
    <Suggestions editor={editor}>
      <header className="header">
        <div className="message">{match?.message}</div>
        <Close handler={handler.close} />
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
              {replacement.value}
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
