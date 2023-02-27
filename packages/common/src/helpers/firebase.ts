/**
 * @see https://firebase.google.com/docs/web/setup#available-libraries
 * @format
 */

import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  Auth,
  User,
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

export interface CustomUserModel extends Partial<User> {
  firstName?: string
  lastName?: string
  acceptedTerms?: boolean
  authProvider?: 'local' | 'google'
}

const firebaseConfig = {
  apiKey: 'AIzaSyCh8dtvuhk2MmiIaYC7oojpc5U70idSaV0',
  authDomain: 'unicorn-revision.firebaseapp.com',
  projectId: 'unicorn-revision',
  storageBucket: 'unicorn-revision.appspot.com',
  messagingSenderId: '901177621766',
  appId: '1:901177621766:web:4d96d6f1232d2b6ea5b287',
  measurementId: 'G-6XBVYZD2YD',
}

// Only load Firebases Analytics in the right contexts
isSupported().then(supported => supported && getAnalytics(app))

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()

export async function getUser(user: User): Promise<CustomUserModel> {
  try {
    const _doc = doc(db, 'users', user.uid)
    const _result = await getDoc(_doc)
    return _result.data() as CustomUserModel
  } catch (e) {
    // Hack: if error thrown, it's likely because we don't have a custom user record.
    // So let's create one
    console.error(e)
    return updateUser(user, {})
  }
}

export async function updateUser(user: User, newProps: CustomUserModel): Promise<CustomUserModel> {
  const _nextState = {
    email: user.email,
    emailVerified: user.emailVerified,
    displayName: user.displayName,
    isAnonymous: user.isAnonymous,
    phoneNumber: user.phoneNumber,
    photoUrl: user.photoURL,
    providerData: user.providerData,
    providerId: user.providerId,
    tenantId: user.tenantId,
    uid: user.uid,
    ...newProps,
  }

  const _doc = doc(db, 'users', _nextState.uid)
  await setDoc(_doc, { ...getDoc(_doc), ..._nextState })

  return _nextState
}

export async function loginGoogle() {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    const user = res.user

    updateUser(user, {
      authProvider: 'google',
      displayName: user.displayName,
    })
  } catch (err) {
    console.error(err)
  }
}

export async function loginClassic(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (err) {
    console.error(err)
  }
}

export async function registerClassic(displayName: string, email: string, password: string) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user

    updateUser(user, {
      authProvider: 'local',
      displayName,
    })
  } catch (err) {
    console.error(err)
  }
}

export async function passwordReset(email: string) {
  try {
    await sendPasswordResetEmail(auth, email)
    alert('Password reset link sent!')
  } catch (err) {
    console.error(err)
  }
}

export const logout = () => {
  signOut(auth)
}
