import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react'
import Container from './Container'

interface Props extends BoxProps {
  gradientHeight?: string
}

export default function HeroCapped({ children, gradientHeight, bgGradient, ...rest }: Props) {
  const gradient =
    !bgGradient && gradientHeight
      ? useColorModeValue(
          `linear(to-b, brandOrange.0 0%, brandOrange.500 ${gradientHeight}, neutral.100 ${gradientHeight}, neutral.100 100%)`,
          `linear(to-b, neutral.900 0%, black ${gradientHeight}, neutral.800 ${gradientHeight}, neutral.800 100%)`
        )
      : useColorModeValue('linear(to-b, brandOrange.0, brandOrange.500)', 'linear(to-b, neutral.900, black)')

  return (
    <Box {...rest} py={{ base: '80px', lg: '140px' }} bgGradient={bgGradient || gradient}>
      <Container justifyContent="center">{children}</Container>
    </Box>
  )
}
