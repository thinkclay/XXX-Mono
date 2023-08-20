'use client'

import { Button, Flex, HStack, useColorMode, useColorModeValue } from '@chakra-ui/react'
import Link from 'components/link/Link'

// Custom components
import { RevisionLogo } from 'components/icons/Icons'
import Container from 'components/ui/Container'
import LogoFull from 'components/icons/LogoFull'

export default function PublicNav() {
  const backgroundColor = useColorModeValue('neutral.50', 'neutral.900')
  const { colorMode } = useColorMode()

  return (
    <Flex
      background={backgroundColor}
      borderTopWidth="16px"
      borderTopColor="brandOrange.400"
      flexDirection="row"
      py={{ base: 4, lg: 8 }}
      justifyContent="center"
      left="0"
      right="0"
      top="20px"
    >
      <Container>
        <HStack flexFlow="row wrap" w="100%" justifyContent="space-between" alignItems="center">
          <Link
            href="/"
            alignItems="center"
            display="flex"
            fontWeight="bold"
            justifyContent="center"
            lineHeight="100%"
            margin={{ sm: '0 auto', md: '0' }}
          >
            <LogoFull textColor={colorMode === 'light' ? '#262626' : '#fff'} ribbonColor={'#DF674D'} />
          </Link>

          <HStack spacing={8} margin={{ sm: '0 auto', md: '0' }}>
            <Link href="/about">About</Link>
            <Link href="/auth/login">Login</Link>
            <Button
              onClick={() =>
                (window.location.href = 'https://chrome.google.com/webstore/detail/revision-fighting-bias/jgflbioihdojhldekghdbelfgickocnp')
              }
              background={{ sm: 'transparent', md: 'brandYellow.0' }}
              color="neutral.900"
              px={{ sm: 0, md: '8' }}
            >
              Get It
            </Button>
          </HStack>
        </HStack>
      </Container>
    </Flex>
  )
}
