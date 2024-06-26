'use client'
// Chakra imports
import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { Image } from 'components/images/Image'
// Custom components
import Card from 'components/card/Card'

import Plan from '/public/img/dashboards/Blueprint.png'

export default function CircularProgress() {
  // Chakra Color Mode
  const textColor = useColorModeValue('secondaryGray.900', 'white')
  return (
    <Card p="26px">
      <Text fontSize="lg" mb="24px" color={textColor} fontWeight="bold">
        House Plan
      </Text>
      <Image w={'100%'} h={'100%'} mx="auto" src={Plan} mb="40px" alt="" />
      <Flex>
        <Box>
          <Text fontSize="sm" color="secondaryGray.600" fontWeight="500">
            First Floor
          </Text>
          <Text fontSize="sm" color={textColor} fontWeight="bold">
            22 Seaview, 2073sq ft
          </Text>
        </Box>
        <Button fontSize="sm" ms="auto" variant="darkBrand">
          See all plans
        </Button>
      </Flex>
    </Card>
  )
}
