/**
 * @see https://firebase.google.com/docs/web/setup#available-libraries
 * @format
 */

import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth'
import { getFirestore, query, getDocs, collection, where, addDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCh8dtvuhk2MmiIaYC7oojpc5U70idSaV0',
  authDomain: 'unicorn-revision.firebaseapp.com',
  projectId: 'unicorn-revision',
  storageBucket: 'unicorn-revision.appspot.com',
  messagingSenderId: '901177621766',
  appId: '1:901177621766:web:4d96d6f1232d2b6ea5b287',
  measurementId: 'G-6XBVYZD2YD',
}

export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()

export function useAuthStatus() {}

export async function loginGoogle() {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    const user = res.user
    const q = query(collection(db, 'users'), where('uid', '==', user.uid))
    const docs = await getDocs(q)
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      })
    }
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

export async function registerClassic(name: string, email: string, password: string) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
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
