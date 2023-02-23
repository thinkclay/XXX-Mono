/** @format */

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCh8dtvuhk2MmiIaYC7oojpc5U70idSaV0',
  authDomain: 'unicorn-revision.firebaseapp.com',
  projectId: 'unicorn-revision',
  storageBucket: 'unicorn-revision.appspot.com',
  messagingSenderId: '901177621766',
  appId: '1:901177621766:web:4d96d6f1232d2b6ea5b287',
  measurementId: 'G-6XBVYZD2YD',
}

export function initFirebase() {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const analytics = getAnalytics(app)

  return { app, analytics }
}
