/** @format */

import { useRecoilValue } from 'recoil'
import Account from '@common/views/Auth/Account'
import Login from '@common/views/Auth/Login'
import Register from '@common/views/Auth/Register'
import Reset from '@common/views/Auth/Reset'
import Editor from '@common/views/Editor'
import { menuState, routeState } from '@common/helpers/root'
import PrimaryNav from './Navigation/PrimaryNav'

interface Routes {
  [key: string]: {
    label: string
    path: string
    element: () => JSX.Element
  }
}

export const routes: Routes = {
  root: {
    label: 'Home',
    path: '/',
    element: Editor,
  },
  register: {
    label: 'Register',
    path: '/register',
    element: Register,
  },
  login: {
    label: 'Login',
    path: '/login',
    element: Login,
  },
  reset: {
    label: 'Reset Password',
    path: '/reset',
    element: Reset,
  },
  account: {
    label: 'Account',
    path: '/account',
    element: Account,
  },
}

function App() {
  const route = useRecoilValue(routeState)
  const menuOpen = useRecoilValue(menuState)

  console.log(menuOpen)

  return (
    <div className="App">
      <PrimaryNav open={menuOpen} />
      <div className={`Overlay ${menuOpen ? 'visible' : ''}`}></div>
      {routes[route].element()}
    </div>
  )
}

export default App
