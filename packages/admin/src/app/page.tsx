'use client'

import { StrictMode } from 'react'
import dynamic from 'next/dynamic'
import { RecoilRoot } from 'recoil'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'

import Navbar from 'components/navbar/NavbarAuth'
import Container from 'components/ui/Container'
import LoginForm from './auth/form/LoginForm'

const DynamicEditor = dynamic(
  () => {
    console.log('Dynamic component rendered')
    return import('@common/views/Screens/MainScreen')
    // return import('@common/views/Screens/MainScreen')
  },
  {
    ssr: false,
  }
)

export default function Home() {
  return (
    <Flex direction="column" alignSelf="center" justifySelf="center" mx={{ base: '10px', lg: '0px' }} minH="100vh">
      <Navbar />

      <Box
        minH={{ base: '50vh', md: '50vh' }}
        maxH={{ base: '50vh', md: '50vh' }}
        w={{ md: 'calc(100vw)' }}
        maxW={{ md: 'calc(100vw)' }}
        bgGradient="linear(to-b, #E05845, #E05845)"
        mx={{ md: 'auto' }}
        padding={{ base: '140px 20px' }}
      >
        <Container>
          <Box width={{ base: '100%', lg: '49%' }}>
            <Heading as="h1" color="whiteAlpha.900">
              Interrupting Bias
              <br />
              Reimagining Communication
            </Heading>
            <Text color="whiteAlpha.900" fontSize="xl" fontWeight="400" paddingTop="6">
              Implicit bias is a part of being human. ReVision helps you spot it, fix it, and track your improvement over time.
            </Text>
          </Box>

          <Box>
            <RecoilRoot>
              <StrictMode>
                <DynamicEditor mode="embedded" />
              </StrictMode>
            </RecoilRoot>
          </Box>
        </Container>
      </Box>

      <LoginForm />
    </Flex>
  )
}
