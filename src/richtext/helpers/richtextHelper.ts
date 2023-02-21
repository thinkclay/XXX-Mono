import { EditorState, RawDraftContentState, convertFromRaw, ContentBlock } from 'draft-js'
import { decorators } from '../config'
import Image from '../views/Image'
import { ReactNode } from 'react'

export const initState = (content?: RawDraftContentState): EditorState => {
  return content ? EditorState.createWithContent(convertFromRaw(content), decorators) : EditorState.createEmpty(decorators)
}

interface BlockRenderer {
  component: ReactNode
  editable: boolean
}

export const blockRenderer = (contentBlock: ContentBlock): null | BlockRenderer => {
  const type = contentBlock.getType()

  switch (type) {
    case 'atomic':
      return {
        component: Image,
        editable: false,
      }
  }

  return null
}
