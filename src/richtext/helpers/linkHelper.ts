import { DraftDecorator, EditorState, RichUtils } from 'draft-js'
import { Strategy, HandlerFunction } from '../types'
import Link from '../views/Link'

/**
  @description Gets current selection and custom data payload (url) to create an anchor. Renders with custom Link component
**/
export const linkHandler: HandlerFunction = (e, editorState, url: string) => {
  e.preventDefault()

  const contentState = editorState.getCurrentContent()
  const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url })
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
  const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity })
  return RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey)
}

const findLinkEntities: Strategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity()
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK'
  }, callback)
}

export const linkDecorator: DraftDecorator = {
  strategy: findLinkEntities,
  component: Link,
}
