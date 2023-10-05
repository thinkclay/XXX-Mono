/** @format */

import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { Modal } from 'antd'

import { menuState, routeState } from '@common/helpers/root'
import { RenderMode } from '@common/types/UI'
import HomeScreen from '@common/views/Screens/HomeScreen'
import AccountScreen from '@common/views/Auth/AccountScreen'
import AuthScreen from '@common/views/Screens/AuthScreen'
import PrimaryNav from '@common/views/Navigation/PrimaryNav'
import AnalyticsScreen from '@common/views/Screens/AnalyticsScreen'
import Settings from './Screens/SettingsScreen'
import FeedbackScreen from '@common/views/Screens/FeedbackScreen'
import { FirebaseApp, FirebaseAddons, FirebaseUserContext } from '@common/views/Contexts/FirebaseContext'

import '@common/assets/styles/reset.scss'
import '@common/assets/styles/index.scss'

interface AppProps {
  mode: RenderMode
}

export default function App(screen: AppProps) {
  const route = useRecoilValue(routeState)
  const menuOpen = useRecoilValue(menuState)
  const [isModalOpen, setIsModalOpen] = useState(true)

  useEffect(() => {
    const hasPopupBeenShown = localStorage.getItem('anonymizedPopup')
    if (hasPopupBeenShown) {
      setIsModalOpen(false)
    }
  }, [])

  const handleAccept = () => {
    setIsModalOpen(false)
    localStorage.setItem('anonymizedPopup', 'true')
  }

  const _renderView = (route: string) => {
    switch (route) {
      case '/account':
        return <AccountScreen {...screen} />

      case '/auth':
        return <AuthScreen {...screen} />

      case '/analytics':
        return <AnalyticsScreen {...screen} />

      case '/settings':
        return <Settings />

      case '/feedback':
        return <FeedbackScreen />

      default:
        return <HomeScreen {...screen} />
    }
  }

  return (
    <FirebaseApp>
      <FirebaseAddons>
        <FirebaseUserContext>
          <div id="RevisionApp">
            <PrimaryNav open={menuOpen} />
            <div className={`Overlay ${menuOpen ? 'visible' : ''}`}></div>
            {isModalOpen && (
              <Modal
                title="Profile Setup Confirmation"
                open={isModalOpen}
                onOk={handleAccept}
                onCancel={handleAccept}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'block', margin: '0 auto' } }}
              >
                <p className="reminder-text">
                  Thank you for registering with ReVision! As reminder, your registration is solely for your own use, and all data related
                  to your use of ReVision is anonymized.
                </p>
              </Modal>
            )}
            {_renderView(route)}
          </div>
        </FirebaseUserContext>
      </FirebaseAddons>
    </FirebaseApp>
  )
}
