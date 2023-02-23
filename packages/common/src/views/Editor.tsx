/** @format */

import { useEffect, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'

import { Revisioned } from '@common/extensions'
import Revise from '@common/views/Revise/Revise'
import { Revision } from '@common/types/Revision'
import Logo from '@common/views/Logo'
import { getRevision, parseRevision } from '@common/helpers/openai'

const placeholder =
  'Cyrus is disruptive in class. He is constantly distracting other students and is aggressive with me when I try to correct his behavior. Can you please respond to me ASAP so that we can discus a course of action?'

function Editor() {
  const [_revision, _setRevision] = useState<null | Revision>(null)

  const editor = useEditor({
    autofocus: true,
    editorProps: {
      attributes: {},
    },
    extensions: [
      StarterKit,
      Highlight,
      Revisioned.configure(),
      Placeholder.configure({
        placeholder: 'Begin composing here...',
      }),
    ],
    content: placeholder,
  })

  return (
    <div className="Editor">
      <div>
        <EditorContent editor={editor} className="Editor" />
        <Revise editor={editor} />
      </div>

      {/* <Logo className={_loading ? 'loading' : ''} handler={_onSubmit} /> */}
    </div>
  )
}

export default Editor
