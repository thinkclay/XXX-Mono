/** @format */

import { useRecoilState } from 'recoil'
import { useRoute, Link } from 'wouter'
import { rootState } from '@common/helpers/root'

function NavLink(props: any) {
  const [isActive] = useRoute(props.href)
  const [root, setRoot] = useRecoilState(rootState)

  const _handler = () => {
    setRoot({ ...root, menuOpen: false })
  }

  return (
    <Link {...props} onClick={_handler}>
      <a className={isActive ? 'active' : ''}>{props.children}</a>
    </Link>
  )
}

export default NavLink
