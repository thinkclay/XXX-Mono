'use client'

import React from 'react'
import { Flex } from '@chakra-ui/react'

import CenteredAuth from 'components/auth/variants/CenteredAuthLayout/page'
import LoginForm from 'components/forms/LoginForm'

function SignIn() {
  return (
    <CenteredAuth cardTop={{ base: '200px' }} cardBottom={{ base: '50px', lg: 'auto' }}>
      <Flex
        maxW={{ base: '100%', md: 'max-content' }}
        w="100%"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        justifyContent="center"
        px={{ base: '20px', md: '0px' }}
        flexDirection="column"
      >
        <LoginForm />
      </Flex>
    </CenteredAuth>
  )
}

export default SignIn
