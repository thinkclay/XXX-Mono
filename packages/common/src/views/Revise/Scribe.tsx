/** @format */

import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Editor, EditorContent } from '@tiptap/react'
import { doc, collection, getDocs, query, Query } from 'firebase/firestore'
import OpenAI from 'openai'

import { DB } from '@common/helpers/db'
import { firestore } from '@common/services/firebase'
import { getRevisedCopy, getToneEmoji } from '@common/services/openai'
import { rootState } from '@common/helpers/root'
import { toneState } from '@common/helpers/tone'
import { Match } from '@common/tiptap/bias/bias'
import { SuggestionsModal } from '@common/tiptap/suggestions'
import { RenderMode } from '@common/types/UI'
import Revision from './Revision'
import Toolbar from './Toolbar'
import Format from '@common/tiptap/format'
import { useFirebase } from '@common/services/firebase/hook'
import { useUser } from 'reactfire'
import { MScribe, MUser, defaultScribe, getSetting } from '@common/models'

interface ScribeProps {
  editor: Editor
  match: Match | null
  mode: RenderMode
  handleKeyDown?: ((event: any, editor: Editor) => void | undefined) | undefined
}

function Scribe({ editor, match, mode, handleKeyDown }: ScribeProps) {
  const { authUser } = useFirebase()
  const [root, setRoot] = useRecoilState(rootState)
  const [tone, setTone] = useRecoilState(toneState)
  const [toneLastChecked, setToneLastChecked] = useState(Date.now())
  const [_revision, _setRevision] = useState<void | OpenAI.CompletionChoice[]>()

  const { status, data: session } = useUser<MUser>()
  const [scribe, setScribe] = useState<MScribe>(defaultScribe)

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

  if (!editor) {
    return null
  }

  useEffect(() => {
    if (status !== 'success' || !session) return
    getSetting(session.uid).then(s => {
      if (!s) return
      setScribe({ ...scribe, ...s.scribe })
    })
  }, [status, session])

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
    if (authUser) {
      const userCollection = collection(firestore, 'users')
      const userDocRef = doc(userCollection, authUser.uid)
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
                  newData.forEach((data: { Value: any; timestamp: Date }) => {
                    DB.dictionary.add({ value: data.Value, timestamp: data.timestamp })
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
  }, [match, authUser])

  useEffect(() => {
    const text = editor.getText()

    // Gatekeeping based on text length and time last checked > 15s
    if (text.length < 250 || Date.now() - toneLastChecked < 15000) {
      return setTone({ ...tone, fetching: false, icon: null })
    }

    setTone({ ...tone, fetching: true })
    setToneLastChecked(Date.now())

    async function _f() {
      const { icon, message } = await getToneEmoji(text)
      setTone({ ...tone, fetching: false, icon, message })
    }

    _f()
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
      {scribe.formatting && <Format editor={editor} />}

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
