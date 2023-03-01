/** @format */

import { Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Placeholder from '@tiptap/extension-placeholder'

import Revise from '@common/views/Revise/Revise'
import { Revisioned } from '@common/tiptap/suggestion/suggestion-extension'
import { Rec } from '@common/tiptap/suggestion/Rec'
import reco from '@common/tiptap/suggestion/reco'
import { LanguageTool, LanguageToolHelpingWords, Popup, PopupPlugin } from '@common/tiptap/language'
import { useEffect, useState } from 'react'
import { Match, Replacement } from '@common/tiptap/language/language-types'
import Close from './Revise/Close'

const content = `
  <h1>Welcome to the Editor</h1><p>The LanguageTool Editor is built by writers for writers. This text serves as an introduction including some example errors.</p><p>Really good spelling and grammar make you writing more credible and set you up for succes in a time where written communication gets more and more important. LanguageTool finds many more mistakes then other writing tools and is available for more than 20+ languages.</p><p>We provide you with a state of the art grammar and spell checker and ensure correct punctuation and typography. However LanguageTool goes far beyond that: It enriches your writing experience with style and tone suggestions that take your writing to the next level.</p><h2>The Basics</h2><p>Regular spelling mistakes are underlind in red. You can ether click directly on the word you want to correct or hit the corresponding card on the right hand side to get even more information regarding the error.</p><p>Texts you write in the editor will be stored for you. You can quick switch between texts by using the overview on the left-hand side. Some texts are not meant to be stored forever. By default texts will disappear from your text list after two weeks to keep your overview clutter-free and tidy. All your texts are still available and can recovered from the settings page. If you want to keep your texts from disappearing, just mark them as permanent.</p><h2>Picky Mode</h2><p>Every now and then, a text has to be flawless and respect strict rules and conventions that are a bit over-the-top for every day conversations. In those cases, you have the "Picky Mode" at your disposal. By toggling the switch next to the glasses-icon, you will get more advanced suggestions to perfect your writing.</p><h2>Distraction-free Writing</h2><p>In the top-right corner, you'll find options to toggle the side bars. By blending out all noise, you can focus on your writing until you’re ready to look into further suggestions.</p><h2>Synonyms, Grammatical Gender, Pronunciation</h2><p>Double clicking on any word will provide you with more context or alternative words to make your texts sound more diverse. In languages where it's relevant, you'll also be shown the correct article and the grammatical gender for every noun. Also there is the option to make your browser read out loud any word if you are unsure about it’s pronunciation (only available in Google Chrome).</p><p>Thanks a lot for using the Editor - we hope to help you be a better writer!</p><p><em>The LanguageTool Team</em></p>
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
        apiUrl: 'http://localhost:8081/v2/check',
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

      <EditorContent editor={editor} className="Editor" />
      <Revise loading={loading} editor={editor} />
    </div>
  )
}

export default MainScreen
