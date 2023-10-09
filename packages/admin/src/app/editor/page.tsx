'use client'

import { StrictMode } from 'react'
import dynamic from 'next/dynamic'
import { RecoilRoot } from 'recoil'
import { Box, Flex, Heading, SimpleGrid, Text, Stack, Image, Button, useColorModeValue } from '@chakra-ui/react'

import Container from 'components/ui/Container'

const DynamicEditor = dynamic(() => import('@common/views/App'), {
  ssr: false,
})

export default function Home() {
  return (
    <Container>
      <Box boxShadow="0 0 80px rgba(0, 0, 0, 0.2)" mt={20} position="relative" overflow="hidden" h="90vh" w="100%" zIndex="200">
        <DynamicEditor mode="browser" />
      </Box>
    </Container>
  )
}
