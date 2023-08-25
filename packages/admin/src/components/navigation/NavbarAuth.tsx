'use client'
// Chakra imports
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  SimpleGrid,
} from '@chakra-ui/react'
import Link from 'components/link/Link'

import { Image } from 'components/images/Image'

// Custom components
import { RevisionLogo } from 'components/icons/Icons'
import { SidebarResponsive } from 'components/sidebar/Sidebar'
import { SidebarContext } from 'contexts/SidebarContext'

// Assets
import dropdown from '/public/img/layout/dropdown.png'
import { GoChevronDown } from 'react-icons/go'
import routes from 'routes'
import { IRoute } from 'types/navigation'
import Container from 'components/ui/Container'

export default function AuthNavbar(props: { logo?: JSX.Element | string; logoText?: string; secondary?: boolean; sidebarWidth?: any }) {
  const { logoText, sidebarWidth } = props
  // Menu States
  const { isOpen: isOpenAuth, onOpen: onOpenAuth, onClose: onCloseAuth } = useDisclosure()

  function getLinks(routeName: string) {
    let foundRoute = routes.filter(route => route.items && route.name === routeName)
    return foundRoute[0].items
  }

  function getLinksCollapse(routeName: string) {
    let foundRoute = routes.filter(route => route.items && route.name === routeName)
    // let foundLinks: { name: string; layout?: string; path: string; component?: () => JSX.Element }[];
    let foundLinks: IRoute[] = []
    if (foundRoute[0].items) {
      for (let link = 0; link < foundRoute[0].items.length; link++) {
        foundLinks.push(foundRoute[0].items[link])
      }
      return foundLinks
    }

    return foundLinks
  }

  let authObject = getLinksCollapse('Authentication')
  let logoColor = useColorModeValue('white', 'white')
  // Chakra color mode

  const textColor = useColorModeValue('navy.700', 'white')
  let menuBg = useColorModeValue('white', 'navy.900')
  let mainText = '#242321'
  let navbarBg = '#FFFCF5'
  let navbarShadow = 'initial'

  let brand = (
    <Link
      href={`${process.env.PUBLIC_URL}/#/`}
      display="flex"
      lineHeight="100%"
      fontWeight="bold"
      justifyContent="center"
      alignItems="center"
      color={mainText}
    >
      <Stack direction="row" spacing="12px" alignItems="center" justify="center">
        <RevisionLogo h="26px" w="175px" color={logoColor} />
      </Stack>
      <Text fontSize="sm" mt="3px">
        {logoText}
      </Text>
    </Link>
  )
  if (props.secondary === true) {
    brand = (
      <Link
        minW="175px"
        href={`${process.env.PUBLIC_URL}/#/`}
        display="flex"
        lineHeight="100%"
        fontWeight="bold"
        justifyContent="center"
        alignItems="center"
        color={mainText}
      >
        <RevisionLogo h="26px" w="175px" my="32px" color={logoColor} />
      </Link>
    )
  }

  const createMainLinks = (routes?: IRoute[]) => {
    return routes?.map((link, key) => {
      if (link.collapse === true) {
        return (
          <Stack key={key} direction="column" maxW="max-content">
            <Stack direction="row" spacing="0px" alignItems="center" cursor="default">
              <Text textTransform="uppercase" fontWeight="bold" fontSize="sm" me="auto" color={textColor}>
                {link.name}
              </Text>
            </Stack>
            <Stack direction="column" bg={menuBg}>
              {createMainLinks(link.items)}
            </Stack>
          </Stack>
        )
      } else {
        return (
          <Link key={key} href={link.layout + link.path}>
            <Text color="neutral.400" fontSize="sm" fontWeight="normal">
              {link.name}
            </Text>
          </Link>
        )
      }
    })
  }

  const createAuthLinks = (routes: any[]) => {
    return routes.map((link, key) => {
      if (link.collapse === true) {
        return (
          <Stack key={key} direction="column" maxW="max-content">
            <Stack direction="row" spacing="0px" alignItems="center" cursor="default">
              <Text textTransform="uppercase" fontWeight="bold" fontSize="sm" me="auto" color={textColor}>
                {link.name}
              </Text>
            </Stack>
            <Stack direction="column" bg={menuBg}>
              {createAuthLinks(link.items)}
            </Stack>
          </Stack>
        )
      } else {
        return (
          <Link key={key} href={link.layout + link.path}>
            <Text color="neutral.400" fontSize="sm" fontWeight="normal">
              {link.name}
            </Text>
          </Link>
        )
      }
    })
  }

  const linksAuth = (
    <HStack display={{ sm: 'none', lg: 'flex' }} spacing="30px">
      <Stack
        direction="row"
        spacing="4px"
        alignItems="center"
        color="#fff"
        fontWeight="bold"
        onMouseEnter={onOpenAuth}
        onMouseLeave={onCloseAuth}
        cursor="pointer"
        position="relative"
      >
        <Text fontSize="sm" color={mainText}>
          Authentication
        </Text>
        <Box>
          <Icon mt="8px" as={GoChevronDown} color={mainText} w="14px" h="14px" fontWeight="2000" />
        </Box>
        <Menu isOpen={isOpenAuth}>
          <MenuList bg={menuBg} p="22px" cursor="default" position="absolute" top="30px" left="-10px" display="flex" w="max-content">
            <SimpleGrid me="20px" columns={2} alignItems="start" minW="180px" gap="24px">
              {createAuthLinks(authObject)}
            </SimpleGrid>
            <Image borderRadius="16px" src={dropdown} alt="" />
          </MenuList>
        </Menu>
      </Stack>
    </HStack>
  )

  return (
    <SidebarContext.Provider value={{ sidebarWidth }}>
      <Flex
        background="white"
        borderTopWidth="16px"
        borderTopColor="brand.400"
        flexDirection="row"
        py={{ base: 4, lg: 8 }}
        justifyContent="center"
        left="0"
        right="0"
        top="20px"
      >
        <Container>
          <Flex w="100%" justifyContent={{ sm: 'start', lg: 'space-between' }} alignItems={{ sm: 'center', lg: 'center' }}>
            {brand}
            <Box ms={{ base: 'auto', lg: '0px' }} display={{ base: 'flex', lg: 'none' }} justifyContent="center" alignItems="center">
              <SidebarResponsive routes={routes} />
            </Box>
            {linksAuth}
          </Flex>
        </Container>
      </Flex>
    </SidebarContext.Provider>
  )
}
