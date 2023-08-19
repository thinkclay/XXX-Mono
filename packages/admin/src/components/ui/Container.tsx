import { ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'

interface Props {
  children: ReactNode
}

export default function Container({ children }: Props) {
  return (
    <Flex
      as="section"
      alignSelf="center"
      flexFlow="row wrap"
      justifySelf="center"
      margin="0 auto"
      alignContent="center"
      maxW="container.xl"
      w="100%"
    >
      {children}
    </Flex>
  )
}
