/** @format */

import { useRecoilValue } from 'recoil'

import { menuState, routeState } from '@common/helpers/root'
import { RenderMode } from '@common/types/UI'
import HomeScreen from '@common/views/Screens/HomeScreen'
import AccountScreen from '@common/views/Auth/AccountScreen'
import AuthScreen from '@common/views/Screens/AuthScreen'
import PrimaryNav from '@common/views/Navigation/PrimaryNav'
import AnalyticsScreen from '@common/views/Screens/AnalyticsScreen'
import Settings from './Screens/SettingsScreen'
import FeedbackScreen from '@common/views/Screens/FeedbackScreen'

interface AppProps {
  mode: RenderMode
}

function App(screen: AppProps) {
  const route = useRecoilValue(routeState)
  const menuOpen = useRecoilValue(menuState)

  const _renderView = (route: string) => {
    switch (route) {
      case '/account':
        return <AccountScreen {...screen} />

      case '/auth':
        return <AuthScreen {...screen} />

      case '/analytics':
        return <AnalyticsScreen {...screen} />

      case '/settings':
        return <Settings {...screen} />

      case '/feedback':
        return <FeedbackScreen />

      default:
        return <HomeScreen {...screen} />
    }
  }

  return (
    <div id="RevisionApp">
      <PrimaryNav open={menuOpen} />
      <div className={`Overlay ${menuOpen ? 'visible' : ''}`}></div>
      {_renderView(route)}
    </div>
  )
}

export default App
