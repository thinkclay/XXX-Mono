/** @format */
import { Editor } from '@tiptap/react'

interface Props {
  editor: Editor
}

function Italic({ editor }: Props) {
  const handler = () => {
    editor.chain().focus().toggleBold().run()
  }

  return (
    <button className={editor.isActive('italic') ? 'action active' : 'action'} onClick={handler}>
      <svg viewBox="0 0 100 100">
        <g id="I" transform="translate(35.05, 29)">
          <polygon
            points="0 0 28.8 0 28.8 4.44 16.86 4.44 16.86 37.56 28.8 37.56 28.8 42 0 42 0 37.56 11.88 37.56 11.88 4.44 0 4.44"
            className="path"
          ></polygon>
        </g>
        <path d="M82,18 L82,82 L18,82 L18,18 L82,18 Z M78,22 L22,22 L22,78 L78,78 L78,22 Z" className="path"></path>
      </svg>
    </button>
  )
}

export default Italic
