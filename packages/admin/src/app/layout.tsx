'use client'
import { ReactNode, useEffect, useState } from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { User, onAuthStateChanged } from 'firebase/auth'

import { SidebarContext } from 'contexts/SidebarContext'
import { isWindowAvailable } from 'utils/navigation'
import AppWrappers from './AppWrappers'
import Header from 'components/navigation/Header'
import { auth } from '@common/services/firebase'
import { AuthContext } from '@common/services/firebase/hook'
import LoadingOverlay from 'components/ui/LoadingOverlay'
import Footer from 'components/navigation/Footer'

interface Props {
  children: ReactNode
}

export default function RootLayout({ children }: Props) {
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const authBg = useColorModeValue('white', 'neutral.900')

  if (isWindowAvailable()) document.documentElement.dir = 'ltr'

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  function renderContent() {
    if (loading) return <LoadingOverlay />

    return (
      <AppWrappers>
        <SidebarContext.Provider
          value={{
            toggleSidebar,
            setToggleSidebar,
          }}
        >
          <Header />

          <Box
            bg={authBg}
            minHeight="100vh"
            height="100%"
            position="relative"
            w="100%"
            transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
            transitionDuration=".2s, .2s, .35s"
            transitionProperty="top, bottom, width"
            transitionTimingFunction="linear, linear, ease"
          >
            <Box mx="auto" minH="100vh">
              {children}
            </Box>
          </Box>

          <Footer />
        </SidebarContext.Provider>
      </AppWrappers>
    )
  }

  return (
    <html lang="en">
      <body id="root">
        <AuthContext.Provider value={{ user }}>{renderContent()}</AuthContext.Provider>
      </body>
    </html>
  )
}
