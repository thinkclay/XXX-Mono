// chakra imports
import { Avatar, Box, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react'

import Links from 'components/sidebar/components/Links'
import SidebarCard from 'components/sidebar/components/SidebarCard'
import avatar4 from '/public/img/avatars/avatar4.png'
import { IRoute } from 'types/navigation'

// FUNCTIONS

function SidebarContent(props: { routes: IRoute[]; hovered?: boolean; mini?: boolean }) {
  const { routes, mini, hovered } = props
  const textColor = useColorModeValue('navy.700', 'white')
  // SIDEBAR
  return (
    <Flex direction="column" height="100%" borderRadius="30px">
      <Stack direction="column" mb="auto" mt="8px">
        <Box
          ps={mini === false ? '20px' : mini === true && hovered === true ? '20px' : '16px'}
          pe={{ md: '16px', '2xl': '1px' }}
          ms={mini && hovered === false ? '-16px' : 'unset'}
        >
          <Links mini={mini} hovered={hovered} routes={routes} />
        </Box>
      </Stack>

      <Box ps="20px" pe={{ md: '16px', '2xl': '0px' }} mt="60px" borderRadius="30px">
        <SidebarCard mini={mini} hovered={hovered} />
      </Box>
      <Flex mt="75px" mb="56px" justifyContent="center" alignItems="center">
        <Avatar h="48px" w="48px" src={avatar4.src} me={mini === false ? '20px' : mini === true && hovered === true ? '20px' : '0px'} />
        <Box display={mini === false ? 'block' : mini === true && hovered === true ? 'block' : 'none'}>
          <Text color={textColor} fontSize="md" fontWeight="700">
            Adela Parkson
          </Text>
          <Text color="secondaryGray.600" fontSize="sm" fontWeight="400">
            Product Designer
          </Text>
        </Box>
      </Flex>
    </Flex>
  )
}

export default SidebarContent
