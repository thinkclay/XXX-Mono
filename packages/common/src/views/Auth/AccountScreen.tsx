/** @format */

import { useFirebase } from '@common/services/firebase/hook'
import { PageProps } from '@common/types/UI'
import LoadingScreen from '../Screens/LoadingScreen'
import AuthScreen from '../Screens/AuthScreen'

function AccountScreen({ mode }: PageProps) {
  const { authUser, authLoading, logout } = useFirebase()

  if (authLoading) return <LoadingScreen />

  if (!authUser) return <AuthScreen mode={mode} />

  return (
    <div className="Account auth centered copy">
      <h1 className='Account-text'>Account</h1>
      <p>Logged in as: {authUser?.email}</p>
      <div className="ButtonRow centered shrink">
        <button className="button primary" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  )
}
export default AccountScreen
