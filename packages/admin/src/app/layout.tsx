'use client'
import { ReactNode, useState } from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'

import { SidebarContext } from 'contexts/SidebarContext'
import { isWindowAvailable } from 'utils/navigation'
import AppWrappers from './AppWrappers'
import PublicNav from 'components/navigation/PublicNav'
import Footer from 'components/navigation/PublicFooter'
import FixedPlugin from 'components/fixedPlugin/FixedPlugin'

interface Props {
  children: ReactNode
}

export default function RootLayout({ children }: Props) {
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const authBg = useColorModeValue('white', 'neutral.900')

  if (isWindowAvailable()) document.documentElement.dir = 'ltr'

  return (
    <html lang="en">
      <body id="root">
        <AppWrappers>
          <SidebarContext.Provider
            value={{
              toggleSidebar,
              setToggleSidebar,
            }}
          >
            <PublicNav />

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

            <FixedPlugin />

            <Footer />
          </SidebarContext.Provider>
        </AppWrappers>
      </body>
    </html>
  )
}
