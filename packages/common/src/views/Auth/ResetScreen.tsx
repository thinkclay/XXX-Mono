/** @format */

import { useEffect, useState } from 'react'

import { useFirebase } from '@common/services/firebase/hook'

function Reset() {
  const { authUser, authLoading, passwordReset } = useFirebase()
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (authLoading) return
    if (authUser) console.log('TODO: /confirmation')
  }, [authUser, authLoading])

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
