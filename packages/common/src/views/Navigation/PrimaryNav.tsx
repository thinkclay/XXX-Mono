/** @format */

import { useFirebase } from '@common/services/firebase/hook'
import Toggle from './Toggle'
import NavLink from './NavLink'

import '@common/assets/styles/navigation.css'

interface PrimaryNavProps {
  open: boolean
}

function PrimaryNav({ open }: PrimaryNavProps) {
  const { authUser } = useFirebase()

  const _renderAuthLinks = () => {
    return authUser ? (
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

      <div className="links">
        <NavLink href="/">Home</NavLink>
        {_renderAuthLinks()}
      </div>
    </nav>
  )
}

export default PrimaryNav
