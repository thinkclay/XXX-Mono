/** @format */

import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Node as ProsemirrorNode } from '@tiptap/pm/model'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import { AsyncQuery } from 'prosemirror-async-query'

import { BiasedResult } from '@common/types/Revision'
import { Result as Issue } from './plugins'
import { fetchBias } from '../../helpers/eberhardt'
import BiasDetection from './BiasDetection'

export interface RevisionedOptions {
  issue: (Omit<Issue, 'fix'> & { id: number }) | null
  query: AsyncQuery<string, BiasedResult[]>
  result?: null | any
  decorations: DecorationSet
}

export const pluginKey = new PluginKey('revisioned')

const getDecorations = (doc: ProsemirrorNode, results: BiasedResult[] | undefined): DecorationSet => {
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

export const Revisioned = Extension.create({
  name: 'revisioned',
  addProseMirrorPlugins() {
    return [
      new Plugin<RevisionedOptions>({
        key: pluginKey,
        view(editor) {
          return {
            update: async (editor, prevState) => {
              const query = pluginKey.getState(editor.state)?.query
              query.viewUpdate(editor)
            },
            destroy() {
              const query = pluginKey.getState(editor.state)?.query
              query?.viewDestroy(editor)
            },
          }
        },
        state: {
          init(_, { doc }) {
            return {
              issue: null,
              query: AsyncQuery.empty(),
              result: null,
              decorations: getDecorations(doc, []),
            }
          },
          apply(transaction, prev, oldState, newState) {
            const meta = transaction.getMeta('bias')
            const results = {
              ...prev,
            }

            if (meta !== undefined && meta !== null) {
              results['issue'] = meta
            }

            if (prev.query.statusChanged(transaction, 'success')) {
              return {
                ...results,
                result: prev.query.data,
                decorations: getDecorations(transaction.doc, prev.query.data),
              }
            }

            const parameters = (transaction.doc.textContent || '').trim()
            const changed = parameters && (prev.query.parameters || '').trim() !== parameters

            if (changed) {
              prev.query.cancel()

              const next: RevisionedOptions = {
                ...results,
                query: new AsyncQuery<string, BiasedResult[]>({
                  query: async () => fetchBias(parameters),
                  metaKey: pluginKey,
                  parameters: parameters,
                }),
              }

              return next
            }

            return results
          },
        },
        props: {
          decorations(state) {
            const decorations = pluginKey.getState(state).decorations
            return decorations
          },
          handleClick(view, pos, event) {
            const target = event.target as HTMLSpanElement

            if (/bias/.test(target.className)) {
              // event.stopPropagation()
              const { bias } = target.dataset
              const meta = bias ? JSON.parse(bias) : null

              console.log('meta: ', meta)
              view.dispatch(view.state.tr.setMeta('bias', meta))

              return true
            }
          },
        },
      }),
    ]
  },
})
