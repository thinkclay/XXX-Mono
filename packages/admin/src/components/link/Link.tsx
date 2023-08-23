'use client'
import { Button, ButtonProps } from '@chakra-ui/react'
import NextLink, { LinkProps } from 'next/link'

type Props = ButtonProps & LinkProps

function Link({ href, children, ...props }: Props) {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <Button bg="none" _hover={{ bg: 'none' }} textAlign="start" maxW="max-content" mx="unset" as="a" px="0px" h="max-content" {...props}>
        {children}
      </Button>
    </NextLink>
  )
}

export default Link
