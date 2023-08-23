import { ReactNode } from 'react'
import { Menu, MenuButton, MenuList, Flex, MenuItem, Text, useColorModeValue } from '@chakra-ui/react'
import { uniqueId } from 'lodash'

import NavLink from 'components/link/NavLink'
import { Route } from 'config/routes'

interface Props {
  icon: ReactNode
  route: Route
  title?: ReactNode
  custom?: ReactNode
}

export default function AdminMenu({ icon, route, title, custom }: Props) {
  const shadow = useColorModeValue('14px 17px 40px 4px rgba(112, 144, 176, 0.18)', '14px 17px 40px 4px rgba(112, 144, 176, 0.06)')

  return (
    <Menu>
      <MenuButton>
        <Flex justifyContent="center">{icon}</Flex>
      </MenuButton>
      <MenuList boxShadow={shadow} p="0px" mt="10px" borderRadius="20px" border="none" overflow="hidden">
        <Flex w="100%" mb="0px">
          <Text ps="20px" pt="16px" pb="10px" w="100%" borderBottom="1px solid" borderColor="gray.400" fontWeight="700">
            {title || route.title}
          </Text>
        </Flex>
        <Flex flexDirection="column">
          {route.pages?.map(p => (
            <MenuItem key={uniqueId()} px={5} py={3} _hover={{ bg: 'yellow.400', color: 'black' }}>
              <NavLink href={p.path}>{p.title}</NavLink>
            </MenuItem>
          ))}

          {custom}
        </Flex>
      </MenuList>
    </Menu>
  )
}
