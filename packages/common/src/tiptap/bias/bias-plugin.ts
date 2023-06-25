import { Extension } from '@tiptap/core'
import { v4 as uuidv4 } from 'uuid'

import { getBiasMatches } from './bias-helpers'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import { Plugin, PluginKey } from '@tiptap/pm/state'

import { ltTypes } from '../language/language-types'

let decorationSet = DecorationSet.empty

const Bias = Extension.create({
  name: 'bias',

  // The editor is ready.
  onCreate() {},

  // Editor content has changed.
  onUpdate(this) {
    console.log('Bias onUpdate')

    const getMatches = async () => {
      await getBiasMatches(this.editor.getText()).then(matches => {
        const decorations: Decoration[] = []
        matches.forEach(match => {
          // Somehow we get an off-by-one issue here, so correcting
          const from = match.offset + 1
          const to = from + match.length + 1

          decorations.push(
            Decoration.inline(from, to, {
              class: `lt lt-${match.rule.issueType}`,
              nodeName: ltTypes.includes(match.rule.issueType as any) ? 'mark' : 'span',
              match: JSON.stringify(match),
              uuid: uuidv4(),
            })
          )
        })

        decorationSet = DecorationSet.empty
        decorationSet = decorationSet.add(this.editor.state.doc, decorations)
      })
    }

    getMatches()
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('bias'),
        props: {
          decorations(state) {
            return this.getState(state)
          },
        },
        state: {
          init: () => {
            return DecorationSet.empty
          },
          apply: tr => {
            return tr.docChanged ? decorationSet.map(tr.mapping, tr.doc) : decorationSet
          },
        },
      }),
    ]
  },
})

export default Bias
