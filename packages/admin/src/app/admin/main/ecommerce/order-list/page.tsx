'use client'


// Chakra imports
import {Flex} from '@chakra-ui/react';
import Card from 'components/card/Card';

import SearchTableOrders from 'components/admin/main/ecommerce/order-list/SearchTableOrders';
import tableDataOrders from 'variables/ecommerce/order-list/tableDataOrders';

export default function SearchUser() {
  return (
    <Flex direction="column" pt={{ sm: '125px', lg: '75px' }}>
      <Card px="0px">
        <SearchTableOrders tableData={tableDataOrders} />
      </Card>
    </Flex>
  );
}
