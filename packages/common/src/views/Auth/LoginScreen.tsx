/** @format */

import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import { useRecoilState } from 'recoil'

import { useFirebase } from '@common/services/firebase/hook'
import { rootState } from '@common/helpers/root'
import GoogleIcon from './GoogleIcon'
import { PageProps } from '@common/types/UI'

import '@common/assets/styles/auth.css'

function Login({ mode }: PageProps) {
  const { authUser, authLoading, googlePopupLogin, googleTokenLogin, loginClassic } = useFirebase()
  const [location, setLocation] = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [root, setRoot] = useRecoilState(rootState)

  useEffect(() => {
    if (authLoading) return
    if (authUser) {
      setLocation('/')
      setRoot({ ...root, route: '/' })
    }
  }, [authUser, authLoading])

  return (
    <div className="Login auth centered">
      <div className="Form">
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail Address" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      </div>

      <div className="ButtonRow">
        <button className="button primary" onClick={() => loginClassic(email, password)}>
          Submit
        </button>
        <button className="button icon" onClick={mode === 'extension' ? googleTokenLogin : googlePopupLogin}>
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
