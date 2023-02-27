/** @format */

import { useFirebase } from '@common/services/firebase/hook'
import { PageProps } from '@common/types/UI'
import LoadingScreen from '@common/views/LoadingScreen'
import AccountScreen from './AccountScreen'
import GoogleIcon from './GoogleIcon'

function AuthScreen({ mode }: PageProps) {
  const { authUser, authLoading, googlePopupLogin, googleTokenLogin, logout } = useFirebase()

  if (authLoading) return <LoadingScreen />

  if (authUser) return <AccountScreen mode={mode} />

  return (
    <div className="Login auth centered">
      <div className="copy centered large">
        <h1>Welcome to ReVision</h1>
        <p>Interrupting bias and re-imagining communication.</p>
        <p>Implicit bias is a part of being human. ReVision helps you spot it, fix it, and track your improvement over time.</p>
        Login: {mode}
      </div>

      <div className="ButtonRow centered">
        <button className="button icon" onClick={mode === 'extension' ? googleTokenLogin : googlePopupLogin}>
          <GoogleIcon />
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  )
}

export default AuthScreen
