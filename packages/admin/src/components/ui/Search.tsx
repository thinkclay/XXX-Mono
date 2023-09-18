'use client'

import { useState, useEffect } from 'react'
import { Input } from '@chakra-ui/react'
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
    <Input
      fontSize="sm"
      bg={inputBg}
      color={inputText}
      fontWeight="500"
      _placeholder={{ color: inputText }}
      borderRadius="30px"
      placeholder="Search..."
      onChange={e => setValue(e.currentTarget.value)}
      w="50%"
      value={value}
    />
  )
}
