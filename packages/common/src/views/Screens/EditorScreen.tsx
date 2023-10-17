/** @format */

import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { Editor, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextStyle from '@tiptap/extension-text-style'
import Typography from '@tiptap/extension-typography'
import Highlight from '@tiptap/extension-highlight'

import { PageProps } from '@common/types/UI'
import { rootState } from '@common/helpers/root'
import LoadingScreen from './LoadingScreen'
import Scribe from '../Revise/Scribe'
import { TIPTAP } from '@common/helpers/logger'
import { Bias, BiasMark, LanguageMark } from '@common/tiptap/bias'
import { Match } from '@common/tiptap/bias/bias'

interface Props extends PageProps {
  className?: string
  onUpdate?: (text: string) => void
  content?: string | undefined
  handleKeyDown?: (event: any, editor: Editor) => void
}

export default function EditorScreen({ mode, className, onUpdate, content, handleKeyDown }: Props) {
  const [root, setRoot] = mode === 'embedded' ? [null, null] : useRecoilState(rootState)
  const [match, setMatch] = useState<Match | null>(null)

  const editor = useEditor({
    autofocus: 'start',
    content,
    onUpdate({ editor }) {
      onUpdate && onUpdate(editor.getHTML())
    },
    onTransaction({ editor, transaction }) {
      const match = transaction.getMeta(TIPTAP.BIAS.MATCH)
      const fetchingBias = editor.extensionStorage.bias.fetching
      const spellingCount = document.querySelectorAll('mark.language').length
      const biasCount = document.querySelectorAll('mark.bias').length
      setRoot && setRoot({ ...root, fetchingBias, spellingCount, biasCount })

      if (editor.extensionStorage.bias.fetching || !match) return

      setRoot && setRoot({ ...root, fetchingBias, spellingCount, biasCount })
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
      LanguageMark,
      Bias,
    ],
  })

  return editor ? (
    <>
      <Scribe editor={editor} match={match} mode={mode} handleKeyDown={handleKeyDown} />
    </>
  ) : (
    <LoadingScreen />
  )
}
