'use client'

import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { RiEyeCloseLine } from 'react-icons/ri'
import { Button, Checkbox, Flex, FormControl, FormLabel, Icon, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

import { useFirebase } from '@common/services/firebase/hook'
import { HSeparator } from 'components/separator/Separator'
import NavLink from 'components/link/NavLink'
import FcClever from 'components/icons/FcClever'
import HeroCapped from 'components/ui/HeroCapped'
import AuthForm from 'components/forms/AuthForm'

export default function Login() {
  const router = useRouter()
  const { authLoading, authUser, googlePopupLogin, cleverPopupLogin } = useFirebase()
  const [show, setShow] = useState(false)

  const handleClick = () => setShow(!show)

  if (authUser) router.push('/admin')

  return (
    <>
      <HeroCapped gradientHeight="50%">
        <Flex direction="column" alignSelf="center" justifySelf="center">
          <AuthForm
            heading="Login"
            description={
              <>
                You can use this to login <strong>OR</strong> register. If no account is found with your email, you'll be given the option
                to register or try a different email.
              </>
            }
          >
            <Flex justifyContent="space-between">
              <Button fontSize="sm" me="0px" mb="26px" py="15px" h="50px" borderRadius="16px" fontWeight="500" onClick={googlePopupLogin}>
                <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
                Sign in with Google
              </Button>
              <Button fontSize="sm" me="0px" mb="26px" py="15px" h="50px" borderRadius="16px" fontWeight="500" onClick={cleverPopupLogin}>
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
                <NavLink href="/auth/reset">
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
          </AuthForm>
        </Flex>
      </HeroCapped>
    </>
  )
}
