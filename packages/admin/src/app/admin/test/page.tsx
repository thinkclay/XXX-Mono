'use client'

import { Button } from '@chakra-ui/react'
import { getMe } from 'services/clever'

export default function Test() {
  return <Button onClick={() => getMe()}>Get Tokens</Button>
}
