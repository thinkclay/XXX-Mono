'use client'
// Chakra imports
import { Flex, Text, useColorModeValue } from '@chakra-ui/react'
import profileAvatar from '/public/img/avatars/avatar4.png'
import Card from 'components/card/Card'
import { NextAvatar } from 'components/images/Avatar'

export default function Profile(props: { [x: string]: any }) {
  const { ...rest } = props
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white')
  const textColorSecondary = 'neutral.400'
  // Chakra Color Mode
  return (
    <Card mb="20px" {...rest}>
      <Flex align="center">
        <NextAvatar src={profileAvatar} h="87px" w="87px" me="20px" />
        <Flex direction="column">
          <Text color={textColorPrimary} fontWeight="bold" fontSize="2xl">
            Adela Parkson
          </Text>
          <Text mt="1px" color={textColorSecondary} fontSize="md">
            adela@revisioned.org
          </Text>
        </Flex>
      </Flex>
    </Card>
  )
}
