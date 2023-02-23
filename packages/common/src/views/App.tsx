/** @format */

import { useRecoilValue } from 'recoil'
import { Route } from 'wouter'
import Account from '@common/views/Auth/Account'
import Login from '@common/views/Auth/Login'
import Register from '@common/views/Auth/Register'
import Reset from '@common/views/Auth/Reset'
import Editor from '@common/views/Editor'
import { menuState } from '@common/helpers/root'
import PrimaryNav from './Navigation/PrimaryNav'

function App() {
  const menuOpen = useRecoilValue(menuState)

  return (
    <div className="App">
      <PrimaryNav open={menuOpen} />
      <div className={`Overlay ${menuOpen ? 'visible' : ''}`}></div>
      {/* {routes[route].element()} */}
      <div>
        <Route path="/" component={Editor} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/reset" component={Reset} />
        <Route path="/account" component={Account} />
      </div>
    </div>
  )
}

export default App
