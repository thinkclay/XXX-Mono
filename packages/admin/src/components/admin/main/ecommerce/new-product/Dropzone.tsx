'use client'
// Chakra imports
import { Button, Flex, useColorModeValue } from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
// Assets

function Dropzone(props: { content: JSX.Element | string; [x: string]: any }) {
  const { content, ...rest } = props
  const { getRootProps, getInputProps } = useDropzone()
  const bg = useColorModeValue('neutral.100', 'navy.700')
  const borderColor = useColorModeValue('neutral.300', 'whiteAlpha.100')
  return (
    <>
      <Flex
        align="center"
        justify="center"
        bg={bg}
        border="1px dashed"
        borderColor={borderColor}
        borderRadius="16px"
        w="100%"
        maxW="100%"
        h="max-content"
        minH="130px"
        cursor="pointer"
        {...getRootProps({ className: 'dropzone' })}
        pt="80px !important"
        pb="105px !important"
        {...rest}
      >
        <input {...getInputProps()} />
        <Button variant="no-effects">{content}</Button>
      </Flex>
    </>
  )
}

export default Dropzone
