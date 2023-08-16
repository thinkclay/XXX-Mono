import { AnyExtension, Extension, Command, getMarkRange } from '@tiptap/core'
import { debounce } from 'lodash'
import { Plugin, PluginKey, TextSelection, Transaction } from '@tiptap/pm/state'
import { DecorationSet, EditorView } from '@tiptap/pm/view'
import { Editor } from '@tiptap/react'

import { fetchBiases } from './bias-service'
import { Match } from '@common/tiptap/language/language-types'
import { DB } from '@common/helpers/db'
import { onAuthStateChanged } from 'firebase/auth'
import { addDoc, collection, doc, getDocs, query, updateDoc } from 'firebase/firestore'
import { auth, db } from '@common/services/firebase'

interface BiasStorage {
  updating: boolean
  match?: Match
}

const handleStoreData = (newSubmisionData: Array<any>) => {
  onAuthStateChanged(auth, async user => {
    if (user) {
      const userCollection = collection(db, 'users')
      const userDocRef = doc(userCollection, user.uid)
      const biasCollection = collection(userDocRef, 'bias')
      const queryDocs = query(biasCollection)
      getDocs(queryDocs)
        .then(checkQuery => {
          if (checkQuery.size > 0) {
            getDocs(biasCollection)
              .then(querySnapshot => {
                querySnapshot.forEach((data: any) => {
                  const biasListCollection = collection(db, 'users', user.uid, 'bias')
                  const newDocRef = doc(biasListCollection, data.id)
                  const newData = data.data().bias
                  newSubmisionData.forEach((data) => {
                    newData.push(data)
                  })
                  updateDoc(newDocRef, { bias: newData })
                    .then(data => console.log('UPDATED Firebase', data))
                    .catch(e => console.log('Error', e))
                })
              })
              .catch(error => {
                console.error('Error getting documents: ', error)
              })
            console.log('Im calling if')
          } else {
            console.log('new', newSubmisionData)
            addDoc(biasCollection, { bias: newSubmisionData })
              .then(data => console.log('NEW_ADDED Firebase', data))
              .catch(e => console.log('Error', e))
          }
        })
        .catch(error => {
          console.error('Error getting biasCollection:', error)
        })
    }
  })
}

function checkBias(editor: Editor, storage: BiasStorage) {
  console.log('bias/checkBias/updating?:', storage.updating)

  if (storage.updating) {
    console.log('bias/checkBias/clearing')
    // editor.chain().focus().clearNodes().unsetAllMarks().run()
    return
  }

  console.log('bias/checkBias/running')

  const { state, view } = editor
  const { tr, schema } = state
  const transactions: Transaction[] = []
  const originalText = editor.getText()

  const getMatches = debounce(async () => {
    storage.updating = true
    tr.setMeta('BIAS_FETCHING', true)

    await fetchBiases(originalText).then(bias => {
      if (bias.results.length > 0) {
        const submitData = bias.results.map(d => {
          const type = d.biases[0].name
          return {
            category: 'bias',
            type,
            input: d.input,
            date: Date.now(),
          }
        })
        handleStoreData(submitData)
      }
      bias.results.forEach(({ input, biases, replacements }) => {
        const type = biases[0].name

        if (type === 'none') return

        const m = new RegExp(input, 'gid').exec(originalText)

        if (!m || !m[0]) return

        const from = m.index + 1
        const to = m.index + input.length + 1
        const message = `This phrase may contain ${type.replace('potential ', '')} bias. Here are some examples of alternative statements:`

        DB.suggestion.add({
          category: 'bias',
          type,
          input,
          date: Date.now(),
        })

        transactions.push(
          tr.addMark(
            from,
            to,
            schema.marks.biasMark.create({
              from,
              to,
              message,
              replacements: replacements.map(value => ({ value })),
            })
          )
        )

        // const nodeType = state.schema.nodes.biasNode
        // const content = nodeType.create({ type: 'bias-node' }, state.schema.text(r.input))
        // transactions.push(tr.replaceWith(from, to, content))
      })
    })

    transactions.forEach(tr => {
      tr.setMeta('biasMarkUpdate', { storage })
      view.dispatch(tr)
    })
  }, 500)

  getMatches()

  storage.updating = false
  tr.setMeta('BIAS_FETCHING', false)
}

const debouncedCheckBias = debounce(checkBias)

export const Bias: AnyExtension = Extension.create<BiasStorage>({
  name: 'bias',

  addStorage(): BiasStorage {
    return {
      updating: false,
    }
  },

  onUpdate(this) {
    debouncedCheckBias(this.editor as Editor, this.storage)
  },

  addCommands() {
    return {
      proofread: () => () => {
        debouncedCheckBias(this.editor as Editor, this.storage)

        return true
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('bias'),
        props: {
          handleClick(view: EditorView, pos: number, _event: MouseEvent) {
            const mark = view.state.doc.nodeAt(pos)?.marks.find(mark => mark.type.name === 'biasMark')

            if (!mark) return

            const message = mark.attrs?.message
            const replacements = mark.attrs?.replacements || []
            const from = mark.attrs?.from || -1
            const to = mark.attrs?.to || -1

            view.dispatch(view.state.tr.setMeta('SUGGESTION', { message, replacements, from, to }))
            view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, from, to)))
          },
        },
      }),
    ]
  },
})
