'use client'

import {
  Button,
  Card,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
// Custom components
import { HSeparator } from 'components/separator/Separator'
import { FcGoogle } from 'react-icons/fc'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { RiEyeCloseLine } from 'react-icons/ri'
import NavLink from 'components/link/NavLink'
import FcClever from 'components/icons/FcClever'

import HeroCapped from 'components/ui/HeroCapped'
import { useState } from 'react'

function SignIn() {
  const [show, setShow] = useState(false)

  const handleClick = () => setShow(!show)

  function cleverHandler() {
    const url =
      'https://clever.com/oauth/authorize?response_type=code&redirect_uri=' +
      window.location.href +
      '&client_id=' +
      process.env.NEXT_PUBLIC_CLEVER_ID

    window.location.href = url
  }

  return (
    <>
      <HeroCapped gradientHeight="50%">
        <Flex direction="column" alignSelf="center" justifySelf="center">
          <Card
            boxShadow="0 0 40px rgba(0, 0, 0, 0.2)"
            w={{ base: '100%', md: 'max-content' }}
            h="max-content"
            mx="auto"
            maxW="100%"
            p={{ base: '10px', md: '50px' }}
          >
            <Heading fontSize="36px" mb="10px">
              Sign In
            </Heading>
            <Text pb={8} fontWeight="400" fontSize="md" maxW="420px">
              You can use this to login <strong>OR</strong> register. If no account is found with your email, you'll be given the option to
              register or try a different email.
            </Text>
            <Flex
              zIndex="2"
              direction="column"
              w={{ base: '100%', md: '420px' }}
              maxW="100%"
              background="transparent"
              borderRadius="15px"
              mx={{ base: 'auto', lg: 'unset' }}
              me="auto"
              mb={{ base: '20px', md: 'auto' }}
            >
              <Flex justifyContent="space-between">
                <Button fontSize="sm" me="0px" mb="26px" py="15px" h="50px" borderRadius="16px" fontWeight="500">
                  <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
                  Sign in with Google
                </Button>
                <Button fontSize="sm" me="0px" mb="26px" py="15px" h="50px" borderRadius="16px" fontWeight="500" onClick={cleverHandler}>
                  <Icon as={FcClever} w="20px" h="20px" me="10px" />
                  Sign in with Clever
                </Button>
              </Flex>

              <Flex align="center" mb="25px">
                <HSeparator />
                <Text color="neutral.400" mx="14px">
                  or
                </Text>
                <HSeparator />
              </Flex>
              <FormControl>
                <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" mb="8px">
                  Email &nbsp; <Text color="brand.500">*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: '0px', md: '0px' }}
                  type="email"
                  mb="24px"
                  fontWeight="500"
                  size="lg"
                />
                <FormLabel ms="4px" fontSize="sm" fontWeight="500" display="flex">
                  Password &nbsp;<Text color="brand.500">*</Text>
                </FormLabel>
                <InputGroup size="md">
                  <Input isRequired={true} fontSize="sm" mb="24px" size="lg" type={show ? 'text' : 'password'} variant="auth" />
                  <InputRightElement display="flex" alignItems="center" mt="4px">
                    <Icon _hover={{ cursor: 'pointer' }} as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye} onClick={handleClick} />
                  </InputRightElement>
                </InputGroup>
                <Flex justifyContent="space-between" align="center" mb="24px">
                  <FormControl display="flex" alignItems="center">
                    <Checkbox id="remember-login" colorScheme="brand" me="10px" />
                    <FormLabel htmlFor="remember-login" mb="0" fontWeight="normal" fontSize="sm">
                      Keep me logged in
                    </FormLabel>
                  </FormControl>
                  <NavLink href="/auth/forgot-password">
                    <Text color="brand.500" fontSize="sm" w="124px" fontWeight="500">
                      Forgot password?
                    </Text>
                  </NavLink>
                </Flex>
                <Button
                  fontSize="lg"
                  variant="brand"
                  fontWeight="900"
                  w="100%"
                  h="50"
                  mb="24px"
                  textTransform="uppercase"
                  letterSpacing="1px"
                >
                  Sign In
                </Button>
              </FormControl>
              <Flex flexDirection="column" justifyContent="center" alignItems="start" maxW="100%" mt="0px">
                <Text fontWeight="400" fontSize="14px">
                  Not registered yet?
                  <NavLink href="/auth/sign-up">
                    <Text color="brand.500" as="span" ms="5px" fontWeight="500">
                      Create an Account
                    </Text>
                  </NavLink>
                </Text>
              </Flex>
            </Flex>
          </Card>
        </Flex>
      </HeroCapped>
    </>
  )
}

export default SignIn
