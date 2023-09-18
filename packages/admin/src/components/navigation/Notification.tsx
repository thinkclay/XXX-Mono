'use client'

import { PiNewspaperDuotone, PiAppStoreLogoDuotone } from 'react-icons/pi'
import { Icon, Flex, Text, useColorModeValue } from '@chakra-ui/react'

interface Props {
  title: string
  description: string
  icon: 'news' | 'app'
}

export default function ItemContent({ title, description, icon }: Props) {
  const getIcon = () => {
    switch (icon) {
      case 'news':
        return PiNewspaperDuotone
      case 'app':
        return PiAppStoreLogoDuotone
    }
  }

  return (
    <Flex flexDir="row" alignItems="center" mt="2">
      <Icon as={getIcon()} color="brand.500" bg="neutral.200" borderRadius="5" p="2" w="60px" h="60px" mr="5" />
      <Flex flexDirection="column">
        <Text mb="5px" fontWeight="bold" fontSize="md">
          {title}
        </Text>
        <Text fontSize="sm" lineHeight="140%" maxW="350">
          {description}
        </Text>
      </Flex>
    </Flex>
  )
}
