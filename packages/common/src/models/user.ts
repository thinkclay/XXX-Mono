import { User as FBUser } from 'firebase/auth'
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

import { firestore } from '@common/services/firebase'

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

    if (user) {
      await updateDoc(ref, { ...data })
      console.log(`Updated User: ${uid}`, data)
    } else {
      const nextState = { ...userDefault, ...getDoc(ref), ...data }
      await setDoc(ref, nextState)
      console.log(`Upserted User: ${uid}`, nextState)
    }
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
