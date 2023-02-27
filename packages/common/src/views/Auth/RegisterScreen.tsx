/** @format */

import { useEffect, useState } from 'react'
import { Link, useLocation } from 'wouter'
import { useRecoilState } from 'recoil'

import { useFirebase } from '@common/services/firebase/hook'
import GoogleIcon from './GoogleIcon'
import { rootState } from '@common/helpers/root'
import { PageProps } from '@common/types/UI'

function Register({ mode }: PageProps) {
  const { authUser, authLoading, googlePopupLogin, googleTokenLogin, registerClassic } = useFirebase()
  const [location, setLocation] = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [root, setRoot] = useRecoilState(rootState)

  const register = () => {
    if (!displayName) alert('Please enter your first name')
    registerClassic(displayName, email, password)
  }

  useEffect(() => {
    if (authLoading) return
    if (authUser) {
      setLocation('/')
      setRoot({ ...root, route: '/' })
    }
  }, [authUser, authLoading])

  return (
    <div className="Register auth centered">
      <div className="Form">
        <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Display Name" />
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail Address" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      </div>
      <div className="ButtonRow">
        <button className="button primary" onClick={register}>
          Register
        </button>
        <button className="button icon" onClick={mode === 'extension' ? googleTokenLogin : googlePopupLogin}>
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
