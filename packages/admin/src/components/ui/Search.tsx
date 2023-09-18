'use client'

import { useState, useEffect, SyntheticEvent } from 'react'
import { SearchIcon } from '@chakra-ui/icons'
import { InputGroup, InputLeftElement, IconButton, Input } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'

interface Props {
  className?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  debounce?: number
}

export default function Search({ value: initialValue, onChange, debounce = 500 }: Props) {
  const [value, setValue] = useState(initialValue)

  const searchIconColor = useColorModeValue('neutral.700', 'neutral.100')
  const inputBg = useColorModeValue('neutral.200', 'gray.900')
  const inputText = useColorModeValue('neutral.700', 'neutral.100')

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <InputGroup w={{ base: '100%', md: '200px' }}>
      <InputLeftElement>
        <IconButton
          aria-label="search"
          bg="inherit"
          borderRadius="30px"
          _active={{
            bg: 'inherit',
            transform: 'none',
            borderColor: 'transparent',
          }}
          _focus={{
            boxShadow: 'none',
          }}
          icon={<SearchIcon color={searchIconColor} w="15px" h="15px" />}
        />
      </InputLeftElement>

      <Input
        variant="search"
        fontSize="sm"
        bg={inputBg}
        color={inputText}
        fontWeight="500"
        _placeholder={{ color: inputText }}
        borderRadius="30px"
        placeholder="Search..."
        onChange={e => setValue(e.currentTarget.value)}
        value={value}
      />
    </InputGroup>
  )
}
