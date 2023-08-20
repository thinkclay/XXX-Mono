'use client'

import { Flex } from '@chakra-ui/react'

import DefaultAuth from 'components/auth/variants/DefaultAuthLayout/page'
import illustration from '/public/img/auth/auth.png'
import LoginForm from 'components/forms/LoginForm'

function SignIn() {
  return (
    <DefaultAuth illustrationBackground={illustration?.src}>
      <Flex
        maxW={{ base: '100%', md: 'max-content' }}
        w="100%"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: '30px', md: '60px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '40px', md: '14vh' }}
        flexDirection="column"
      >
        <LoginForm />
      </Flex>
    </DefaultAuth>
  )
}

export default SignIn
