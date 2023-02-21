/** @jsx createElement **/
import { createElement, FC } from 'react'
import { ContentState, ContentBlock } from 'draft-js'

interface Props {
  contentState: ContentState
  block: ContentBlock
  entityKey?: string
}

const Image: FC<Props> = ({ contentState, block, entityKey }) => {
  const _entityKey = entityKey || block.getEntityAt(0)
  const entity = contentState.getEntity(_entityKey)
  const { src } = entity.getData()
  const type = entity.getType()

  return (
    <figure className={type.toLowerCase()}>
      <img src={src} />
    </figure>
  )
}

export default Image
