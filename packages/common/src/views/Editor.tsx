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
  const [_prompt, _setPrompt] = useState<string>(placeholder)
  const [_loading, _setLoading] = useState<boolean | null>(null)
  const [_html, _setHtml] = useState<string>('')

  const _onSubmit = () => {
    _setLoading(true)
  }

  useEffect(() => {
    if (_loading === null || _prompt.trim().length < 10) {
      return
    }

    if (_loading === true) {
      console.log('Fetching')

      const result = getRevision(_prompt)
        .then(response => {
          console.log('-- Response', response)
          _setRevision(parseRevision(response))
          _setLoading(false)
          return response
        })
        .catch(err => {
          console.error(err)
          _setLoading(null)
        })

      console.log('Result', result)
    }

    if (_loading === false) {
      console.log('Not Fetching')
    }
  }, [_loading, _prompt])

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
