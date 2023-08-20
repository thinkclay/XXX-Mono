import { Text, TextProps } from '@chakra-ui/react'

export default function Subtitle(props: TextProps) {
  return (
    <Text size="sm" letterSpacing="2px" color="brandOrange.400" fontWeight="600" pb={3} {...props}>
      {props.children}
    </Text>
  )
}
