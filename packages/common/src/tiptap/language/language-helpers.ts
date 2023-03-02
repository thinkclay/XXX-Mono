/** @format */
import { DebouncedFunc } from 'lodash'
import { Node as PMModel } from 'prosemirror-model'

export const selectElementText = (el: EventTarget) => {
  const range = document.createRange()
  range.selectNode(el as HTMLSpanElement)

  const sel = window.getSelection()
  sel?.removeAllRanges()
  sel?.addRange(range)
}

// DebouncedFunc<(node: PMModel, offset: number, cur: Node) => Promise<void>>

export function changedDescendants(
  old: PMModel,
  cur: PMModel,
  offset: number,
  f: (node: PMModel, offset: number, cur: PMModel) => void
): void {
  const oldSize = old.childCount,
    curSize = cur.childCount
  outer: for (let i = 0, j = 0; i < curSize; i++) {
    const child = cur.child(i)

    for (let scan = j, e = Math.min(oldSize, i + 3); scan < e; scan++) {
      if (old.child(scan) === child) {
        j = scan + 1
        offset += child.nodeSize
        continue outer
      }
    }

    f(child, offset, cur)

    if (j < oldSize && old.child(j).sameMarkup(child)) changedDescendants(old.child(j), child, offset + 1, f)
    else child.nodesBetween(0, child.content.size, f, offset + 1)

    offset += child.nodeSize
  }
}
