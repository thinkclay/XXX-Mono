/** @format */

import { useEffect, useState } from 'react'

import { CustomUserModel } from '@common/services/firebase'
import { useFirebase } from '@common/services/firebase/hook'
import MainScreen from './MainScreen'
import WelcomeScreen from './WelcomeScreen'
import LoadingScreen from './LoadingScreen'
import AuthScreen from './AuthScreen'
import { PageProps } from '@common/types/UI'

function HomeScreen(screen: PageProps) {
  const { authUser, authLoading, updateUser, getUser } = useFirebase()
  const [user, setUser] = useState<CustomUserModel>()
  const [loading, setLoading] = useState(true)

  const _loading = () => authLoading || loading

  const _handler = async () => {
    if (authUser) {
      const u = await getUser(authUser)
      setUser({ ...authUser, acceptedTerms: true, spellCheck: u.spellCheck })
      updateUser(authUser, { acceptedTerms: true, spellCheck: u.spellCheck })
    }
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 500)
    ;(async () => {
      if (authUser) {
        const u = await getUser(authUser)
        setUser(u)
        if (u.spellCheck !== undefined) {
          localStorage.setItem('spellCheck', u.spellCheck.toString())
        } else {
          localStorage.setItem('spellCheck', 'true')
        }
      }
    })()
  }, [authUser])

  return _loading() ? (
    <LoadingScreen />
  ) : user ? (
    user?.acceptedTerms ? (
      <MainScreen {...screen} />
    ) : (
      <WelcomeScreen handler={_handler} />
    )
  ) : (
    <AuthScreen {...screen} />
  )
}

export default HomeScreen
