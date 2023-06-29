/** @format */

import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { Editor, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextStyle from '@tiptap/extension-text-style'
import Typography from '@tiptap/extension-typography'
import FontFamily from '@tiptap/extension-font-family'
import Highlight from '@tiptap/extension-highlight'
import FloatingMenu from '@tiptap/extension-floating-menu'

import { PageProps } from '@common/types/UI'
import { LanguageTool } from '@common/tiptap/language'
import { LTMeta, Match } from '@common/tiptap/language/language-types'
import { rootState } from '@common/helpers/root'
import LoadingScreen from './LoadingScreen'
import Scribe from '../Revise/Scribe'
import { Bias, BiasMark } from '@common/tiptap/bias'

interface Props extends PageProps {
  onUpdate?: (text: string) => void
  content?: string | undefined
  handleKeyDown?: (event: any, editor: Editor) => void
}

function MainScreen({ mode, onUpdate, content, handleKeyDown }: Props) {
  const [root, setRoot] = useRecoilState(rootState)
  const [match, setMatch] = useState<Match | null>(null)

  const editor = useEditor({
    autofocus: 'start',
    content,
    onUpdate({ editor }) {
      onUpdate && onUpdate(editor.getHTML())
    },
    onTransaction({ editor, transaction }) {
      const fetchingLanguage = transaction.getMeta(LTMeta.LoadingTransaction)
      const fetchingBias = transaction.getMeta('BIAS_FETCHING')
      const spellingCount = document.querySelectorAll('span.language').length
      const biasCount = document.querySelectorAll('mark.bias').length
      setRoot({ ...root, fetchingLanguage, fetchingBias, spellingCount, biasCount })

      const match = editor.extensionStorage.languagetool.match || transaction.getMeta('SUGGESTION')

      if (!match) return

      setTimeout(() => setMatch(match))
    },
    extensions: [
      StarterKit,
      Highlight,
      Typography,
      Link.configure({
        validate: (href: string) => /^https?:\/\//.test(href),
      }),
      Image,
      TextStyle,
      BiasMark,
      Bias,
      LanguageTool.configure({
        documentId: 'main',
      }),
    ],
  })

  if (!editor) return <LoadingScreen />

  return <Scribe editor={editor} match={match} mode={mode} handleKeyDown={handleKeyDown} />
}

export default MainScreen
