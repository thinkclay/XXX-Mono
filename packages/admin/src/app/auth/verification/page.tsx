'use client'

import React from 'react'
import { Button, Flex, FormControl, PinInput, PinInputField, Text } from '@chakra-ui/react'
import AuthForm from 'components/forms/AuthForm'
import HeroCapped from 'components/ui/HeroCapped'

export default function ForgotPassword() {
  return (
    <HeroCapped gradientHeight="50%">
      <AuthForm heading="2-Step Verification" description="Enter your code from Email or SMS text">
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: '100%', md: '425px' }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: 'auto', lg: 'unset' }}
          me="auto"
          mb={{ base: '20px', md: 'auto' }}
        >
          <FormControl>
            <Flex justify="center">
              <PinInput otp>
                <PinInputField
                  fontSize="36px"
                  borderRadius="16px"
                  h={{ base: '63px', md: '95px' }}
                  w={{ base: '63px', md: '95px' }}
                  me="10px"
                />
                <PinInputField
                  fontSize="36px"
                  borderRadius="16px"
                  h={{ base: '63px', md: '95px' }}
                  w={{ base: '63px', md: '95px' }}
                  me="10px"
                />
                <PinInputField
                  fontSize="36px"
                  borderRadius="16px"
                  h={{ base: '63px', md: '95px' }}
                  w={{ base: '63px', md: '95px' }}
                  me="10px"
                />
                <PinInputField fontSize="36px" borderRadius="16px" h={{ base: '63px', md: '95px' }} w={{ base: '63px', md: '95px' }} />
              </PinInput>
            </Flex>

            <Button fontSize="14px" variant="brand" borderRadius="16px" fontWeight="500" w="100%" h="50" mb="24px" mt="12px">
              Unlock
            </Button>
          </FormControl>
          <Flex flexDirection="column" justifyContent="center" alignItems="start" maxW="100%" mt="0px">
            <Text fontWeight="400" fontSize="14px" mx={{ base: 'auto', lg: 'unset' }} textAlign={{ base: 'center', lg: 'left' }}>
              Haven&#39;t received it?
              <Text color="brand.400" as="span" ms="5px" fontWeight="500">
                Resend a new code
              </Text>
            </Text>
          </Flex>
        </Flex>
      </AuthForm>
    </HeroCapped>
  )
}
