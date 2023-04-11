/** @format */

import { useState } from 'react'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useRecoilState } from 'recoil'

import { PageProps } from '@common/types/UI'
import { LanguageTool, LanguageToolHelpingWords } from '@common/tiptap/language'
import { Match } from '@common/tiptap/language/language-types'
import { rootState } from '@common/helpers/root'
import LoadingScreen from './LoadingScreen'
import Scribe from './Revise/Scribe'

interface Props extends PageProps {
  onUpdate?: (text: string) => void
}

function MainScreen({ mode, onUpdate }: Props) {
  const [root, setRoot] = useRecoilState(rootState)
  const [_match, _setMatch] = useState<Match | null>(null)

  const editor = useEditor({
    autofocus: 'start',
    onUpdate({ editor }) {
      setTimeout(() => _setMatch(editor.extensionStorage.languagetool.match))
      onUpdate && onUpdate(editor.getHTML())
    },
    onSelectionUpdate({ editor }) {
      setTimeout(() => _setMatch(editor.extensionStorage.languagetool.match))
    },
    onTransaction({ transaction }) {
      const fetchingSuggestions = transaction.getMeta(LanguageToolHelpingWords.LoadingTransactionName)

      if (fetchingSuggestions === true) setRoot({ ...root, fetchingLanguage: true })
      if (fetchingSuggestions === false) setRoot({ ...root, fetchingLanguage: false })
    },
    extensions: [
      StarterKit,
      LanguageTool.configure({
        automaticMode: true,
        documentId: 'main',
      }),
    ],
  })

  if (!editor) return <LoadingScreen />

  return <Scribe editor={editor} match={_match} mode={mode} />
}

export default MainScreen
