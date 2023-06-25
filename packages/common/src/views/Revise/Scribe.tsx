/** @format */

import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Editor, EditorContent } from '@tiptap/react'
import { CreateCompletionResponseChoicesInner } from 'openai'

import { getRevisedCopy, getTone, getToneEmoji } from '@common/services/openai'
import { rootState } from '@common/helpers/root'
import { toneState } from '@common/helpers/tone'
import { Match, Replacement } from '@common/tiptap/language/language-types'
import Suggestion from './Suggestion'
import Revision from './Revision'
import Toolbar from './Toolbar'
import { RenderMode } from '@common/types/UI'
import { DB } from '@common/helpers/db'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '@common/services/firebase'
import { doc, collection, getDocs, query } from 'firebase/firestore'

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

  const _setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)
    console.log(previousUrl)
    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const _addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

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
                  DB.ignoredWords.clear()
                  querySnapshot.forEach(async (data: any) => {
                    const newData = data.data().data
                    console.log(newData)
                    newData.forEach((data: { Value: any }) => {
                      DB.ignoredWords.add({ value: data.Value })
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

  const _copy = () => navigator.clipboard.writeText(editor.getHTML())
  const _reload = () => editor.commands.proofread()
  const _rewrite = () => _fetchRevision(editor.getText())
  const _acceptRevision = (content: string) => {
    editor.commands.setContent(content)
    _setRevision()
  }
  const _declineRevision = () => _setRevision()
  const _message = () => match?.message
  const _replacements = () => match?.replacements || []
  const _ignore = () => editor.commands.ignoreLanguageToolSuggestion()
  const _acceptSuggestion = (replacement: Replacement) => editor.commands.insertContent(replacement.value)

  return (
    <div className="Main">
      <Suggestion editor={editor} message={_message()} replacements={_replacements()} ignore={_ignore} accept={_acceptSuggestion} />

      {_revision ? (
        <Revision accept={_acceptRevision} decline={_declineRevision} revision={_revision} />
      ) : (
        <div>
          <EditorContent editor={editor} onKeyDown={handleKeyDown && (event => handleKeyDown(event, editor))} />
        </div>
      )}

      <Toolbar mode={mode} copy={_copy} reload={_reload} rewrite={_rewrite} editor={editor} setLink={_setLink} addImage={_addImage} />
    </div>
  )
}

export default Scribe
