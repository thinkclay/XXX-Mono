/** @format */

import { SyntheticEvent, useState } from 'react'
import { useRecoilState } from 'recoil'
import { rootState } from '@common/helpers/root'
import { routes } from '@common/views/App'
import Link from './Link'
import Toggle from './Toggle'
import '@common/assets/styles/navigation.css'
import { Revision } from '@common/types/Revision'

interface PrimaryNavProps {
  open: boolean
}

function PrimaryNav({ open }: PrimaryNavProps) {
  const [root, setRoot] = useRecoilState(rootState)

  return (
    <nav className={`PrimaryNav ${open ? 'open' : 'closed'}`}>
      <Toggle />
      <Link to={routes.login.path!}>{routes.login.label}</Link>
      <Link to={routes.login.path!}>{routes.login.label}</Link>
      <Link to={routes.login.path!}>{routes.login.label}</Link>
      <Link to={routes.login.path!}>{routes.login.label}</Link>
    </nav>
  )
}

export default PrimaryNav
