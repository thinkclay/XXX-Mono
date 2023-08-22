'use client'
/*eslint-disable*/

import { Flex, List, ListItem, Text, useColorModeValue } from '@chakra-ui/react'
import Link from 'components/link/Link'

export default function PublicFooter() {
  const textColor = useColorModeValue('neutral.400', 'white')
  return (
    <Flex
      w={{ base: '100%', xl: '1170px' }}
      maxW={{ base: '90%', xl: '1170px' }}
      zIndex="1.5"
      flexDirection={{
        base: 'column',
        xl: 'row',
      }}
      alignItems={{
        base: 'center',
        xl: 'start',
      }}
      justifyContent="space-between"
      px={{ base: '0px', xl: '0px' }}
      pb="30px"
      mx="auto"
    >
      <Text
        color={textColor}
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
          <Link mx="3px" color={textColor} href="https://unicorn.love" fontWeight="700">
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
          <Link fontWeight="500" color={textColor} href="mailto:hello@revisioned.org">
            Support
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: '20px',
            md: '44px',
          }}
        >
          <Link fontWeight="500" color={textColor} href="https://www.revisioned.org/licenses">
            License
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: '20px',
            md: '44px',
          }}
        >
          <Link fontWeight="500" color={textColor} href="https://revisioned.org/terms-of-service">
            Terms of Use
          </Link>
        </ListItem>
        <ListItem>
          <Link fontWeight="500" color={textColor} href="https://www.blog.revisioned.org/">
            Blog
          </Link>
        </ListItem>
      </List>
    </Flex>
  )
}
