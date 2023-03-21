/** @format */
import { Node as PMModel } from 'prosemirror-model'

import { fetchBiases } from './language-service'
import { Match, Replacement } from './language-types'

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
  f: (node: PMModel, offset: number, cur: PMModel | null) => void
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

export function findAndCreateMatch(text: string, body: string, type: string, message: string, replacements: Replacement[]): Match | void {
  if (type === 'None') return

  const m = new RegExp(text, 'gid').exec(body)

  if (!m || !m[0]) return

  const from = m.index

  return {
    message,
    shortMessage: message,
    replacements,
    offset: from,
    length: text.length,
    context: {
      text: text,
      offset: from,
      length: text.length,
    },
    sentence: text,
    type: {
      typeName: type,
    },
    rule: {
      id: 'noid',
      description: 'no description',
      issueType: type,
      category: {
        id: 'noid',
        name: type,
      },
    },
    ignoreForIncompleteSentence: false,
    contextForSureMatch: 0,
  }
}

export async function getBiasMatches(text: string): Promise<Match[]> {
  let matches: Match[] = []
  const biases = await fetchBiases(text)

  biases.results.forEach(bias => {
    const type = bias.biases[0].name

    // Skip if the top match is None for bias
    if (type === 'None') return

    const m = findAndCreateMatch(
      bias.input,
      text,
      type,
      `This phrase may contain ${type.toLocaleLowerCase()} bias. Here are some examples of alternative statements:`,
      bias.replacements.map(r => ({ value: r }))
    )

    if (m) matches.push(m)
  })

  return matches
}
