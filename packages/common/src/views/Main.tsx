import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { Modal } from 'antd'

import { RenderMode } from '@common/types/UI'
import { menuState, routeState } from '@common/helpers/root'
import PrimaryNav from '@common/views/Navigation/PrimaryNav'
import AccountScreen from '@common/views/Auth/AccountScreen'
import AnalyticsScreen from '@common/views/Screens/AnalyticsScreen'
import AuthScreen from '@common/views/Screens/AuthScreen'
import FeedbackScreen from '@common/views/Screens/FeedbackScreen'
import HomeScreen from '@common/views/Screens/HomeScreen'
import Settings from '@common/views/Screens/SettingsScreen'

interface Props {
  mode: RenderMode
}

export default function Main(screen: Props) {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const route = useRecoilValue(routeState)
  const menuOpen = useRecoilValue(menuState)

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
            Thank you for registering with ReVision! As reminder, your registration is solely for your own use, and all data related to your
            use of ReVision is anonymized.
          </p>
        </Modal>
      )}
      {_renderView(route)}
    </div>
  )
}
