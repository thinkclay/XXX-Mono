'use client'


// Chakra imports
import { AspectRatio, Box, Grid } from '@chakra-ui/react';

// Custom components
import CourseInfo from 'components/admin/main/account/course-page/CourseInfo';
import Completion from 'components/admin/main/account/course-page/Completion';
// Assets
export default function CoursePage() {
  // Chakra Color Mode
  return (
      <Box maxW="100%">
          <Grid
              maxW="100%"
              display={{ base: 'block', lg: 'grid' }}
              pt={{ base: '130px', md: '80px', xl: '80px' }}
              gridTemplateColumns="2.95fr 1fr"
          >
              <Box
                  gridArea="1 / 1 / 2 / 2"
                  me={{ lg: '20px' }}
                  mb={{ base: '20px', lg: '0px' }}
              >
                  <AspectRatio w="100%" maxW="100%" ratio={1130 / 636}>
                      <iframe
                          style={{ borderRadius: '30px' }}
                          src="https://www.youtube.com/embed/geyVktOxBJk"
                          title="YouTube video player"
                          frame-border="0"
                          allow="accelerometer; clipboard-write; encrypted-media; gyroscope;"
                      />
                  </AspectRatio>
                  <CourseInfo />
              </Box>
              <Box gridArea="1 / 2 / 2 / 3">
                  <Completion />
              </Box>
          </Grid>
      </Box>
  );
}
