'use client'
import { useState } from 'react'
import { Text, Icon } from '@chakra-ui/react'
import Calendar from 'react-calendar'
import { Value } from 'react-calendar/dist/cjs/shared/types'
import 'react-calendar/dist/Calendar.css'
// Chakra imports
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
// Custom components
import Card from 'components/card/Card'

export default function MiniCalendar(props: { selectRange: boolean; [x: string]: any }) {
  const { selectRange, ...rest } = props
  const [value, setValue] = useState<Value>(new Date())

  const onChange = (value: Value, event: React.MouseEvent<HTMLButtonElement>) => {
    setValue(value)
  }

  return (
    <Card alignItems="center" flexDirection="column" w="100%" maxW="max-content" p="20px 15px" h="max-content" {...rest}>
      <Calendar
        onChange={onChange}
        value={value}
        selectRange={selectRange}
        view={'month'}
        tileContent={<Text color="brand.500" />}
        prevLabel={<Icon as={MdChevronLeft} w="24px" h="24px" mt="4px" />}
        nextLabel={<Icon as={MdChevronRight} w="24px" h="24px" mt="4px" />}
      />
    </Card>
  )
}
