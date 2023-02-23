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
    <div className="reset">
      <div className="reset__container">
        <input type="text" className="reset__textBox" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail Address" />
        <button className="reset__btn" onClick={() => passwordReset(email)}>
          Send password reset email
        </button>
        <div>
          Don't have an account? <a href="/register">Register</a> now.
        </div>
      </div>
    </div>
  )
}
export default Reset
