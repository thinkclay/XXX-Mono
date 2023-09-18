'use client'

import LogoFull from 'components/images/LogoFull'
import {
  Avatar,
  Button,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useSigninCheck, useUser } from 'reactfire'

import Link from 'components/link/Link'
import Notification from 'components/navigation/Notification'
import Configurator from 'components/navigation/Configurator'
import { MdNotificationsNone, MdOutlineSpaceDashboard } from 'react-icons/md'
import { useFirebase } from '@common/services/firebase/hook'
import { IoMdMoon, IoMdSunny } from 'react-icons/io'
import AdminMenu from './AdminMenu'
import { profileRoutes, userRoutes } from 'config/routes'

export default function Header() {
  const { status, data: signInCheckResult } = useSigninCheck()
  const { data: user } = useUser()
  const { logout } = useFirebase()
  const backgroundColor = useColorModeValue('neutral.50', 'gray.800')
  const { colorMode, toggleColorMode } = useColorMode()
  const shadow = useColorModeValue('14px 17px 40px 4px rgba(112, 144, 176, 0.18)', '14px 17px 40px 4px rgba(112, 144, 176, 0.06)')
  const contrast = useColorModeValue('blue.500', 'yellow.400')

  const { onOpen } = useDisclosure()

  if (status === 'loading') return null

  function renderPublicNav() {
    return (
      <>
        <Link href="/auth/login">Login</Link>
        <Link href="/pricing">Pricing</Link>
        <Button
          onClick={() =>
            (window.location.href = 'https://chrome.google.com/webstore/detail/revision-fighting-bias/jgflbioihdojhldekghdbelfgickocnp')
          }
          background={{ sm: 'transparent', md: 'brandYellow.0' }}
          color="neutral.900"
          px={{ sm: 0, md: '8' }}
        >
          Get It
        </Button>
      </>
    )
  }

  function renderDashboardNav() {
    return (
      <>
        <AdminMenu
          icon={<Avatar bg="brand.400" src={user?.photoURL || undefined} name={user?.displayName || undefined} size="xs" />}
          route={profileRoutes}
          title={`👋 Hey ${user?.displayName?.split(' ')[0]}`}
          custom={
            <>
              <MenuItem color="brand.400" key={`p`} px={5} py={3} _hover={{ bg: 'yellow.400', color: 'black' }} onClick={logout}>
                UID: ({user?.uid})
              </MenuItem>
              <MenuItem color="brand.400" key={`p`} px={5} py={3} _hover={{ bg: 'yellow.400', color: 'black' }} onClick={logout}>
                Logout
              </MenuItem>
            </>
          }
        />

        <AdminMenu icon={<Icon as={MdOutlineSpaceDashboard} w="24px" h="24px" />} route={userRoutes} />

        <Menu>
          <MenuButton>
            <Flex>
              <Icon as={MdNotificationsNone} w="24px" h="24px" />
            </Flex>
          </MenuButton>
          <MenuList
            boxShadow={shadow}
            p="20px"
            borderRadius="20px"
            border="none"
            mt="22px"
            me={{ base: '30px', md: 'unset' }}
            minW={{ base: 'unset', md: '400px', xl: '450px' }}
            maxW={{ base: '360px', md: 'unset' }}
          >
            <Flex w="100%" mb="20px">
              <Text fontWeight="600">Notifications</Text>
            </Flex>
            <Flex flexDirection="column">
              <MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} px="0" borderRadius="8px" mb="10px">
                <Notification
                  icon="app"
                  title="Version 1.0.0!"
                  description="We are excited to announce that ReVision is officially out of beta and available to everyone!"
                />
              </MenuItem>
            </Flex>
          </MenuList>
        </Menu>

        <Configurator />
      </>
    )
  }

  return (
    <Flex
      background={backgroundColor}
      borderTopWidth="16px"
      borderTopColor="brand.400"
      flexDirection="row"
      py={{ base: 4, lg: 8 }}
      justifyContent="center"
      px={{ base: 8, lg: 10 }}
      position="relative"
      zIndex={800}
    >
      <HStack flexFlow="row wrap" w="100%" justifyContent="space-between" alignItems="center" maxW="container.xl">
        <Link
          href="/"
          alignItems="center"
          display="flex"
          fontWeight="bold"
          justifyContent="center"
          lineHeight="100%"
          margin={{ sm: '0 auto', md: '0' }}
        >
          <LogoFull textColor={colorMode === 'light' ? '#262626' : '#fff'} ribbonColor={'#DF674D'} />
        </Link>

        <HStack align="center" spacing={5} pt={2}>
          {signInCheckResult && signInCheckResult.signedIn ? renderDashboardNav() : renderPublicNav()}

          <Icon onClick={toggleColorMode} color={contrast} h="24px" w="24px" as={colorMode === 'light' ? IoMdMoon : IoMdSunny} />
        </HStack>
      </HStack>
    </Flex>
  )
}
