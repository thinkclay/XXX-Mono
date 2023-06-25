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

import { PageProps } from '@common/types/UI'
import { LanguageTool } from '@common/tiptap/language'
import { LTMeta, Match } from '@common/tiptap/language/language-types'
import { rootState } from '@common/helpers/root'
import LoadingScreen from './LoadingScreen'
import Scribe from '../Revise/Scribe'
import { Bias, BiasNode, BiasMark } from '@common/tiptap/bias'
import Highlight from '@tiptap/extension-highlight'

interface Props extends PageProps {
  onUpdate?: (text: string) => void
  content?: string | undefined
  handleKeyDown?: (event: any, editor: Editor) => void
}

function MainScreen({ mode, onUpdate, content, handleKeyDown }: Props) {
  const [_root, _setRoot] = useRecoilState(rootState)
  const [_match, _setMatch] = useState<Match | null>(null)
  const [_decos, _setDecos] = useState(0)

  const editor = useEditor({
    autofocus: 'start',
    content, //: `<bias-node><p>The owner, Bob, he's a real good ol' boy, and he treats his customers like family.</p></bias-node>`,
    onUpdate({ editor }) {
      setTimeout(() => _setMatch(editor.extensionStorage.languagetool.match))
      onUpdate && onUpdate(editor.getHTML())
    },
    onSelectionUpdate({ editor }) {
      setTimeout(() => _setMatch(editor.extensionStorage.languagetool.match))
    },
    onTransaction({ transaction }) {
      const fetchingLanguage = transaction.getMeta(LTMeta.LoadingTransaction)
      const spellingCount = document.querySelectorAll('mark.lt').length

      _setRoot({ ..._root, fetchingLanguage, spellingCount })
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
      BiasNode,
      BiasMark,
      Bias,
      LanguageTool.configure({
        documentId: 'main',
      }),
    ],
  })

  if (!editor) return <LoadingScreen />

  return <Scribe editor={editor} match={_match} mode={mode} handleKeyDown={handleKeyDown} />
}

export default MainScreen
