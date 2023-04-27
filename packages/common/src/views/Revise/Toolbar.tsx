/** @format */

import { RenderMode } from '@common/types/UI'
import Rewrite from './Rewrite'
import Reload from './Reload'
import Tone from './Tone'
import meta from '@common/meta.json'
import { Editor } from '@tiptap/react'
import Link from './Link'
import AddImage from './AddImage'
import EditorWithFontFamily from './FontFamily'
import EditorWithHeading from './Heading'
import Bold from './Bold'
import Italic from './Italic'
import Underline from './Underline'
interface Props {
  mode: RenderMode
  copy: () => void
  reload: () => void
  rewrite: () => void
  setLink: () => void
  addImage: () => void
  editor: Editor
}

export interface ToolbarActionProps {
  fetching?: boolean
  handler: () => void
}

const Toolbar = ({ mode, copy, reload, rewrite, editor, setLink, addImage }: Props) => {
  return (
    <aside className={`Toolbar ${mode}`}>
      <div className="actions">
        {/* <Copy handler={copy} /> */}
        <Reload handler={reload} />
        <Tone editor={editor} />
        {/* <Rewrite handler={rewrite} /> */}
        <Link handler={setLink} />
        <AddImage handler={addImage} />
        <Bold editor={editor} />
        <Italic editor={editor} />
        <Underline editor={editor} />
        <EditorWithFontFamily editor={editor} />
        <EditorWithHeading editor={editor} />
      </div>

      <span className="version">{meta.version}</span>
    </aside>
  )
}

export default Toolbar
