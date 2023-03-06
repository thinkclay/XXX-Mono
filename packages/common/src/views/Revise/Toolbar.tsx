/** @format */

import { Editor } from '@tiptap/react'

import Rewrite from './Rewrite'
import Copy from './Copy'
import Reload from './Reload'
import Tone from './Tone'

interface Props {
  editor: Editor
  copy: () => void
  reload: () => void
  rewrite: () => void
}

export interface ToolbarActionProps {
  fetching?: boolean
  handler: () => void
}

const Toolbar = ({ copy, reload, rewrite }: Props) => {
  return (
    <aside className="Toolbar">
      <div className="actions">
        <Copy handler={copy} />
        <Reload handler={reload} />
        <Tone />
        <Rewrite handler={rewrite} />
      </div>
    </aside>
  )
}

export default Toolbar
