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

interface Props extends PageProps {
  onUpdate?: (text: string) => void
}

function MainScreen({ mode, onUpdate }: Props) {
  const [_root, _setRoot] = useRecoilState(rootState)
  const [_match, _setMatch] = useState<Match | null>(null)
  const [_revision, _setRevision] = useState<void | CreateCompletionResponseChoicesInner[]>()

  const editor = useEditor({
    autofocus: 'start',
    onUpdate({ editor }) {
      setTimeout(() => _setMatch(editor.extensionStorage.languagetool.match))
      console.log('onUpdate?', onUpdate)
      onUpdate && onUpdate(editor.getHTML())
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

      {_revision ? (
        <Revision accept={_acceptRevision} decline={_declineRevision} revision={_revision} />
      ) : (
        <EditorContent editor={editor} />
      )}

      <Toolbar mode={mode} copy={_copy} reload={_reload} rewrite={_rewrite} />
    </div>
  )
}

export default MainScreen
