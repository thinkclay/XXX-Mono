/** @format */

import { useFirestore, useUser } from 'reactfire'

import MainScreen from '@common/views/Screens/MainScreen'
import WelcomeScreen from './WelcomeScreen'
import LoadingScreen from './LoadingScreen'
import AuthScreen from './AuthScreen'
import { PageProps } from '@common/types/UI'
import { MUser, upsertUser } from '@common/models'
import { useUserData } from '../Contexts/FirebaseContext'

function HomeScreen(screen: PageProps) {
  const firestore = useFirestore()
  const { status, data: session } = useUser<MUser>()
  const user = useUserData()

  const _handler = async () => {
    session && upsertUser(firestore, session?.uid, { acceptedTerms: true }, session)
  }

  if (status !== 'success') return <LoadingScreen />
  if (!session || !user) return <AuthScreen {...screen} />
  if (!user.acceptedTerms) return <WelcomeScreen handler={_handler} />

  return <MainScreen {...screen} />
}

export default HomeScreen
