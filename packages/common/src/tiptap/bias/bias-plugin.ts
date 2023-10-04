import { AnyExtension, Extension, escapeForRegEx } from '@tiptap/core'
import { Plugin, PluginKey, TextSelection, Transaction } from '@tiptap/pm/state'
import { EditorView } from '@tiptap/pm/view'
import { Editor } from '@tiptap/react'

import { fetchBiases } from './bias-service'
import { DB, Suggestion } from '@common/helpers/db'
import { onAuthStateChanged } from 'firebase/auth'
import { addDoc, collection, doc, getDocs, query, updateDoc } from 'firebase/firestore'
import { auth, db } from '@common/services/firebase'
import { FIREBASE, TIPTAP, logger } from '@common/helpers/logger'
import { BiasStorage } from './bias'

const handleStoreData = (suggestions: Suggestion[]) => {
  console.log('handleStoreData in bias plugin', suggestions)

  onAuthStateChanged(auth, async user => {
    if (!user) return

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

                suggestions.forEach(s => {
                  DB.suggestion.add(s)
                  newData.push(s)
                })

                updateDoc(newDocRef, { bias: newData })
                  .then(d => logger(FIREBASE.ANALYTICS.BIAS.UPDATED, d))
                  .catch(e => logger(FIREBASE.ANALYTICS.BIAS.ERROR, e))
              })
            })
            .catch(e => logger(FIREBASE.ANALYTICS.BIAS.ERROR, e))
        } else {
          addDoc(biasCollection, { bias: suggestions })
            .then(d => logger(FIREBASE.ANALYTICS.BIAS.CREATED, d))
            .catch(e => logger(FIREBASE.ANALYTICS.BIAS.ERROR, e))
        }
      })
      .catch(e => logger(FIREBASE.ANALYTICS.BIAS.ERROR, e))
  })
}

async function checkBias(editor: Editor, storage: BiasStorage) {
  //   editor.chain().focus().clearNodes().unsetAllMarks().run()

  const originalText = editor.getText()

  // Sensible checks so we're not querying too much
  if (originalText.length < 150 || Date.now() - storage.lastCheckedAt < 10000 || storage.fetching) return

  logger(TIPTAP.BIAS.FETCHING, true)
  storage.fetching = true

  const response = await fetchBiases(originalText)

  if (!response || !response.results) return

  const data = response.results.map(({ input, biases, replacements }) => {
    const type = biases[0].name
    const m = new RegExp(escapeForRegEx(input), 'gid').exec(originalText)

    if (type === 'none' || !m || !m[0]) return

    const from = m.index + 1
    const to = m.index + input.length + 1
    const message = `This phrase may contain ${type.replace('potential ', '')} bias. Here are some examples of alternative statements:`

    logger(TIPTAP.BIAS.RESULT, { from, to, message })

    editor.view.dispatch(
      editor.state.tr.addMark(
        from,
        to,
        editor.state.schema.marks.biasMark.create({
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

    return {
      category: 'bias',
      type,
      input: input,
      date: Date.now(),
    }
  })

  logger(TIPTAP.BIAS.FETCHING, false)

  handleStoreData(data as Suggestion[])
  storage.fetching = false
}

export const Bias: AnyExtension = Extension.create<BiasStorage>({
  name: 'bias',

  addStorage(): BiasStorage {
    return {
      fetching: false,
      match: null,
      lastCheckedAt: Date.now(),
    }
  },

  onUpdate(this) {
    checkBias(this.editor as Editor, this.storage)
  },

  addCommands() {
    return {
      proofread: () => () => {
        checkBias(this.editor as Editor, this.storage)

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

            view.dispatch(view.state.tr.setMeta(TIPTAP.BIAS.MATCH, { message, replacements, from, to }))
            view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, from, to)))
          },
        },
      }),
    ]
  },
})
