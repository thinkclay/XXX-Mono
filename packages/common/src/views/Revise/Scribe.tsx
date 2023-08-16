/** @format */

import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Editor, EditorContent } from '@tiptap/react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, collection, getDocs, query, Query } from 'firebase/firestore'
import OpenAI from 'openai'

import { DB } from '@common/helpers/db'
import { auth, db } from '@common/services/firebase'
import { getRevisedCopy, getToneEmoji } from '@common/services/openai'
import { rootState } from '@common/helpers/root'
import { toneState } from '@common/helpers/tone'
import { Match } from '@common/tiptap/language/language-types'
import { SuggestionsModal } from '@common/tiptap/suggestions'
import { RenderMode } from '@common/types/UI'
import Revision from './Revision'
import Toolbar from './Toolbar'
import Format from '@common/tiptap/format'

interface ScribeProps {
  editor: Editor
  match: Match | null
  mode: RenderMode
  handleKeyDown?: ((event: any, editor: Editor) => void | undefined) | undefined
}

function Scribe({ editor, match, mode, handleKeyDown }: ScribeProps) {
  const [root, setRoot] = useRecoilState(rootState)
  const [tone, setTone] = useRecoilState(toneState)
  const [timeoutId, setTimeoutId] = useState<any>(null)
  const [_revision, _setRevision] = useState<void | OpenAI.CompletionChoice[]>()

  const _fetchRevision = async (text: string) => {
    setRoot({ ...root, fetchingRevision: true })

    const result = await getRevisedCopy(text)
      .then(response => {
        console.log('_fetchRevision Response', response)
        return response.choices
      })
      .catch(console.log)

    _setRevision(result)
    setRoot({ ...root, fetchingRevision: false })
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId)
    }
  }, [timeoutId])

  const _fetchTone = async (text: string) => {
    setTone({ ...tone, fetching: true })

    await getToneEmoji(text)
      .then(response => {
        const emojiRegex = /👍|👎|😃|😢|🙌|🤷‍♀️|😮|👏|😰|😡|😟|🙄|😠|😎|🗣️|😍|🙏|🤨|😄|😤|😌|😅|😊|🎉|😊|⌛|😑|😅|❤️|😭/
        const message = response.choices[0].text

        setTone({ ...tone, fetching: false, icon: message?.match(emojiRegex)?.[0], message })
      })
      .catch(() => setTone({ ...tone, fetching: false }))
  }

  if (!editor) {
    return null
  }

  useEffect(() => {
    const fetchAndProcessData = async (collectionRef: Query<unknown>, dbKey: string) => {
      const queryDocs = query(collectionRef)
      try {
        const querySnapshot = await getDocs(queryDocs)
        if (querySnapshot.size > 0) {
          querySnapshot.forEach(async (data: any) => {
            const newData = data.data()[dbKey]
            newData.forEach((entry: any) => {
              DB.suggestion.add({
                category: entry.category,
                type: entry.type,
                input: entry.input,
                date: entry.date,
              })
            })
          })
        }
      } catch (error) {
        console.error(`Error getting ${dbKey}: `, error)
      }
    }

    onAuthStateChanged(auth, async user => {
      if (user) {
        const userCollection = collection(db, 'users')
        const userDocRef = doc(userCollection, user.uid)

        const ignoreCollection = collection(userDocRef, 'ignorelist')
        const ignorequeryDocs = query(ignoreCollection)
        getDocs(ignorequeryDocs)
          .then(checkQuery => {
            if (checkQuery.size > 0) {
              getDocs(ignoreCollection)
                .then(querySnapshot => {
                  DB.dictionary.clear()
                  querySnapshot.forEach(async (data: any) => {
                    const newData = data.data().data
                    newData.forEach((data: { Value: any }) => {
                      DB.dictionary.add({ value: data.Value })
                    })
                  })
                })
                .catch(error => {
                  console.error('Error getting documents: ', error)
                })
            }
          })
          .catch(error => {
            console.error('Error getting ignore:', error)
          })

        const biasCollection = collection(userDocRef, 'bias')
        fetchAndProcessData(biasCollection, 'bias')

        const languageCollection = collection(userDocRef, 'language')
        fetchAndProcessData(languageCollection, 'language')
      }
    })
  }, [match])

  useEffect(() => {
    const text = editor.getText()
    const newTimeoutId = setTimeout(() => {
      if (text.length < 150) return setTone({ ...tone, fetching: false, icon: null })
      _fetchTone(text)
    }, 1000)
    setTimeoutId(newTimeoutId)
  }, [editor.getText()])

  const _reload = () => editor.commands.proofread()
  const _rewrite = () => _fetchRevision(editor.getText())
  const _acceptRevision = (content: string) => {
    editor.commands.setContent(content)
    _setRevision()
  }
  const _declineRevision = () => _setRevision()

  return (
    <div className="Main">
      <SuggestionsModal editor={editor} match={match} />
      <Format editor={editor} />

      {_revision ? (
        <Revision accept={_acceptRevision} decline={_declineRevision} revision={_revision} />
      ) : (
        <div>
          <EditorContent editor={editor} onKeyDown={handleKeyDown && (event => handleKeyDown(event, editor))} />
        </div>
      )}

      <Toolbar mode={mode} reload={_reload} rewrite={_rewrite} editor={editor} />
    </div>
  )
}

export default Scribe
