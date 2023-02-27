/** @format */

import { rootState } from '@common/helpers/root'
import { ReactNode } from 'react'
import { useRecoilState } from 'recoil'
import { useRoute, Link } from 'wouter'

interface NavLinkProps {
  href: string
  children: ReactNode
  active?: boolean
}

function NavLink(props: NavLinkProps) {
  const [isActive] = useRoute(props.href)
  const [root, setRoot] = useRecoilState(rootState)

  return (
    <Link
      {...props}
      onClick={e => {
        setRoot({ ...root, menuOpen: false, route: props.href })
      }}
    >
      <a className={isActive ? 'active' : ''}>{props.children}</a>
    </Link>
  )
}

export default NavLink
