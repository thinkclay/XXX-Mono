/** @format */

import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { CreateCompletionResponseChoicesInner } from 'openai'
import { Editor } from '@tiptap/react'
import { useLocation } from 'wouter'

import { getRevisedCopy } from '@common/helpers/openai'
import { rootState } from '@common/helpers/root'
import Rewrite from './Rewrite'
import Revision from './Revision'

import '@common/assets/styles/revise.css'
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
