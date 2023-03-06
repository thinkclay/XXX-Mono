/** @format */

import { useFirebase, useFirestoreDoc } from '@common/services/firebase/hook'

export default function IndexNewtab() {
  const { authUser, authLoading, onLogin, onLogout } = useFirebase()

  // Create a test collection, with a hello document:
  const { data: enterpriseData, setData } = useFirestoreDoc<{
    serial: string
  }>('starships/enterprise')

  const { data: crewData, setData: setCrewData } = useFirestoreDoc<{
    name: string
  }>(authUser?.uid && `crews/${authUser.uid}`)

  return (
    <div>
      <h1>
        Welcome to your <a href="https://www.plasmo.com">Plasmo</a> Extension!
      </h1>
      {!authUser ? <button onClick={() => onLogin()}>Log in</button> : <button onClick={() => onLogout()}>Log out</button>}
      <div>
        {authLoading ? 'Loading...' : ''}
        {!!authUser ? (
          <div>
            Welcome to Plasmo, {authUser.displayName} your email address is {authUser.email}
          </div>
        ) : (
          ''
        )}
      </div>
      <h2>Ship serial number:</h2>
      <input
        value={enterpriseData?.serial || ''}
        onChange={e =>
          setData({
            serial: e.target.value,
          })
        }
      />

      <br />
      <h3>Crew name:</h3>
      <input
        value={crewData?.name || ''}
        onChange={e =>
          setCrewData({
            name: e.target.value,
          })
        }
      />
    </div>
  )
}
