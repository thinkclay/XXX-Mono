'use client'

import { Box } from '@chakra-ui/react'
import { useContext, ReactNode, useEffect } from 'react'

import routes from 'routes'

import Sidebar from 'components/sidebar/Sidebar'
import { ConfiguratorContext } from 'contexts/ConfiguratorContext'
import { getActiveNavbar, getActiveRoute, isWindowAvailable } from 'utils/navigation'
import WithAuth from 'contexts/WithAuth'

interface Props {
  children: ReactNode
}

export default function AdminLayout({ children }: Props) {
  if (isWindowAvailable()) document.documentElement.dir = 'ltr'

  const context = useContext(ConfiguratorContext)

  const { mini, hovered, setHovered } = context

  return (
    <WithAuth>
      <Box>
        <Sidebar mini={mini} routes={routes} hovered={hovered} setHovered={setHovered} />
        <Box
          float="right"
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w={
            mini === false
              ? { base: '100%', xl: 'calc( 100% - 290px )' }
              : mini === true && hovered === true
              ? { base: '100%', xl: 'calc( 100% - 290px )' }
              : { base: '100%', xl: 'calc( 100% - 120px )' }
          }
          maxWidth={
            mini === false
              ? { base: '100%', xl: 'calc( 100% - 290px )' }
              : mini === true && hovered === true
              ? { base: '100%', xl: 'calc( 100% - 290px )' }
              : { base: '100%', xl: 'calc( 100% - 120px )' }
          }
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Box mx="auto" p={{ base: '20px', md: '30px' }} pe="20px" minH="100vh" pt="50px">
            {children}
          </Box>
        </Box>
      </Box>
    </WithAuth>
  )
}
