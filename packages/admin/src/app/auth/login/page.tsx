'use client'

import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
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

import LoginForm from 'components/forms/LoginForm'
import HeroCapped from 'components/ui/HeroCapped'
import { useState } from 'react'

function SignIn() {
  const textColor = useColorModeValue('neutral.900', 'neutral.100')
  const textColorSecondary = useColorModeValue('neutral.800', 'neutral.200')
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600')
  const textColorBrand = useColorModeValue('brand.500', 'white')
  const brandStars = useColorModeValue('brand.500', 'brand.400')
  const googleBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.200')
  const googleText = useColorModeValue('navy.700', 'white')
  const googleHover = useColorModeValue({ bg: 'gray.200' }, { bg: 'whiteAlpha.300' })
  const googleActive = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.200' })

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
            <Heading color={textColor} fontSize="36px" mb="10px">
              Sign In
            </Heading>
            <Text pb={8} color={textColorSecondary} fontWeight="400" fontSize="md" maxW="420px">
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
              <Button
                fontSize="sm"
                me="0px"
                mb="26px"
                py="15px"
                h="50px"
                borderRadius="16px"
                bg={googleBg}
                color={googleText}
                fontWeight="500"
                _hover={googleHover}
                _active={googleActive}
                _focus={googleActive}
              >
                <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
                Sign in with Google
              </Button>
              <Button
                fontSize="sm"
                me="0px"
                mb="26px"
                py="15px"
                h="50px"
                borderRadius="16px"
                bg={googleBg}
                color={googleText}
                fontWeight="500"
                _hover={googleHover}
                _active={googleActive}
                _focus={googleActive}
                onClick={cleverHandler}
              >
                <Icon as={FcClever} w="20px" h="20px" me="10px" />
                Sign in with Clever
              </Button>

              <Flex align="center" mb="25px">
                <HSeparator />
                <Text color="gray.400" mx="14px">
                  or
                </Text>
                <HSeparator />
              </Flex>
              <FormControl>
                <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color={textColor} mb="8px">
                  Email<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant="auth"
                  fontSize="sm"
                  ms={{ base: '0px', md: '0px' }}
                  type="email"
                  placeholder="hello@revisioned.org"
                  mb="24px"
                  fontWeight="500"
                  size="lg"
                />
                <FormLabel ms="4px" fontSize="sm" fontWeight="500" color={textColor} display="flex">
                  Password<Text color={brandStars}>*</Text>
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    isRequired={true}
                    fontSize="sm"
                    placeholder="Min. 8 characters"
                    mb="24px"
                    size="lg"
                    type={show ? 'text' : 'password'}
                    variant="auth"
                  />
                  <InputRightElement display="flex" alignItems="center" mt="4px">
                    <Icon
                      color={textColorSecondary}
                      _hover={{ cursor: 'pointer' }}
                      as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                      onClick={handleClick}
                    />
                  </InputRightElement>
                </InputGroup>
                <Flex justifyContent="space-between" align="center" mb="24px">
                  <FormControl display="flex" alignItems="center">
                    <Checkbox id="remember-login" colorScheme="brand" me="10px" />
                    <FormLabel htmlFor="remember-login" mb="0" fontWeight="normal" color={textColor} fontSize="sm">
                      Keep me logged in
                    </FormLabel>
                  </FormControl>
                  <NavLink href="/auth/forgot-password">
                    <Text color={textColorBrand} fontSize="sm" w="124px" fontWeight="500">
                      Forgot password?
                    </Text>
                  </NavLink>
                </Flex>
                <Button fontSize="sm" variant="brand" fontWeight="500" w="100%" h="50" mb="24px">
                  Sign In
                </Button>
              </FormControl>
              <Flex flexDirection="column" justifyContent="center" alignItems="start" maxW="100%" mt="0px">
                <Text color={textColorDetails} fontWeight="400" fontSize="14px">
                  Not registered yet?
                  <NavLink href="/auth/sign-up">
                    <Text color={textColorBrand} as="span" ms="5px" fontWeight="500">
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
