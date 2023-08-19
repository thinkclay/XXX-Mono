'use client'


// Chakra imports
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import { Image } from 'components/image/Image';
import ChairDef from '/public/img/ecommerce/ChairDef.png';
// Custom components
import Card from 'components/card/Card';

import Delete from 'components/admin/main/ecommerce/settings-product/Delete';
import Details from 'components/admin/main/ecommerce/settings-product/Details';
import Dropzone from 'components/admin/main/ecommerce/settings-product/DropzoneCard';
import Info from 'components/admin/main/ecommerce/settings-product/Info';
import Socials from 'components/admin/main/ecommerce/settings-product/Socials';

export default function Settings() {
  return (
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
          <SimpleGrid
              columns={{ sm: 1, xl: 2 }}
              spacing={{ base: '20px', xl: '20px' }}
          >
              {/* Column Left */}
              <Flex direction="column">
                  <Card mb="20px">
                      <Image
                          borderRadius="20px"
                          h={{ base: 'auto', xl: '396px', '2xl': 'auto' }}
                          src={ChairDef}
                          alt=""
                      />
                  </Card>
                  <Info />
              </Flex>
              {/* Column Right */}
              <Flex direction="column">
                  <Dropzone mb="20px" />
                  <Socials mt="20px" />
              </Flex>
          </SimpleGrid>
          <Details />
          <Delete />
      </Box>
  );
}
