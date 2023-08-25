'use client'

import { Button, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'

import AuthForm from 'components/forms/AuthForm'
import HeroCapped from 'components/ui/HeroCapped'

function ForgotPassword() {
  return (
    <HeroCapped gradientHeight="50%">
      <AuthForm heading="Screen Lock" description="Enter your password to unlock">
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: '100%', lg: '420px' }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: 'auto', lg: 'unset' }}
          me="auto"
          mb={{ base: '20px', md: 'auto' }}
        >
          <FormControl>
            <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" mb="8px">
              Password &nbsp;<Text color="brand.500">*</Text>
            </FormLabel>
            <Input isRequired={true} variant="auth" fontSize="sm" type="password" placeholder="Your account password" mb="24px" size="lg" />
            <Button fontSize="14px" variant="brand" borderRadius="16px" fontWeight="500" w="100%" h="50" mb="24px">
              Unlock
            </Button>
          </FormControl>
        </Flex>
      </AuthForm>
    </HeroCapped>
  )
}

export default ForgotPassword
