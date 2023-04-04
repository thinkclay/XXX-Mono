/** @format */

import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Editor, EditorContent } from '@tiptap/react'
import { CreateCompletionResponseChoicesInner } from 'openai'

import { getRevisedCopy, getTone } from '@common/services/openai'
import { rootState } from '@common/helpers/root'
import { toneState } from '@common/helpers/tone'
import { Match, Replacement } from '@common/tiptap/language/language-types'
import Suggestion from './Suggestion'
import Revision from './Revision'
import Toolbar from './Toolbar'
import { RenderMode } from '@common/types/UI'

interface ScribeProps {
  editor: Editor
  match: Match | null
  mode: RenderMode
}

function Scribe({ editor, match, mode }: ScribeProps) {
  const [root, setRoot] = useRecoilState(rootState)
  const [tone, setTone] = useRecoilState(toneState)
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

  const _fetchTone = async (text: string) => {
    setTone({ ...tone, fetching: true })

    const result = await getTone(text)
      .then(response => {
        console.log('_fetchTone Response', response.data.choices[0].text)
        return response.data.choices[0].text
      })
      .catch(console.log)

    setTone({ fetching: false, message: result || '' })
  }

  useEffect(() => {
    console.log('Fetch Tone')

    const text = editor.getText()

    if (text.length < 200) return

    _fetchTone(text)
  }, [match])

  const _copy = () => navigator.clipboard.writeText(editor.getHTML())
  const _reload = () => editor.commands.proofread()
  const _rewrite = () => _fetchRevision(editor.getText())
  const _acceptRevision = (content: string) => {
    editor.commands.setContent(content)
    _setRevision()
  }
  const _declineRevision = () => _setRevision()

  const _message = () => match?.message;
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
          <EditorContent editor={editor} />
        </div>
      )}

      <Toolbar mode={mode} copy={_copy} reload={_reload} rewrite={_rewrite} editor={editor}/>
    </div>
  )
}

export default Scribe
