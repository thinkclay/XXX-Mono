'use client'

import { Box, Flex, List, ListItem, Text, useColorModeValue } from '@chakra-ui/react'
import Link from 'components/link/Link'

export default function PublicFooter() {
  const backgroundColor = useColorModeValue('neutral.200', 'gray.800')

  return (
    <Box background={backgroundColor}>
      <Flex
        w="100%"
        flexDirection={{
          base: 'column',
          lg: 'row',
        }}
        alignItems={{
          base: 'center',
          xl: 'start',
        }}
        justifyContent="space-between"
        py="30px"
        px={8}
        mx="auto"
      >
        <Text
          textAlign={{
            base: 'center',
            xl: 'start',
          }}
          mb={{ base: '20px', xl: '0px' }}
        >
          {' '}
          &copy; {1900 + new Date().getFullYear()}
          <Text as="span" fontWeight="500" ms="4px">
            ReVision. All Rights Reserved. Made with love by
            <Link mx="3px" href="https://unicorn.love" fontWeight="700">
              🦄 Unicorn
            </Link>
          </Text>
        </Text>
        <List display="flex">
          <ListItem
            me={{
              base: '20px',
              md: '44px',
            }}
          >
            <Link fontWeight="500" href="mailto:hello@revisioned.org">
              Support
            </Link>
          </ListItem>
          <ListItem
            me={{
              base: '20px',
              md: '44px',
            }}
          >
            <Link fontWeight="500" href="/terms">
              Terms
            </Link>
          </ListItem>
        </List>
      </Flex>
    </Box>
  )
}
