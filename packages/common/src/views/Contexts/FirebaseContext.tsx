import { ReactNode, useEffect, useState, createContext, useContext } from 'react'
import { FirebaseAppProvider, AuthProvider, FirestoreProvider, useFirebaseApp, useUser, useFirestore } from 'reactfire'

import { firebaseConfig } from '@common/services/firebase'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { MUser, getUser } from '@common/models'

interface Props {
  children: ReactNode
}

export function FirebaseApp({ children }: Props) {
  return <FirebaseAppProvider firebaseConfig={firebaseConfig}>{children}</FirebaseAppProvider>
}

export function FirebaseAddons({ children }: Props) {
  const app = useFirebaseApp()
  const firestore = getFirestore(app)
  const auth = getAuth(app)

  return (
    <FirestoreProvider sdk={firestore}>
      <AuthProvider sdk={auth}>{children}</AuthProvider>
    </FirestoreProvider>
  )
}

const UserContext = createContext<MUser | null>(null)

// Custom hook to access the user data and additional metadata
export function useUserData() {
  return useContext(UserContext)
}

export function FirebaseUserContext({ children }: Props) {
  const firestore = useFirestore()
  const { status, data: user } = useUser<MUser>()
  const [_user, _setUser] = useState<MUser | null>(null)

  useEffect(() => {
    if (status === 'success' && user) getUser(firestore, user).then(_setUser)
  }, [status, user])

  return <UserContext.Provider value={_user}>{children}</UserContext.Provider>
}
