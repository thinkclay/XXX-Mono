'use client'

// Chakra imports
import { Box, Grid, useColorModeValue } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import OrderStatus from 'components/admin/main/ecommerce/order-details/OrderStatus'
import Receipt from 'components/admin/main/ecommerce/order-details/Receipt'
import Details from 'components/admin/main/ecommerce/order-details/Details'

export default function Invoice() {
  const textColor = useColorModeValue('neutral.700', 'white')
  const bgButton = 'rgba(255,255,255,0.12)'
  const bgHover = { bg: 'whiteAlpha.50' }
  const bgFocus = { bg: 'rgba(255,255,255,0.12)' }

  const componentRef = useRef(null)

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  return (
    <Box>
      <Grid
        mb="20px"
        templateColumns={{ base: '2.4fr 1fr', lg: '2.4fr 1fr' }}
        flexDirection="column"
        pt={{ base: '130px', md: '80px', xl: '80px' }}
      >
        <Receipt
          me="20px"
          gridArea={{ base: '1 / 1 / 2 / 3', lg: '1 / 1 / 2 / 2' }}
          ref={componentRef}
          handlePrint={handlePrint}
          textColor={textColor}
          bgButton={bgButton}
          bgHover={bgHover}
          bgFocus={bgFocus}
        />
        <OrderStatus
          ms={{ base: '0px', lg: '20px' }}
          mt={{ base: '20px', lg: '0px' }}
          zIndex="0"
          gridArea={{ base: '2 / 1 / 3 / 3', lg: '1 / 2 / 2 / 3' }}
        />
      </Grid>
      <Details />
    </Box>
  )
}
