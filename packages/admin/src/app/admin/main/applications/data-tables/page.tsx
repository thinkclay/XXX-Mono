'use client'


// Chakra imports
import {Box, SimpleGrid} from '@chakra-ui/react';
import ColumnsTable from 'components/admin/main/applications/data-tables/ColumnsTable';
import ComplexTable from 'components/admin/main/applications/data-tables/ComplexTable';
import DevelopmentTable from 'components/admin/main/applications/data-tables/DevelopmentTable';
import tableDataColumns from 'variables/applications/data-tables/tableDataColumns';
import tableDataComplex from 'variables/applications/data-tables/tableDataComplex';
import tableDataDevelopment from 'variables/applications/data-tables/tableDataDevelopment';
import tableDataCheck from 'variables/dashboards/rtl/tableDataCheck';
import CheckTable from "../../../../../components/rtl/dashboard/CheckTable";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        <DevelopmentTable tableData={tableDataDevelopment} />
        <CheckTable tableData={tableDataCheck} />
        <ColumnsTable tableData={tableDataColumns} />
        <ComplexTable tableData={tableDataComplex} />
      </SimpleGrid>
    </Box>
  );
}
