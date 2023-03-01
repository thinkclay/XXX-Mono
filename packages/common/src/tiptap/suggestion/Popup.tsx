/** @format */

import { NodeViewWrapper, NodeViewWrapperProps } from '@tiptap/react'

export default (props: NodeViewWrapperProps) => {
  const increase = () => {
    props.updateAttributes({
      count: props.node.attrs.count + 1,
    })
  }

  return (
    <NodeViewWrapper className="react-component">
      <div className="content">
        <button onClick={increase}>This button has been clicked {props.node.attrs.count} times.</button>
      </div>
    </NodeViewWrapper>
  )
}
