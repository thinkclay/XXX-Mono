/** @format */

import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, CustomUserModel, getUser, updateUser } from '@common/helpers/firebase'
import Editor from './Editor'
import WelcomeScreen from './Welcome/WelcomeScreen'
import LoadingScreen from './LoadingScreen'

function HomeScreen() {
  const [_authUser, _loading, _error] = useAuthState(auth)
  const [_user, _setUser] = useState<CustomUserModel>()

  const _handler = () => {
    if (_authUser) {
      _setUser({ ..._authUser, acceptedTerms: true })
      updateUser(_authUser, { acceptedTerms: true })
    }
  }

  useEffect(() => {
    ;(async () => {
      if (_authUser) {
        const u = await getUser(_authUser)
        _setUser(u)
      }
    })()
  }, [_authUser])

  return _loading || !_user ? <LoadingScreen /> : _user?.acceptedTerms ? <Editor /> : <WelcomeScreen handler={_handler} />
}

export default HomeScreen
