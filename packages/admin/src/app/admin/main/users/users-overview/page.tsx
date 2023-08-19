'use client'


// Chakra imports
import { Flex } from '@chakra-ui/react';
import Card from 'components/card/Card';

import SearchTableUsers from 'components/admin/main/users/users-overview/SearchTableUsersOverivew';
import tableDataUsersOverview from 'variables/users/users-overview/tableDataUsersOverview';

export default function UsersOverview() {
  return (
    <Flex direction="column" pt={{ sm: '125px', lg: '75px' }}>
      <Card px="0px">
        <SearchTableUsers tableData={tableDataUsersOverview} />
      </Card>
    </Flex>
  );
}
