import { ReactNode } from 'react'
import { getFirestore } from 'firebase/firestore'
import { AuthProvider, FirestoreProvider, useFirebaseApp } from 'reactfire'
import { getAuth } from 'firebase/auth'

interface Props {
  children: ReactNode
}

export default function FirebaseContext({ children }: Props) {
  const app = useFirebaseApp()
  const firestore = getFirestore(app)
  const auth = getAuth(app)

  return (
    <FirestoreProvider sdk={firestore}>
      <AuthProvider sdk={auth}>{children}</AuthProvider>
    </FirestoreProvider>
  )
}
