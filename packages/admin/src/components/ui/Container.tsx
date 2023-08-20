import { Flex, FlexProps } from '@chakra-ui/react'

export default function Container(props: FlexProps) {
  return (
    <Flex
      as="section"
      alignContent="center"
      alignSelf="center"
      flexFlow="row wrap"
      justifyContent="space-between"
      justifySelf="center"
      margin="0 auto"
      maxW="container.xl"
      position="relative"
      px={{ base: 8, lg: 12 }}
      w="100%"
      {...props}
    >
      {props.children}
    </Flex>
  )
}
