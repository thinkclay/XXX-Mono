/** @format */

import { SyntheticEvent } from 'react'
import { useRecoilState } from 'recoil'
import { routes } from '@common/views/App'
import { rootState, rootDefault } from '@common/helpers/root'
import Link from './Link'
import Toggle from './Toggle'
import '@common/assets/styles/navigation.css'

interface PrimaryNavProps {
  open: boolean
}

function PrimaryNav({ open }: PrimaryNavProps) {
  const [root, setRoot] = useRecoilState(rootState)

  const _fetch = (e: SyntheticEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setRoot({ ...root, loading: !root.loading, menuOpen: false })
  }

  return (
    <nav className={`PrimaryNav ${open ? 'open' : 'closed'}`}>
      <Toggle />
      <Link to="" handler={_fetch}>
        Fetch
      </Link>
      <Link to={routes.login.path!}>{routes.login.label}</Link>
      <Link to={routes.login.path!}>{routes.login.label}</Link>
      <Link to={routes.login.path!}>{routes.login.label}</Link>
      <Link to={routes.login.path!}>{routes.login.label}</Link>
    </nav>
  )
}

export default PrimaryNav
