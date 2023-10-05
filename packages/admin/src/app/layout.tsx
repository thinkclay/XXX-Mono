'use client'

import { ReactNode, useState } from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'

import { SidebarContext } from 'contexts/SidebarContext'
import AppWrappers from './AppWrappers'
import Header from 'components/navigation/Header'
import Footer from 'components/navigation/Footer'
import { FirebaseApp } from '@common/views/Contexts/FirebaseContext'

interface Props {
  children: ReactNode
}

export default function RootLayout({ children }: Props) {
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const background = useColorModeValue('white', 'neutral.900')

  return (
    <FirebaseApp>
      <html lang="en">
        <body id="root">
          <AppWrappers>
            <SidebarContext.Provider
              value={{
                toggleSidebar,
                setToggleSidebar,
              }}
            >
              <Header />

              <Box bg={background} minHeight="100vh" height="100%" position="relative" w="100%">
                <Box mx="auto" minH="100vh">
                  {children}
                </Box>
              </Box>

              <Footer />
            </SidebarContext.Provider>
          </AppWrappers>
        </body>
      </html>
    </FirebaseApp>
  )
}
