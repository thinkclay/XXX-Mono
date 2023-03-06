/** @format */

import { useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import Toolbar from '@common/views/Revise/Toolbar'
import { LanguageTool, LanguageToolHelpingWords, Popup } from '@common/tiptap/language'
import { Match, Replacement } from '@common/tiptap/language/language-types'
import Suggestion from './Revise/Suggestion'
import { rootState } from '@common/helpers/root'
import { useRecoilState } from 'recoil'
import { getRevisedCopy } from '@common/helpers/openai'
import Revision from './Revise/Revision'
import { CreateCompletionResponseChoicesInner } from 'openai'
import { PageProps } from '@common/types/UI'

const content = `
<p>To the parents of Jared,</p>

<p>I'm sending you a note to request a meeting ASAP regarding Jared's behavior.  He has been out of control the last few days and has destroyed the classroom. If this behavior doesn't stop soon, we'll have to consider more drastic measures.  Please reply to this email with a time and a phone number where I can reach you- I've tried several times and none if the phone numbers work.</p>

<p>Jared enjoys art and music class, where he excels, but generally doesn't engage in other subjects.</p>

<p>Jared is disruptive and disrupts other students' learning. He is unable to control himself during class, and is disrespectful to myself and other teachers. His behavior is out of control.</p>

<p>In addition, Jared reads several levels below grade level, and while he is making progress, I doubt he'll be able to reach grade level this year. His low reading level is hampering his ability to progress in other subjects, such as math and social studies.</p>

<p>In sum, Jared is struggling academically and socially, and would benefit from some interventions. I'm going to recommend he be evaluated for an IEP.</p>

<p>Mrs. Paul</p>
`

function MainScreen({ mode, height }: PageProps) {
  const [_root, _setRoot] = useRecoilState(rootState)
  const [_match, _setMatch] = useState<Match | null>(null)
  const [_revision, _setRevision] = useState<void | CreateCompletionResponseChoicesInner[]>()

  const editor = useEditor({
    autofocus: true,
    content: content,
    onUpdate({ editor }) {
      setTimeout(() => _setMatch(editor.extensionStorage.languagetool.match))
    },
    onSelectionUpdate({ editor }) {
      setTimeout(() => _setMatch(editor.extensionStorage.languagetool.match))
    },
    onTransaction({ transaction }) {
      const fetchingSuggestions = transaction.getMeta(LanguageToolHelpingWords.LoadingTransactionName)

      if (fetchingSuggestions === true) _setRoot({ ..._root, fetchingLanguage: true })
      if (fetchingSuggestions === false) _setRoot({ ..._root, fetchingLanguage: false })
    },
    extensions: [
      StarterKit,
      LanguageTool.configure({
        automaticMode: true,
        documentId: 'main',
      }),
    ],
  })

  if (!editor) return null

  const _fetchRevision = async (text: string) => {
    _setRoot({ ..._root, fetchingRevision: true })

    const result = await getRevisedCopy(text)
      .then(response => {
        console.log('Response', Response)
        return response.data.choices
      })
      .catch(console.log)

    _setRevision(result)
    _setRoot({ ..._root, fetchingRevision: false })
  }

  const _copy = () => navigator.clipboard.writeText(editor.getHTML())
  const _reload = () => editor.commands.proofread()
  const _rewrite = () => _fetchRevision(editor.getText())
  const _acceptRevision = (content: string) => {
    editor.commands.setContent(content)
    _setRevision()
  }
  const _declineRevision = () => _setRevision()

  const _message = () => _match?.message || 'No Message'
  const _replacements = () => _match?.replacements || []
  const _ignore = () => editor.commands.ignoreLanguageToolSuggestion()
  const _acceptSuggestion = (replacement: Replacement) => editor.commands.insertContent(replacement.value)

  return (
    <div className="Main">
      <Suggestion editor={editor} message={_message()} replacements={_replacements()} ignore={_ignore} accept={_acceptSuggestion} />

      <div>
        {_revision ? (
          <Revision accept={_acceptRevision} decline={_declineRevision} revision={_revision} />
        ) : (
          <EditorContent editor={editor} />
        )}
      </div>

      <Toolbar mode={mode} copy={_copy} reload={_reload} rewrite={_rewrite} />
    </div>
  )
}

export default MainScreen
