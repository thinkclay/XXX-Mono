import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'

function BiasHighlight() {
  return (
    <NodeViewWrapper className="bias-highlight" as="span">
      <NodeViewContent className="lt" as="span" />
    </NodeViewWrapper>
  )
}

export default BiasHighlight
