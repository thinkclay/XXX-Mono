'use client'

import { Button, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import AuthForm from 'components/forms/AuthForm'

import HeroCapped from 'components/ui/HeroCapped'

function ForgotPassword() {
  return (
    <HeroCapped gradientHeight="50%">
      <Flex direction="column" alignSelf="center" justifySelf="center">
        <AuthForm
          heading="Reset Password"
          description={
            <>
              No problem. Just let us know your email address and we&#39;ll email you a password reset link that will allow you to choose a
              new one.
            </>
          }
        >
          <Flex
            zIndex="2"
            direction="column"
            w={{ base: '100%', lg: '456px' }}
            maxW="100%"
            background="transparent"
            borderRadius="15px"
            mx={{ base: 'auto', lg: 'unset' }}
            me="auto"
            mb={{ base: '20px', md: 'auto' }}
            align="start"
          >
            <FormControl>
              <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" mb="8px">
                Email &nbsp;<Text color="brand.500">*</Text>
              </FormLabel>
              <Input isRequired={true} variant="auth" fontSize="sm" type="email" placeholder="hello@revisioned.org" mb="24px" size="lg" />
              <Button fontSize="sm" variant="brand" fontWeight="500" w="100%" h="50" mb="24px">
                Email password reset link
              </Button>
            </FormControl>
          </Flex>
        </AuthForm>
      </Flex>
    </HeroCapped>
  )
}

export default ForgotPassword
