/** @format */

import { getFirestore } from 'firebase/firestore'
import { FirebaseAppProvider, FirestoreProvider, useFirebaseApp } from 'reactfire'
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
import { firebaseConfig } from '@common/services/firebase'

import '@common/assets/styles/reset.scss'
import '@common/assets/styles/index.scss'
import { ReactNode } from 'react'

interface AppProps {
  mode: RenderMode
}

export function AppWrapper({ children }: { children: ReactNode }) {
  const firestoreInstance = getFirestore(useFirebaseApp())

  return <FirestoreProvider sdk={firestoreInstance}>{children}</FirestoreProvider>
}

export default function App(screen: AppProps) {
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
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <AppWrapper>
        <div id="RevisionApp">
          <PrimaryNav open={menuOpen} />
          <div className={`Overlay ${menuOpen ? 'visible' : ''}`}></div>
          {_renderView(route)}
        </div>
      </AppWrapper>
    </FirebaseAppProvider>
  )
}
