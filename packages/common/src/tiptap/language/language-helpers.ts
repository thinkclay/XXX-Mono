/** @format */
import { matches } from 'lodash'
import { Node as PMModel } from 'prosemirror-model'

import { getRevision, parseRevision } from '@common/helpers/openai'
import { fetchCompletions, fetchClassifications } from './language-service'
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

export function findAndCreateMatch(text: string, body: string, type: string, message: string, replacements: Replacement[]): Match | void {
  if (type === 'None') return

  const m = new RegExp(text, 'gid').exec(body)

  if (!m || !m[0]) return

  const from = m.index

  console.log('From: ', text, body, from)
  // const completions = await (await fetchCompletions(text)).results

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
  const completions = await fetchCompletions(text)
  const classifications = await fetchClassifications(text)

  console.log('getMatchAndSetDecorations/completions:', completions)
  console.log('getMatchAndSetDecorations/classifications', classifications)

  const recs = await getRevision(text)
    .then(response => Promise.resolve(parseRevision(response)))
    .catch(err => Promise.reject(err))

  if (recs && recs.bias) {
    recs.bias.forEach(rec => {
      const m = findAndCreateMatch(rec.original, text, 'Bias', rec.reason, [{ value: rec.correction }])

      if (m) matches.push(m)
    })
  }

  // console.log('Recs from openai', recs?.bias)

  // classifications.forEach(c =>
  //   findAndCreateMatch(c.input, c.results[0].name, `${c.results[0].name} Bias`, [{ value: 'Recommendation Here' }])
  // )

  return matches
}
