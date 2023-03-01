/** @format */

import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { DecorationSet } from '@tiptap/pm/view'
import { AsyncQuery } from 'prosemirror-async-query'

import { getDecorations } from './suggestion-decorator'
import { fetchClassifications } from './suggestion-service'
import { BiasFlag, BiasClassResult } from './suggestion-types'

export interface RevisionedOptions {
  issue: (Omit<BiasFlag, 'fix'> & { id: number }) | null
  query: AsyncQuery<string, BiasClassResult[]>
  result?: null | any
  decorations: DecorationSet
}

export const pluginKey = new PluginKey('revisioned')

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
                query: new AsyncQuery<string, BiasClassResult[]>({
                  query: async () => fetchClassifications(parameters),
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
            return pluginKey.getState(state).decorations
          },
          handleClick(view, pos, event) {
            const target = event.target as HTMLSpanElement

            // If the user clicks on a Mark
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
