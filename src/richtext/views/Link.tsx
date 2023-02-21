/** @jsx createElement **/
import { createElement, FC, ReactNode } from 'react'
import { ContentState } from 'draft-js'

interface Props {
  children: ReactNode
  contentState: ContentState
  entityKey: string
}

const Link: FC<Props> = ({ children, contentState, entityKey }) => {
  const { url } = contentState.getEntity(entityKey).getData()

  return (
    <a className="link" href={url} rel="noopener noreferrer" target="_blank" aria-label={url}>
      {children}
    </a>
  )
}

export default Link
