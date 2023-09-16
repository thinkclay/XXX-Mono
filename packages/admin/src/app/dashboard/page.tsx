'use client'

import { Flex } from '@chakra-ui/react'

import SuggestionsPie from '@common/views/Analytics/SuggestionsPie'

export default function Page() {
  return (
    <Flex direction={{ base: 'column', xl: 'row' }} pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SuggestionsPie />
    </Flex>
  )
}
