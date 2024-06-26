'use client'

import { Box, Flex, FormLabel, Grid, Icon, Select, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react'
import { collection, orderBy, query } from 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'

import { Image } from 'components/images/Image'
import MiniStatistics from 'components/card/MiniStatistics'
import IconBox from 'components/icons/IconBox'
import Conversion from 'components/admin/main/users/users-reports/Conversion'
import UserActivity from 'components/admin/main/users/users-reports/UserActivity'
import UsersTable from 'components/ui/UsersTable'

import FakeLineGraph from '/public/img/users/FakeLineGraph.png'
import Usa from '/public/img/users/usa.png'
import { NextAvatar } from 'components/images/Avatar'
import { MdPerson, MdThumbUp } from 'react-icons/md'

export default function UserReports() {
  const firestore = useFirestore()
  const usersCollection = collection(firestore, 'users')
  const usersQuery = query(usersCollection, orderBy('email', 'asc'))
  const { data: users, status } = useFirestoreCollectionData(usersQuery)

  console.log('Users', users)

  const textColorSecondary = 'secondaryGray.600'
  const brandColor = useColorModeValue('brand.500', 'white')
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100')

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="20px" mb="20px">
        <MiniStatistics
          startContent={<IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={MdPerson} color={brandColor} />} />}
          name="Total Users"
          value={status === 'success' ? users.length : 'N/A'}
        />
        <MiniStatistics
          endContent={
            <Text
              color={textColorSecondary}
              fontWeight="500"
              fontSize={{
                base: 'xs',
              }}
              me="10px"
              mt="4px"
            >
              6 May - 7 May
            </Text>
          }
          name="Click Events"
          value="1753"
        />
        <MiniStatistics
          endContent={
            <Flex me="-16px">
              <FormLabel htmlFor="location">
                <NextAvatar src={Usa} />
              </FormLabel>
              <Select id="location" variant="mini" mt="5px" me="0px" defaultValue="usa">
                <option value="usa">USA</option>
                <option value="uk">UK</option>
                <option value="fra">FRA</option>
              </Select>
            </Flex>
          }
          name="Location"
          value="USA"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
              icon={<Icon w="28px" h="28px" as={MdThumbUp} color="white" />}
            />
          }
          endContent={<Image src={FakeLineGraph} alt="" />}
          name="Likes"
          value="154"
        />
      </SimpleGrid>
      <Grid
        w="100%"
        display={{ base: 'flex', md: 'grid' }}
        flexDirection={{ base: 'column', md: 'unset' }}
        templateColumns={{ md: '1fr 2.6fr' }}
        templateRows={{ base: 'repeat(2, 1fr)', md: '1fr' }}
      >
        <Box me={{ base: '0px', md: '20px' }} mb={{ base: '20px', md: '0px' }} gridArea="1 / 1 / 2 / 2">
          <Conversion mb="20px" />
          <UserActivity />
        </Box>
        <UsersTable />
      </Grid>
    </Box>
  )
}
