/** @format */

import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Editor, EditorContent } from '@tiptap/react'
import { CreateCompletionResponseChoicesInner } from 'openai'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, collection, getDocs, query } from 'firebase/firestore'

import { DB } from '@common/helpers/db'
import { auth, db } from '@common/services/firebase'
import { getRevisedCopy, getToneEmoji } from '@common/services/openai'
import { rootState } from '@common/helpers/root'
import { toneState } from '@common/helpers/tone'
import { Match, Replacement } from '@common/tiptap/language/language-types'
import { SuggestionsModal } from '@common/tiptap/suggestions'
import { RenderMode } from '@common/types/UI'
import Revision from './Revision'
import Toolbar from './Toolbar'
import Format from '@common/tiptap/format'
import { SuggestionProps } from '@common/tiptap/suggestions/views/Suggestions'

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
  const [_revision, _setRevision] = useState<void | CreateCompletionResponseChoicesInner[]>()

  const _fetchRevision = async (text: string) => {
    setRoot({ ...root, fetchingRevision: true })

    const result = await getRevisedCopy(text)
      .then(response => {
        console.log('_fetchRevision Response', response)
        return response.data.choices
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
        const message = response.data.choices[0].text

        setTone({ ...tone, fetching: false, icon: message?.match(emojiRegex)?.[0], message })
      })
      .catch(() => setTone({ ...tone, fetching: false }))
  }

  if (!editor) {
    return null
  }

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        const userCollection = collection(db, 'users')
        const userDocRef = doc(userCollection, user.uid)
        const ignoreCollection = collection(userDocRef, 'ignorelist')
        const queryDocs = query(ignoreCollection)
        getDocs(queryDocs)
          .then(checkQuery => {
            if (checkQuery.size > 0) {
              getDocs(ignoreCollection)
                .then(querySnapshot => {
                  DB.dictionary.clear()
                  querySnapshot.forEach(async (data: any) => {
                    const newData = data.data().data
                    console.log('Scribe/Firebase/ignorelist', newData)
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
            console.error('Error getting ignoreCollection:', error)
          })
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
