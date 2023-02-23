/** @format */

import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link } from 'wouter'
import { auth, registerClassic, loginGoogle } from '@common/helpers/firebase'
import GoogleIcon from './GoogleIcon'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [user, loading, error] = useAuthState(auth)

  const register = () => {
    if (!name) alert('Please enter name')
    registerClassic(name, email, password)
  }

  useEffect(() => {
    if (loading) return
    if (user) console.log('TODO: /login')
  }, [user, loading])

  return (
    <div className="Register auth page">
      <div className="Form">
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" />
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail Address" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
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
