'use client'

import { StrictMode } from 'react'
import dynamic from 'next/dynamic'
import { RecoilRoot } from 'recoil'
import { Box, Flex, Heading, SimpleGrid, Text, Stack, Image, Button, useColorModeValue } from '@chakra-ui/react'

import Container from 'components/ui/Container'
import Subtitle from 'components/ui/Subtitle'
import YouTubePlayer from 'components/ui/YoutubePlayer'
import HeroCapped from 'components/ui/HeroCapped'

const DynamicEditor = dynamic(() => import('@common/views/App'), {
  ssr: false,
})

const content = `
<p>Hey John,</p>

<p>I wanted to add some context to your son, Johnny's, progress report. He's really been excelling in math and science, like the other boys in my class. However, he's very disruptive during art and reading sessions. I really needed to talk to you and was disappointed you couldn't attend the parent-teacher conference. I think Johnny might be presenting signs of A.D.H.D. as he struggles with activities that require lots of focus.</p>

<p>I need to meet with you as soon as possible to discuss an action plan. If he continues to disrupt or be aggressive with me I may have to discuss this matter with the Principal and come up with remediation which may involve either placing him in a specialized classroom for neural-divergent students or disciplinary action.</p>
`

export default function Home() {
  const ctaHeadingColor = useColorModeValue('whiteAlpha.900', 'brand.400')
  const textColor = useColorModeValue('neutral.900', 'neutral.50')
  const backgroundColor = useColorModeValue('neutral.50', 'gray.700')

  return (
    <Box background={backgroundColor}>
      <HeroCapped>
        <Stack direction={{ base: 'column', lg: 'row' }} spacing={20}>
          <Flex flexDirection="column" justifyContent="center" minWidth="300px" flex="1">
            <Heading as="h1" color={ctaHeadingColor} fontWeight="500" size={{ base: 'lg', lg: 'xl' }}>
              Educators work hard.
              <br />
              ReVision lightens the load.
            </Heading>
            <Text paddingTop="6" fontSize={{ base: 'lg', lg: '2xl' }}>
              ReVision helps teachers write better, more clear, fair reports, so that we can get back to the magic of teaching.
            </Text>
          </Flex>

          <Box borderRadius="20px" boxShadow="0 0 80px rgba(0, 0, 0, 0.2)" flex="1" overflow="hidden">
            <RecoilRoot>
              <StrictMode>
                <DynamicEditor mode="embedded" />
              </StrictMode>
            </RecoilRoot>
          </Box>
        </Stack>
      </HeroCapped>

      <Container>
        <Stack alignItems="center" flexFlow="row wrap" py={{ base: '80px', lg: '140px' }} spacing={20}>
          <Box ml={{ base: 0, xl: '-100px' }} maxW="400px">
            <Image
              background="#FFFDF6"
              src="/images/screen-flagging.png"
              alt="Screenshot of bias flagging software"
              boxShadow="0 0 40px rgba(0, 0, 0, 0.1)"
              borderRadius={20}
              objectFit="contain"
            />
          </Box>
          <Box flex="1" minW="300px">
            <Heading as="h2" pb={4} size={{ base: 'md', lg: 'xl' }}>
              ReVision highlights words and phrases that need more clarity, in real-time.
            </Heading>
            <Text fontSize="xl">
              Educators want to write clearly and fairly, but don’t want to spend their time mired in administrative tasks. ReVision make it
              quick and easy to write high-quality reports, IEPs, and family communications, while showing you your progress over time.
              Administrators track trends across their schools, using data to drive decisions in order to better support their teachers.
            </Text>
          </Box>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} py={20}>
          <Box background="neutral.200" borderRadius={20} padding={8}>
            <Heading color="neutral.900" fontWeight="400" size={{ base: 'md', lg: 'lg' }} pb={4}>
              Communicate Effectively
            </Heading>
            <Text fontSize="xl" color="blackAlpha.800" fontWeight="400">
              Make sure your language and tone are saying what you mean to say. Be clear, fair, and transparent in your communication.
            </Text>
          </Box>
          <Box background="neutral.200" borderRadius={20} padding={8}>
            <Heading color="neutral.900" fontWeight="400" size={{ base: 'md', lg: 'lg' }} pb={4}>
              Protect &amp; Support
            </Heading>
            <Text fontSize="xl" color="blackAlpha.800" fontWeight="400">
              Protect yourself from unintended harm, and help your school demonstrate transparency. Support families and students through
              clear, actionable communication.
            </Text>
          </Box>
          <Box background="neutral.200" borderRadius={20} padding={8}>
            <Heading color="neutral.900" fontWeight="400" size={{ base: 'md', lg: 'lg' }} pb={4}>
              Use Evidence to Drive Decisions
            </Heading>
            <Text fontSize="xl" color="blackAlpha.800" fontWeight="400">
              See your own improvements over time, and track organizational trends using aggregate data. Use this data to drive decisions on
              how to improve your support to teachers.
            </Text>
          </Box>
          <Box background="neutral.200" borderRadius={20} padding={8}>
            <Heading color="neutral.900" fontWeight="400" size={{ base: 'md', lg: 'lg' }} pb={4}>
              Quantify your Impact
            </Heading>
            <Text fontSize="xl" color="blackAlpha.800" fontWeight="400">
              The impact of professional development can be nebulous; with anonymized, custom analytics, ReVision provides a window into PD
              outcomes that can support reporting and fundraising.
            </Text>
          </Box>
        </SimpleGrid>

        <Stack alignItems="center" flexFlow="row wrap" py={{ base: '80px', lg: '140px' }} spacing={20}>
          <Box ml={{ base: 0, xl: '-100px' }} maxW="400px">
            <Image
              background="#FFFDF6"
              src="/images/screen-revision.png"
              alt="Screenshot of bias rewrite software"
              boxShadow="0 0 40px rgba(0, 0, 0, 0.1)"
              borderRadius={20}
              objectFit="contain"
            />
          </Box>
          <Box flex="1" minW="300px">
            <Subtitle>THE POWER OF A.I.</Subtitle>
            <Heading as="h2" color={textColor} pb={4}>
              Improving self-awareness
            </Heading>
            <Text fontSize="xl">
              Our flagship application offers grammar correction, tone recommendation, and bias detection. In complement to our
              applications, our team provides tailored support to make sure you get the most out of the data and its implications.
            </Text>
          </Box>
        </Stack>
      </Container>

      {/* <HeroCapped>
        <Stack alignItems="center" direction={{ base: 'column', lg: 'row' }} spacing={20}>
          <YouTubePlayer videoId="PVyWSSYedhk" />
          <Box>
            <Heading as="h2" color={ctaHeadingColor} fontWeight="600" size={{ base: 'lg', lg: 'xl' }}>
              Be the change
            </Heading>
            <Text fontSize="2xl" paddingTop="4">
              <strong>We are in this together.</strong> Correcting bias isn't about policing conversations. It's all about awareness and
              gentle nudges to improve the way we communicate and understand ourselves.
            </Text>
            <Button size="lg" fontSize={25} minW="300px" px={10} py={8} mt={8}>
              Get the App
            </Button>
          </Box>
        </Stack>
      </HeroCapped> */}

      <Container py={{ base: '80px', lg: '140px' }}>
        <Heading as="h2">What our partners think:</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12} py={10}>
          <Flex background="neutral.200" borderRadius={20} direction="column" padding={8} justifyContent="center">
            <Text fontSize="lg" fontStyle="italic" color="blackAlpha.800" fontWeight="400">
              <q>
                Our schools are starving for real-time data. Right now we can see which students are underperforming, but we need more...we
                need the tools to help teachers reflect on their own biases, so that we can see real change. ReVision is that tool.
              </q>
            </Text>
            <Text fontWeight="400" pt={4} color="blackAlpha.900">
              Dara J. - <strong>District Administrator</strong>
            </Text>
          </Flex>
          <Flex background="neutral.200" borderRadius={20} direction="column" padding={8} justifyContent="center">
            <Text fontSize="lg" fontStyle="italic" color="blackAlpha.800" fontWeight="400">
              <q>
                At Soter we see the potential that ReVision has to protect teachers and students, and we're exploring the best options for
                partnerships.
              </q>
            </Text>
            <Text fontWeight="400" pt={4} color="blackAlpha.900">
              Derek Peterson - <strong>CEO Soter Technologies</strong>
            </Text>
          </Flex>
          <Flex background="neutral.200" borderRadius={20} direction="column" padding={8} justifyContent="center">
            <Text fontSize="lg" fontStyle="italic" color="blackAlpha.800" fontWeight="400">
              <q>
                Right now, we don't have a way to track whether our work on bias has shifted our practice. ReVision fills two crucial gaps
                in the effort to end bias in education: 1) real-time feedback to educators about what we say and how we say it; and 2)
                aggregate data to understand the gaps between our aspirations and practice.
              </q>
            </Text>
            <Text fontWeight="400" pt={4} color="blackAlpha.900">
              Josh Thomases - <strong>CEO IPSquared</strong>
            </Text>
          </Flex>
          <Flex background="neutral.200" borderRadius={20} direction="column" padding={8} justifyContent="center">
            <Text fontSize="lg" fontStyle="italic" color="blackAlpha.800" fontWeight="400">
              <q>
                ReVision is a great tool for detecting implicit bias in our correspondence to colleagues, parents and students. The power of
                the tool lies in its ability to identify patterns of biases that undergird our language, and aggregate them in ways that
                allows for deeper exploration of potentially racist belief systems within us, in the privacy of our reflections.
              </q>
            </Text>
            <Text fontWeight="400" pt={4} color="blackAlpha.900">
              Hector Calderon - <strong>DEI Leader</strong>
            </Text>
          </Flex>
        </SimpleGrid>
      </Container>
    </Box>
  )
}
