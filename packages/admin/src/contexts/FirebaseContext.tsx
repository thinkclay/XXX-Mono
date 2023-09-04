import { ReactNode } from 'react'
import { getFirestore } from 'firebase/firestore'
import { AuthProvider, FirestoreProvider, useFirebaseApp } from 'reactfire'
import { getAuth } from 'firebase/auth'

export default function FirebaseContext({ children }: { children: ReactNode }) {
  const app = useFirebaseApp()
  const firestore = getFirestore(app)
  const auth = getAuth(app)

  // const { status, data: auth } = useInitAuth(async authApp => {
  //   const auth = initializeAuth(authApp, {
  //     persistence: [indexedDBLocalPersistence, browserLocalPersistence],
  //   })
  //   return auth
  // })

  return (
    <FirestoreProvider sdk={firestore}>
      <AuthProvider sdk={auth}>{children}</AuthProvider>
    </FirestoreProvider>
  )
}
