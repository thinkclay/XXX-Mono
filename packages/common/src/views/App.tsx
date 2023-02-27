/** @format */

import { useRecoilValue } from 'recoil'
import { Route, useLocation } from 'wouter'
import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '@common/helpers/firebase'
import { termsState, menuState } from '@common/helpers/root'
import Account from '@common/views/Auth/Account'
import Login from '@common/views/Auth/Login'
import Register from '@common/views/Auth/Register'
import Reset from '@common/views/Auth/Reset'
import Editor from '@common/views/Editor'
import PrimaryNav from './Navigation/PrimaryNav'
import WelcomeScreen from './Welcome/WelcomeScreen'

function App() {
  const [_location, _setLocation] = useLocation()
  const [_user, _loading, _error] = useAuthState(auth)
  const menuOpen = useRecoilValue(menuState)
  const acceptedTerms = useRecoilValue(termsState)

  const _renderPage = () => {
    if (!acceptedTerms) return <WelcomeScreen />

    return (
      <>
        <PrimaryNav open={menuOpen} />
        <div className={`Overlay ${menuOpen ? 'visible' : ''}`}></div>
        <Route path="/" component={Editor} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/reset" component={Reset} />
        <Route path="/account" component={Account} />
      </>
    )
  }

  return <div className="App">{_renderPage()}</div>
}

export default App
