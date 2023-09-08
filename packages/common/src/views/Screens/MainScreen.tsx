/** @format */

import { StrictMode, useEffect, useState } from 'react'
import { RecoilRoot, useRecoilState } from 'recoil'
import { Editor, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextStyle from '@tiptap/extension-text-style'
import Typography from '@tiptap/extension-typography'
import Highlight from '@tiptap/extension-highlight'
import { Modal } from 'antd';
import { PageProps } from '@common/types/UI'
import { Match } from '@common/tiptap/language/language-types'
import { rootState } from '@common/helpers/root'
import LoadingScreen from './LoadingScreen'
import Scribe from '../Revise/Scribe'
import { Bias, BiasMark } from '@common/tiptap/bias'
import { TIPTAP } from '@common/helpers/logger'

interface Props extends PageProps {
  onUpdate?: (text: string) => void
  content?: string | undefined
  handleKeyDown?: (event: any, editor: Editor) => void
}

function MainScreen({ mode, onUpdate, content, handleKeyDown }: Props) {
  if (mode === 'embedded') {
    require('@common/assets/styles/index.scss')
  }

  const [root, setRoot] = mode === 'embedded' ? [null, null] : useRecoilState(rootState)
  const [match, setMatch] = useState<Match | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(true);
  
  useEffect(() => {
    const hasPopupBeenShown = localStorage.getItem('anonymizedPopup');
    if (hasPopupBeenShown) {
      setIsModalOpen(false);
    }
  }, []);

  const handleAccept = () => {
    setIsModalOpen(false);
    localStorage.setItem('anonymizedPopup', 'true');
  };

  const editor = useEditor({
    autofocus: 'start',
    content,
    onUpdate({ editor }) {
      onUpdate && onUpdate(editor.getHTML())
    },
    onTransaction({ editor, transaction }) {
      const match = transaction.getMeta(TIPTAP.BIAS.MATCH)
      const fetchingBias = editor.extensionStorage.bias.fetching
      setRoot && setRoot({ ...root, fetchingBias })

      if (editor.extensionStorage.bias.fetching || !match) return

      const spellingCount = document.querySelectorAll('span.language').length
      const biasCount = document.querySelectorAll('mark.bias').length
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
      Bias,
    ],
  })

  const rendered = editor ? <>
    {isModalOpen && (
      <Modal title="Profile Setup Confirmation" open={isModalOpen} onOk={handleAccept} onCancel={handleAccept} cancelButtonProps={{ style: { display: 'none' } }} okButtonProps={{ style: { display: 'block', margin: '0 auto', background: "#ff5c38" } }}>
        <p>Thank you for registering with ReVision! As reminder, your registration is solely for your own use, and all data related to your use of ReVision is anonymized.</p>
      </Modal>
    )}
    <Scribe editor={editor} match={match} mode={mode} handleKeyDown={handleKeyDown} />
  </> : <LoadingScreen />

  return mode === 'embedded' ? (
    <>
      <RecoilRoot>
        <StrictMode>
          <div id="RevisionApp">{rendered}</div>
        </StrictMode>
      </RecoilRoot>
    </>
  ) : (
    rendered
  )
}

export default MainScreen
