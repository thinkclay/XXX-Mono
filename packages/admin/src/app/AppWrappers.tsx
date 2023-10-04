'use client'

import { useState, ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { ChakraProvider } from '@chakra-ui/react'

import initialTheme from 'theme/theme'
import { ConfiguratorContext } from 'contexts/ConfiguratorContext'
import Providers from '@common/helpers/providers'

import 'styles/App.css'
import 'styles/Contact.css'
import 'styles/Plugins.css'
import 'styles/MiniCalendar.css'

interface Props {
  children: ReactNode
}

function _Root({ children }: Props) {
  return children
}

const Root = dynamic(() => Promise.resolve(_Root), {
  ssr: false,
})

export default function AppWrappers({ children }: Props) {
  const [mini, setMini] = useState(false)
  const [contrast, setContrast] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [theme, setTheme] = useState(initialTheme)

  return (
    <Root>
      <Providers>
        <ConfiguratorContext.Provider
          value={{
            mini,
            setMini,
            theme,
            setTheme,
            hovered,
            setHovered,
            contrast,
            setContrast,
          }}
        >
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </ConfiguratorContext.Provider>
      </Providers>
    </Root>
  )
}
