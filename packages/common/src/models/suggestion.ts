import { collection, addDoc } from 'firebase/firestore'

import { auth, firestore } from '@common/services/firebase'
import { IssueType } from '@common/tiptap/bias/bias'

export interface MSuggestion {
  userId?: string
  id?: number
  category: 'language' | 'bias'
  type: IssueType
  date: number
  input: string
  accepted?: boolean
  replacement?: string
}

export async function upsertSuggestion(data: MSuggestion): Promise<void> {
  if (!auth.currentUser?.uid) return

  data.userId = auth.currentUser.uid

  try {
    const ref = collection(firestore, 'suggestions')
    await addDoc(ref, data)
    console.log(`Created Suggestion: ${auth.currentUser.uid}`, data)
  } catch (error) {
    console.error(`Error Creating Suggestion: ${auth.currentUser.uid}`, error)
  }
}
