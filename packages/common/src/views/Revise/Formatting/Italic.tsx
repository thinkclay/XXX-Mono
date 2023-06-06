/** @format */
import { Editor } from '@tiptap/react'

interface Props {
  editor: Editor
}

function Italic({ editor }: Props) {
  const handler = () => {
    editor.chain().focus().toggleItalic().run()
  }

  return (
    <button onClick={handler}>
      <svg width="24" height="24" viewBox="0 0 512 512">
        <path className="FillLayer" d="M16,496H496V16H16ZM48,48H464V464H48Z" />
        <polygon
          className="FillLayer"
          points="200 143.998 244.442 143.998 202.442 367.998 152 367.998 152 399.998 312 399.998 312 367.998 267.558 367.998 309.558 143.998 360 143.998 360 111.998 200 111.998 200 143.998"
        />
      </svg>
    </button>
  )
}
export default Italic
