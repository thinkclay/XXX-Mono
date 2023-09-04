'use client'
import { ReactNode, useState } from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { FirebaseAppProvider } from 'reactfire'

import { SidebarContext } from 'contexts/SidebarContext'
import AppWrappers from './AppWrappers'
import Header from 'components/navigation/Header'
import Footer from 'components/navigation/Footer'
import { firebaseConfig } from '@common/services/firebase'

interface Props {
  children: ReactNode
}

export default function RootLayout({ children }: Props) {
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const authBg = useColorModeValue('white', 'neutral.900')

  return (
    <html lang="en">
      <body id="root">
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
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
        </FirebaseAppProvider>
      </body>
    </html>
  )
}
