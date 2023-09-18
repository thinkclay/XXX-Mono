'use client'

import { Card, Flex } from '@chakra-ui/react'

import SuggestionsPie from '@common/views/Analytics/SuggestionsPie'
import UsersTable from 'components/ui/UsersTable'

export default function Page() {
  return (
    <>
      <Flex direction={{ base: 'column', xl: 'row' }} p="20px">
        <UsersTable />
        <Card mx="20px" px="20px">
          <SuggestionsPie />
        </Card>
      </Flex>
    </>
  )
}
