/** @format */

import Toggle from './Toggle'
import '@common/assets/styles/navigation.css'
import NavLink from './NavLink'

interface PrimaryNavProps {
  open: boolean
}

function PrimaryNav({ open }: PrimaryNavProps) {
  return (
    <nav className={`PrimaryNav ${open ? 'open' : 'closed'}`}>
      <Toggle />
      <NavLink href="/">Home</NavLink>
      <NavLink href="/login">Login</NavLink>
      <NavLink href="/register">Register</NavLink>
      <NavLink href="/reset">Reset Password</NavLink>
      <NavLink href="/account">Account</NavLink>
    </nav>
  )
}

export default PrimaryNav
