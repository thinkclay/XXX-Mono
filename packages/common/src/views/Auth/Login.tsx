/** @format */

import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useLocation } from 'wouter'

import { auth, loginClassic, loginGoogle } from '@common/helpers/firebase'
import '@common/assets/styles/auth.css'
import GoogleIcon from './GoogleIcon'

function Login() {
  const [_location, _setLocation] = useLocation()
  const [_email, _setEmail] = useState('')
  const [_password, _setPassword] = useState('')
  const [_user, _loading, _error] = useAuthState(auth)

  useEffect(() => {
    if (_loading) return // TODO: implement loading screen
    if (_user) _setLocation('/')
  }, [_user, _loading])

  return (
    <div className="Login auth centered">
      <div className="Form">
        <input type="text" value={_email} onChange={e => _setEmail(e.target.value)} placeholder="E-mail Address" />
        <input type="password" value={_password} onChange={e => _setPassword(e.target.value)} placeholder="Password" />
      </div>

      <div className="ButtonRow">
        <button className="button primary" onClick={() => loginClassic(_email, _password)}>
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
