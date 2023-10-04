import { User as FBUser } from 'firebase/auth'
import { Firestore, deleteDoc, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore'

export interface MUser extends FBUser {
  uid: string
  acceptedTerms: boolean
  admin: boolean
  displayName: string | null
  email: string | null
  photoUrl: string | null
  phoneNumber: string | null
}

export async function getUser(firestore: Firestore, user: MUser | FBUser): Promise<MUser | undefined> {
  try {
    const ref = doc(firestore, 'users', user.uid)
    const result = await getDoc(ref)
    return result.data() as MUser
  } catch (e) {
    console.error(e)
  }
}

export async function createUser(firestore: Firestore, uid: string, data: Partial<MUser>) {
  try {
    const ref = doc(firestore, 'users', uid)
    const nextState = { ...getDoc(ref), ...data }
    await updateDoc(ref, nextState)
    console.log(`Updated User: ${uid}`, nextState)
  } catch (error) {
    console.error(`Error Updating User: ${uid}`, error)
  }
}

export async function updateUser(firestore: Firestore, uid: string, data: Partial<MUser>, user?: Partial<MUser>) {
  try {
    const ref = doc(firestore, 'users', uid)
    let nextState = {}

    if (user) {
      nextState = {
        uid: user.uid,
        acceptedTerms: user.acceptedTerms || false,
        admin: user.admin || false,
        displayName: user.displayName || null,
        email: user.email || null,
        emailVerified: user.emailVerified || false,
        isAnonymous: user.isAnonymous || null,
        photoUrl: user.photoUrl || null,
        phoneNumber: user.phoneNumber || null,
        providerData: user.providerData || null,
        providerId: user.providerId || null,
        tenantId: user.tenantId || null,
      }
    }

    nextState = { ...nextState, ...getDoc(ref), ...data }

    await setDoc(ref, nextState)
    console.log(`Updated User: ${uid}`, nextState)
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
