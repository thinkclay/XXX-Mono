/** @format */

import { getAnalytics, isSupported } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, User } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

export interface CustomUserModel extends Partial<User> {
  firstName?: string
  lastName?: string
  acceptedTerms?: boolean
  authProvider?: 'local' | 'google'
  spellCheck?:boolean
}

export const firebaseConfig = {
  apiKey: 'AIzaSyCh8dtvuhk2MmiIaYC7oojpc5U70idSaV0',
  authDomain: 'unicorn-revision.firebaseapp.com',
  projectId: 'unicorn-revision',
  storageBucket: 'unicorn-revision.appspot.com',
  messagingSenderId: '901177621766',
  appId: '1:901177621766:web:4d96d6f1232d2b6ea5b287',
  measurementId: 'G-6XBVYZD2YD',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()

isSupported().then(supported => supported && getAnalytics(app))
