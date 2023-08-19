/** @format */

import { useEffect, useState } from 'react'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextStyle from '@tiptap/extension-text-style'
import Typography from '@tiptap/extension-typography'
import Highlight from '@tiptap/extension-highlight'

import { PageProps } from '@common/types/UI'
import { Match } from '@common/tiptap/language/language-types'
import LoadingScreen from './LoadingScreen'
import Scribe from '../Revise/Scribe'
import { Bias, BiasMark } from '@common/tiptap/bias'
import { TIPTAP } from '@common/helpers/logger'

interface Props extends PageProps {
  content?: string | undefined
}

export default function DemoScreen({ content }: Props) {
  const [loading, setLoading] = useState(true)
  const [match, setMatch] = useState<Match | null>(null)

  const editor = useEditor({
    autofocus: 'start',
    content,
    onTransaction({ editor, transaction }) {
      const match = transaction.getMeta(TIPTAP.BIAS.MATCH)

      if (editor.extensionStorage.bias.fetching || !match) return

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
    ],
  })

  useEffect(() => {
    setLoading(!!loading)
  }, [editor])

  if (loading || !editor) return <LoadingScreen />

  return <Scribe editor={editor} match={match} mode="embedded" />
}
