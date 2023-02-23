/** @format */

import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, loginClassic, loginGoogle } from '@common/helpers/firebase'
import '@common/assets/styles/auth.css'
import GoogleIcon from './GoogleIcon'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, loading, error] = useAuthState(auth)

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return
    }
    if (user) console.log('TODO: /login')
  }, [user, loading])

  return (
    <div className="Login auth page">
      <div className="Form">
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail Address" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      </div>

      <div className="ButtonRow">
        <button className="button primary" onClick={() => loginClassic(email, password)}>
          Submit
        </button>
        <button className="button icon" onClick={loginGoogle}>
          <GoogleIcon />
          <span>Login</span>
        </button>
      </div>

      <div className="LinkRow">
        <a href="/reset">Forgot Password</a>
        <a href="/register">Register</a>
      </div>
    </div>
  )
}
export default Login
