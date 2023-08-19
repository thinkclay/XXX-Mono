'use client'

import React from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'

import Navbar from 'components/navbar/NavbarAuth'

export default function Home() {
  return (
    <Flex direction="column" alignSelf="center" justifySelf="center" mx={{ base: '10px', lg: '0px' }} minH="100vh">
      <Navbar />

      <Flex direction="row" alignContent="center">
        <Box
          minH={{ base: '50vh', md: '50vh' }}
          maxH={{ base: '50vh', md: '50vh' }}
          w={{ md: 'calc(100vw)' }}
          maxW={{ md: 'calc(100vw)' }}
          bgGradient="linear(to-b, #E05845, #E05845)"
          mx={{ md: 'auto' }}
          padding={{ base: '120px 20px' }}
        >
          <Box>
            <Heading as="h1">
              Interrupting Bias
              <br />
              Reimagining Communication
            </Heading>
          </Box>
        </Box>
      </Flex>
    </Flex>
  )
}
