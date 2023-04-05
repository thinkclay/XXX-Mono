/** @format */

import { RenderMode } from '@common/types/UI'
import Rewrite from './Rewrite'
import Reload from './Reload'
import Tone from './Tone'
import meta from '@common/meta.json'
import { Editor } from '@tiptap/react'
interface Props {
  mode: RenderMode
  copy: () => void
  reload: () => void
  rewrite: () => void
  editor: Editor
}

export interface ToolbarActionProps {
  fetching?: boolean
  handler: () => void
}

const Toolbar = ({ mode, copy, reload, rewrite ,editor}: Props) => {
  return (
    <aside className={`Toolbar ${mode}`}>
      <div className="actions">
        {/* <Copy handler={copy} /> */}
        <Reload handler={reload} />
        <Tone editor={editor}/>
        <Rewrite handler={rewrite} />
      </div>

      <span className="version">{meta.version}</span>
    </aside>
  )
}

export default Toolbar
