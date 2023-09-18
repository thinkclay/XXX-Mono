import { Firestore, deleteDoc, doc, updateDoc } from 'firebase/firestore'

export interface User {
  uid: string
  acceptedTerms?: boolean
  admin?: boolean
  displayName?: string
  email?: string
  emailVerified?: boolean
  photoUrl?: string
}

export async function updateUser(firestore: Firestore, uid: string, data: Partial<User>) {
  try {
    const ref = doc(firestore, 'users', uid)
    await updateDoc(ref, data)
    console.log(`Updated User: ${uid}`, data)
  } catch (error) {
    console.error(`Error Updating User: ${uid}`, error)
  }
}

// TODO: deleting users should also delete any collections beloning to the user
// @see https://firebase.google.com/docs/firestore/manage-data/delete-data#node.js_2
export async function deleteUser(firestore: Firestore, uid: string) {
  try {
    const ref = doc(firestore, 'users', uid)
    await deleteDoc(ref)
    console.log(`Deleted User: ${uid}`)
  } catch (error) {
    console.error(`Error Deleting User: ${uid}`, error)
  }
}
