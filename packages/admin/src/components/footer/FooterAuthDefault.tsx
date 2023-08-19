'use client'
/*eslint-disable*/

import { Flex, List, ListItem, Text, useColorModeValue } from '@chakra-ui/react'
import Link from 'components/link/Link'

export default function Footer() {
  let textColor = useColorModeValue('gray.400', 'white')
  let linkColor = useColorModeValue({ base: 'gray.400', lg: 'white' }, 'white')
  return (
    <Flex
      zIndex="3"
      flexDirection={{
        base: 'column',
        lg: 'row',
      }}
      alignItems={{
        base: 'center',
        xl: 'start',
      }}
      justifyContent="space-between"
      px={{ base: '30px', md: '0px' }}
      pb="30px"
    >
      <Text
        color={textColor}
        textAlign={{
          base: 'center',
          xl: 'start',
        }}
        mb={{ base: '20px', lg: '0px' }}
      >
        {' '}
        &copy; {1900 + new Date().getFullYear()}
        <Text as="span" fontWeight="500" ms="4px">
          ReVision. All Rights Reserved. Made with love by
          <Link bg="none" _hover={{ bg: 'none' }} color={textColor} href="https://www.revisioned.org" fontWeight="700">
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
          <Link bg="none" _hover={{ bg: 'none' }} fontWeight="500" color={linkColor} href="mailto:hello@revisioned.org">
            Support
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: '20px',
            md: '44px',
          }}
        >
          <Link bg="none" _hover={{ bg: 'none' }} fontWeight="500" color={linkColor} href="https://www.revisioned.org/licenses">
            License
          </Link>
        </ListItem>
        <ListItem
          me={{
            base: '20px',
            md: '44px',
          }}
        >
          <Link bg="none" _hover={{ bg: 'none' }} fontWeight="500" color={linkColor} href="https://revisioned.org/terms-of-service">
            Terms of Use
          </Link>
        </ListItem>
        <ListItem>
          <Link bg="none" _hover={{ bg: 'none' }} fontWeight="500" color={linkColor} href="https://www.blog.revisioned.org/">
            Blog
          </Link>
        </ListItem>
      </List>
    </Flex>
  )
}
