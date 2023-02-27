/** @format */

import { useAuthState } from 'react-firebase-hooks/auth'
import '@common/assets/styles/navigation.css'
import { auth } from '@common/helpers/firebase'
import Toggle from './Toggle'
import NavLink from './NavLink'

interface PrimaryNavProps {
  open: boolean
}

function PrimaryNav({ open }: PrimaryNavProps) {
  const [user, loading, error] = useAuthState(auth)

  const _renderAuthLinks = () => {
    return user ? (
      <NavLink href="/account">Account</NavLink>
    ) : (
      <>
        <NavLink href="/login">Login</NavLink>
        <NavLink href="/register">Register</NavLink>
        <NavLink href="/reset">Reset Password</NavLink>
      </>
    )
  }

  return (
    <nav className={`PrimaryNav ${open ? 'open' : 'closed'}`}>
      <Toggle />
      <NavLink href="/">Home</NavLink>

      {_renderAuthLinks()}
    </nav>
  )
}

export default PrimaryNav
