/** @format */

import { useRecoilValue } from 'recoil'
import { Route } from 'wouter'

import { menuState } from '@common/helpers/root'
import Account from '@common/views/Auth/Account'
import Login from '@common/views/Auth/Login'
import Register from '@common/views/Auth/Register'
import Reset from '@common/views/Auth/Reset'
import PrimaryNav from './Navigation/PrimaryNav'
import HomeScreen from './HomeScreen'

function App() {
  const menuOpen = useRecoilValue(menuState)

  return (
    <div className="App">
      <PrimaryNav open={menuOpen} />
      <div className={`Overlay ${menuOpen ? 'visible' : ''}`}></div>
      <Route path="/" component={HomeScreen} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/reset" component={Reset} />
      <Route path="/account" component={Account} />
    </div>
  )
}

export default App
