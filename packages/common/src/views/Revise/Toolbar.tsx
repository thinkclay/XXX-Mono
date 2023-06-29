/** @format */

import { RenderMode } from '@common/types/UI'
import Rewrite from './Rewrite'
import Reload from './Reload'
import Tone from './Tone'
import meta from '@common/meta.json'
import { Editor } from '@tiptap/react'

interface Props {
  mode: RenderMode
  reload: () => void
  rewrite: () => void
  editor: Editor
}

export interface ToolbarActionProps {
  fetching?: boolean
  handler: () => void
}

const Toolbar = ({ mode, reload, rewrite, editor }: Props) => {
  const copy = () => navigator.clipboard.writeText(editor.getHTML())

  return (
    <>
      <aside className={`Toolbar ${mode}`}>
        <div className="actions">
          {/* <Copy handler={copy} /> */}
          <Rewrite handler={rewrite} />
          <Reload handler={reload} />
          <Tone />
        </div>

        <span className="version">{meta.version}</span>
      </aside>
    </>
  )
}

export default Toolbar
