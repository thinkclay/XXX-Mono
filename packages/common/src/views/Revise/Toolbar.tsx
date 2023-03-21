/** @format */

import { RenderMode } from '@common/types/UI'
import Rewrite from './Rewrite'
import Reload from './Reload'
import Tone from './Tone'
import meta from '@common/meta.json'

interface Props {
  mode: RenderMode
  copy: () => void
  reload: () => void
  rewrite: () => void
}

export interface ToolbarActionProps {
  fetching?: boolean
  handler: () => void
}

const Toolbar = ({ mode, copy, reload, rewrite }: Props) => {
  return (
    <aside className={`Toolbar ${mode}`}>
      <div className="actions">
        {/* <Copy handler={copy} /> */}
        <Reload handler={reload} />
        <Tone />
        <Rewrite handler={rewrite} />
      </div>

      <span className="version">{meta.version}</span>
    </aside>
  )
}

export default Toolbar
