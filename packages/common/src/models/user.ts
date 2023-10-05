import { User as FBUser, User, onAuthStateChanged } from 'firebase/auth'
import { Firestore, deleteDoc, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore'

import { auth, firestore } from '@common/services/firebase'

export interface MUser extends FBUser {
  acceptedTerms: boolean
  admin: boolean
  displayName: string | null
  email: string | null
  photoUrl: string | null
  phoneNumber: string | null
}

export const userDefault: Partial<MUser> = {
  uid: '',
  acceptedTerms: false,
  admin: false,
  displayName: null,
  email: null,
  photoUrl: null,
  phoneNumber: null,
  emailVerified: false,
  isAnonymous: false,
  providerData: [],
  refreshToken: '',
  tenantId: null,
  photoURL: null,
  providerId: '',
}

export function getCurrentUser(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, user => {
    if (user) {
      // User is signed in.
      callback(user)
    } else {
      // No user is signed in.
      callback(null)
    }
  })
}

export async function getUser(uid: string): Promise<MUser | null> {
  try {
    const ref = doc(firestore, 'users', uid)
    const result = await getDoc(ref)
    return result.data() as MUser
  } catch (e) {
    console.error(e)
    return null
  }
}

export async function upsertUser(uid: string, data: Partial<MUser>, user?: Partial<MUser>) {
  try {
    const ref = doc(firestore, 'users', uid)
    const nextState = { ...userDefault, ...user, ...getDoc(ref), ...data }
    await setDoc(ref, nextState)
    console.log(`Updated User: ${uid}`, nextState)
  } catch (error) {
    console.error(`Error Updating User: ${uid}`, error)
  }
}

// TODO: deleting users should also delete any collections beloning to the user
// @see https://firebase.google.com/docs/firestore/manage-data/delete-data#node.js_2
export async function deleteUser(uid: string) {
  try {
    const ref = doc(firestore, 'users', uid)
    await deleteDoc(ref)
    console.log(`Deleted User: ${uid}`)
  } catch (error) {
    console.error(`Error Deleting User: ${uid}`, error)
  }
}
