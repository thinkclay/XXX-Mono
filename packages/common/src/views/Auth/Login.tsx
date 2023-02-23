/** @format */

import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth, loginClassic, loginGoogle } from '@common/helpers/firebase'

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
    <div className="login">
      <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail Address" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={() => loginClassic(email, password)}>Login</button>
      <button onClick={loginGoogle}>Login with Google</button>
      <div>
        <a href="/reset">Forgot Password</a>
      </div>
      <div>
        Don't have an account? <a href="/register">Register</a> now.
      </div>
    </div>
  )
}
export default Login
