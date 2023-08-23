'use client'

import { Button } from '@chakra-ui/react'
import { getTokens } from 'services/clever'

export default function Test() {
  return <Button onClick={() => getTokens()}>Get Tokens</Button>
}
