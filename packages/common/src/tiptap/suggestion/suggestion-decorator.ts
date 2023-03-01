/** @format */

import { Node as ProsemirrorNode } from '@tiptap/pm/model'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import BiasDetection from './BiasDetection'
import { BiasClassResult } from './suggestion-types'

export const getDecorations = (doc: ProsemirrorNode, results: BiasClassResult[] | undefined): DecorationSet => {
  if (results === undefined) return DecorationSet.empty

  const decorations: [any?] = []
  new BiasDetection(doc, results)
    .scan()
    .getResults()
    .flat()
    .forEach((issue, i) => {
      const color = issue.color

      decorations.push(
        Decoration.inline(
          issue.from,
          issue.to,
          {
            class: `bias ${issue.type}`,
            'data-bias': JSON.stringify({
              id: i,
              ...issue,
            }),
          },
          {
            inclusiveEnd: true,
          }
        )
      )
    })

  return DecorationSet.create(doc, decorations)
}
