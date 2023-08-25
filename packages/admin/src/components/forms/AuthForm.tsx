import { ReactNode } from 'react'
import { Card, Flex, Text, Heading } from '@chakra-ui/react'

interface Props {
  children: ReactNode
  heading?: ReactNode
  description?: ReactNode
}

export default function AuthForm({ children, heading, description }: Props) {
  function renderHeading() {
    if (!heading) return null

    return (
      <Heading fontSize="36px" mb="10px">
        {heading}
      </Heading>
    )
  }

  function renderDescription() {
    if (!description) return null

    return (
      <Text pb={8} fontWeight="400" fontSize="md" maxW="420px">
        {description}
      </Text>
    )
  }

  return (
    <Card
      boxShadow="0 0 40px rgba(0, 0, 0, 0.2)"
      w={{ base: '100%', md: 'max-content' }}
      h="max-content"
      mx="auto"
      maxW="100%"
      p={{ base: '10px', md: '50px' }}
    >
      <Flex
        zIndex="2"
        direction="column"
        w={{ base: '100%', md: '420px' }}
        maxW="100%"
        background="transparent"
        borderRadius="15px"
        mx={{ base: 'auto', lg: 'unset' }}
        me="auto"
        mb={{ base: '20px', md: 'auto' }}
      >
        {renderHeading()}
        {renderDescription()}

        {children}
      </Flex>
    </Card>
  )
}
