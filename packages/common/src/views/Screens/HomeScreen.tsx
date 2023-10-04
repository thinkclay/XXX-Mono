/** @format */

import { useEffect, useState } from 'react'
import { useFirestore, useUser } from 'reactfire'

import MainScreen from '@common/views/Screens/MainScreen'
import WelcomeScreen from './WelcomeScreen'
import LoadingScreen from './LoadingScreen'
import AuthScreen from './AuthScreen'
import { PageProps } from '@common/types/UI'
import { MUser, getUser, updateUser } from '@common/models'

function HomeScreen(screen: PageProps) {
  const firestore = useFirestore()
  const { status, data: user } = useUser<MUser>()
  const [_user, _setUser] = useState<MUser>()

  useEffect(() => {
    if (status !== 'success' || !user) return

    const _getUser = async () => {
      _setUser(await getUser(firestore, user))
    }

    _getUser()
  }, [status, user])

  const _handler = async () => {
    user && updateUser(firestore, user?.uid, { acceptedTerms: true }, user)
  }

  return status !== 'success' ? (
    <LoadingScreen />
  ) : _user ? (
    _user.acceptedTerms ? (
      <MainScreen {...screen} />
    ) : (
      <WelcomeScreen handler={_handler} />
    )
  ) : (
    <AuthScreen {...screen} />
  )
}

export default HomeScreen
