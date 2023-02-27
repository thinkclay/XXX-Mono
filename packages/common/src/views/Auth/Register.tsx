/** @format */

import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useLocation } from 'wouter'

import { auth, registerClassic, loginGoogle } from '@common/helpers/firebase'
import GoogleIcon from './GoogleIcon'

function Register() {
  const [_location, _setLocation] = useLocation()
  const [_email, _setEmail] = useState('')
  const [_password, _setPassword] = useState('')
  const [_displayName, _setDisplayName] = useState('')
  const [_user, _loading, _error] = useAuthState(auth)

  const register = () => {
    if (!_displayName) alert('Please enter your first name')
    registerClassic(_displayName, _email, _password)
  }

  useEffect(() => {
    if (_loading) return
    if (_user) _setLocation('/')
  }, [_user, _loading])

  return (
    <div className="Register auth centered">
      <div className="Form">
        <input type="text" value={_displayName} onChange={e => _setDisplayName(e.target.value)} placeholder="Display Name" />
        <input type="text" value={_email} onChange={e => _setEmail(e.target.value)} placeholder="E-mail Address" />
        <input type="password" value={_password} onChange={e => _setPassword(e.target.value)} placeholder="Password" />
      </div>
      <div className="ButtonRow">
        <button className="button primary" onClick={register}>
          Register
        </button>
        <button className="button icon" onClick={loginGoogle}>
          <GoogleIcon />
          <span>Login</span>
        </button>
      </div>
      <div className="LinkRow">
        <Link href="/login">Login Instead</Link>
      </div>
    </div>
  )
}
export default Register
