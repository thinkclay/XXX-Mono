/** @format */

import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, passwordReset } from '@common/helpers/firebase'

function Reset() {
  const [email, setEmail] = useState('')
  const [user, loading, error] = useAuthState(auth)

  useEffect(() => {
    if (loading) return
    if (user) console.log('TODO: /login')
  }, [user, loading])

  return (
    <div className="Reset auth centered">
      <div className="Form">
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail Address" />
      </div>
      <div className="ButtonRow">
        <button className="button primary" onClick={() => passwordReset(email)}>
          Reset Password
        </button>
      </div>
      <div className="LinkRow">
        <span>
          Don't have an account? <a href="/register">Register</a>.
        </span>
      </div>
    </div>
  )
}
export default Reset
