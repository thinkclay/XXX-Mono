import { DraftDecorator, AtomicBlockUtils, EditorState } from 'draft-js'
import { Strategy, HandlerFunction } from '../types'
import Image from '../views/Image'

export const imageHandler: HandlerFunction = (e, editorState, src: string) => {
  e.preventDefault()

  const contentState = editorState.getCurrentContent()
  const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src })
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
  const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity })

  return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
}

const findImageEntities: Strategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity()

    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'IMAGE'
  }, callback)
}

export const imageDecorator: DraftDecorator = {
  strategy: findImageEntities,
  component: Image,
}
