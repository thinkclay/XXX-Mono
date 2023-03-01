/** @format */

import { useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import Revise from '@common/views/Revise/Revise'
import { Revisioned } from '@common/tiptap/suggestion/suggestion-extension'
import { LanguageTool, LanguageToolHelpingWords, Popup } from '@common/tiptap/language'
import { Match, Replacement } from '@common/tiptap/language/language-types'
import Close from './Revise/Close'

const content = `
<p>To the parents of Jared,</p>

<p>Im sending you a note to request a meeting ASAP regarding Jareds behavior.  He has been out of control the last few days and has destroyed the classroom. If this behavor doesnt stop soon, we’ll have to consider more drastic measures.  Please reply to this email with a time and a phone number where I can reach you- I’ve tried several times and none if the phone numbers work.</p>

<p>Excellent spelling and grammar make you writing more credible and set you up for succes in a time where written communication gets more and more important. LanguageTool finds many more mistakes then other writing tools and is available for more than 20+ languages.We provide you with a state of the art grammar and spell checker and ensure correct punctuation and typography. However theres still a lot more to do.</p>

<p>Jared enjoys art and music class, where he excels, but generally doesn’t engage in other subjects.</p>

<p>Jared is disruptive and disrupts other students’ lerning. He is unable to control himself during class, and is disrespectful to myself and other teachers. His behavior is out of control.</p>

<p>In addition, Jared reads several levels below grade level, and while he is making progress, I doubt he’ll be able to reach grade level this year.His low reading level is hampering his ability to progress in other subjects, such as math and social studies.</p>

<p>In sum, Jared is struggling academically and socially, and would benefit from some interventions. I’m going to recommend he be evaluated for an IEP.</p>

<p>Mrs. Paul</p>
`

function MainScreen() {
  const [loading, setLoading] = useState(false)
  const [match, setMatch] = useState<Match | null>(null)

  const editor = useEditor({
    autofocus: true,
    content: content,
    onUpdate({ editor }) {
      setTimeout(() => setMatch(editor.extensionStorage.languagetool.match))
    },
    onSelectionUpdate({ editor }) {
      setTimeout(() => setMatch(editor.extensionStorage.languagetool.match))
    },
    onTransaction({ transaction: tr }) {
      if (tr.getMeta(LanguageToolHelpingWords.LoadingTransactionName)) setLoading(true)
      else setLoading(false)
    },
    extensions: [
      StarterKit,
      // Highlight,
      LanguageTool.configure({
        automaticMode: true,
      }),
      // Rec.configure({
      //   HTMLAttributes: {
      //     class: 'recommendation',
      //   },
      //   suggestion: reco,
      // }),
      // Revisioned.configure(),
      // Placeholder.configure({
      //   placeholder,
      // }),
    ],
  })

  if (!editor) return null

  const matchMessage = () => match?.message || 'No Message'
  const replacements = () => match?.replacements || []
  const ignoreSuggestion = () => editor.commands.ignoreLanguageToolSuggestion()
  const acceptSuggestion = (replacement: Replacement) => {
    editor.commands.insertContent(replacement.value)
  }

  return (
    <div className="Editor">
      <Popup editor={editor} tippyOptions={{ placement: 'bottom', animation: 'fade' }}>
        <header className="header">
          <button className="action ignore" onClick={ignoreSuggestion}>
            <Close />
            <span>Close</span>
          </button>
        </header>

        <div className="message">{matchMessage()}</div>

        <ul className="suggestions">
          {replacements().map((replacement, index) => {
            return (
              <li key={index} onClick={() => acceptSuggestion(replacement)}>
                {replacement.value}
              </li>
            )
          })}
        </ul>
      </Popup>

      <div className="Editor">
        <EditorContent editor={editor} />
      </div>

      <Revise loading={loading} editor={editor} />
    </div>
  )
}

export default MainScreen
