// Chakra Imports
import {
  Button,
  Badge,
  Box,
  Flex,
  Icon,
  Text,
  Image,
  useColorModeValue,
  useColorMode,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
  SimpleGrid,
} from '@chakra-ui/react'
import { useEffect, useState, useContext } from 'react'
import { MdSettings, MdFullscreen, MdOutlineFullscreenExit, MdRefresh } from 'react-icons/md'

import { ConfiguratorContext } from 'contexts/ConfiguratorContext'
import Light from '/public/img/layout/Light.png'
import Dark from '/public/img/layout/Dark.png'
import ContrastBlock from '/public/img/layout/ContrastBlock.png'
import ContrastBlockDark from '/public/img/layout/ContrastBlockDark.png'
import Contrast from '/public/img/layout/Contrast.png'
import ContrastDark from '/public/img/layout/ContrastDark.png'
import DefaultSidebar from '/public/img/layout/DefaultSidebar.png'
import DefaultSidebarDark from '/public/img/layout/DefaultSidebarDark.png'
import MiniSidebar from '/public/img/layout/MiniSidebar.png'
import MiniSidebarDark from '/public/img/layout/MiniSidebarDark.png'
import ConfiguratorLogo from '/public/img/layout/ConfiguratorLogo.png'
import ConfiguratorRadio from './ConfiguratorRadio'
import { HSeparator } from 'components/separator/Separator'

export default function HeaderLinks() {
  const context = useContext(ConfiguratorContext)
  const { theme, setTheme, mini, setMini, contrast, setContrast } = context
  //eslint-disable-next-line
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [active, setActive] = useState('Purple')
  // Chakra Color Mode
  const resetTheme = () => {
    const newTheme = {
      ...theme,
      colors: {
        ...theme?.colors,
        brand: {
          50: '#EFEBFF',
          100: '#E9E3FF',
          200: '#422AFB',
          300: '#422AFB',
          400: '#7551FF',
          500: '#422AFB',
          600: '#3311DB',
          700: '#02044A',
          800: '#190793',
          900: '#11047A',
        },
        brandScheme: {
          50: '#EFEBFF',
          100: '#E9E3FF',
          200: '#7551FF',
          300: '#7551FF',
          400: '#7551FF',
          500: '#422AFB',
          600: '#3311DB',
          700: '#02044A',
          800: '#190793',
          900: '#02044A',
        },
        brandTabs: {
          50: '#EFEBFF',
          100: '#E9E3FF',
          200: '#422AFB',
          300: '#422AFB',
          400: '#422AFB',
          500: '#422AFB',
          600: '#3311DB',
          700: '#02044A',
          800: '#190793',
          900: '#02044A',
        },
        background: {
          100: '#FFFFFF',
          900: '#0b1437',
        },
      },
    }

    setTheme && setTheme(newTheme)
  }
  const changeThemeGreen = () => {
    const newTheme = {
      ...theme,
      colors: {
        ...theme?.colors,
        brand: {
          50: '#E1FFF4',
          100: '#BDFFE7',
          200: '#7BFECE',
          300: '#39FEB6',
          400: '#01F99E',
          500: '#01B574',
          600: '#01935D',
          700: '#016B44',
          800: '#00472D',
          900: '#002417',
        },
        brandScheme: {
          50: '#E1FFF4',
          100: '#BDFFE7',
          200: '#7BFECE',
          300: '#39FEB6',
          400: '#01F99E',
          500: '#01B574',
          600: '#01935D',
          700: '#016B44',
          800: '#00472D',
          900: '#002417',
        },
        brandTabs: {
          50: '#E1FFF4',
          100: '#BDFFE7',
          200: '#7BFECE',
          300: '#39FEB6',
          400: '#01F99E',
          500: '#01B574',
          600: '#01935D',
          700: '#016B44',
          800: '#00472D',
          900: '#002417',
        },
      },
    }

    setTheme && setTheme(newTheme)
  }
  const changeThemeOrange = () => {
    const newTheme = {
      ...theme,
      colors: {
        ...theme?.colors,
        brand: {
          50: '#FFF7EB',
          100: '#FFF1DB',
          200: '#FFE2B8',
          300: '#FFD28F',
          400: '#FFC46B',
          500: '#FFB547',
          600: '#FF9B05',
          700: '#C27400',
          800: '#855000',
          900: '#422800',
          950: '#1F1200',
        },
        brandScheme: {
          50: '#FFF7EB',
          100: '#FFF1DB',
          200: '#FFE2B8',
          300: '#FFD28F',
          400: '#FFC46B',
          500: '#FFB547',
          600: '#FF9B05',
          700: '#C27400',
          800: '#855000',
          900: '#422800',
          950: '#1F1200',
        },
        brandTabs: {
          50: '#FFF7EB',
          100: '#FFF1DB',
          200: '#FFE2B8',
          300: '#FFD28F',
          400: '#FFC46B',
          500: '#FFB547',
          600: '#FF9B05',
          700: '#C27400',
          800: '#855000',
          900: '#422800',
          950: '#1F1200',
        },
      },
    }

    setTheme && setTheme(newTheme)
  }
  const changeThemeRed = () => {
    const newTheme = {
      ...theme,
      colors: {
        ...theme?.colors,
        brand: {
          50: '#FCE8E8',
          100: '#FAD1D1',
          200: '#F4A4A4',
          300: '#EF7676',
          400: '#EA4848',
          500: '#E31A1A',
          600: '#B71515',
          700: '#891010',
          800: '#5B0B0B',
          900: '#2E0505',
          950: '#170303',
        },
        brandScheme: {
          50: '#FCE8E8',
          100: '#FAD1D1',
          200: '#F4A4A4',
          300: '#EF7676',
          400: '#EA4848',
          500: '#E31A1A',
          600: '#B71515',
          700: '#891010',
          800: '#5B0B0B',
          900: '#2E0505',
          950: '#170303',
        },
        brandTabs: {
          50: '#FCE8E8',
          100: '#FAD1D1',
          200: '#F4A4A4',
          300: '#EF7676',
          400: '#EA4848',
          500: '#E31A1A',
          600: '#B71515',
          700: '#891010',
          800: '#5B0B0B',
          900: '#2E0505',
          950: '#170303',
        },
      },
    }

    setTheme && setTheme(newTheme)
  }
  const changeThemeBlue = () => {
    const newTheme = {
      ...theme,
      colors: {
        ...theme?.colors,
        brand: {
          50: '#EBEFFF',
          100: '#D6DFFF',
          200: '#ADBFFF',
          300: '#8AA3FF',
          400: '#6183FF',
          500: '#3965FF',
          600: '#0036FA',
          700: '#0029BD',
          800: '#001B7A',
          900: '#000D3D',
          950: '#00071F',
        },
        brandScheme: {
          50: '#EBEFFF',
          100: '#D6DFFF',
          200: '#ADBFFF',
          300: '#8AA3FF',
          400: '#6183FF',
          500: '#3965FF',
          600: '#0036FA',
          700: '#0029BD',
          800: '#001B7A',
          900: '#000D3D',
          950: '#00071F',
        },
        brandTabs: {
          50: '#EBEFFF',
          100: '#D6DFFF',
          200: '#ADBFFF',
          300: '#8AA3FF',
          400: '#6183FF',
          500: '#3965FF',
          600: '#0036FA',
          700: '#0029BD',
          800: '#001B7A',
          900: '#000D3D',
          950: '#00071F',
        },
      },
    }

    setTheme && setTheme(newTheme)
  }
  const changeThemeTeal = () => {
    const newTheme = {
      ...theme,
      colors: {
        ...theme?.colors,
        brand: {
          50: '#EBFAF8',
          100: '#D7F4F2',
          200: '#AAE9E4',
          300: '#82DED6',
          400: '#59D4C9',
          500: '#33C3B7',
          600: '#299E94',
          700: '#1F756E',
          800: '#144D48',
          900: '#0B2826',
          950: '#051413',
        },
        brandScheme: {
          50: '#EBFAF8',
          100: '#D7F4F2',
          200: '#AAE9E4',
          300: '#82DED6',
          400: '#59D4C9',
          500: '#33C3B7',
          600: '#299E94',
          700: '#1F756E',
          800: '#144D48',
          900: '#0B2826',
          950: '#051413',
        },
        brandTabs: {
          50: '#EBFAF8',
          100: '#D7F4F2',
          200: '#AAE9E4',
          300: '#82DED6',
          400: '#59D4C9',
          500: '#33C3B7',
          600: '#299E94',
          700: '#1F756E',
          800: '#144D48',
          900: '#0B2826',
          950: '#051413',
        },
      },
    }
    setTheme && setTheme(newTheme)
  }
  const changeThemeBrand = () => {
    const newTheme = {
      ...theme,
      colors: {
        ...theme?.colors,
        brand: {
          50: '#EFEBFF',
          100: '#E9E3FF',
          200: '#422AFB',
          300: '#422AFB',
          400: '#7551FF',
          500: '#422AFB',
          600: '#3311DB',
          700: '#02044A',
          800: '#190793',
          900: '#11047A',
        },
        brandScheme: {
          50: '#EFEBFF',
          100: '#E9E3FF',
          200: '#7551FF',
          300: '#7551FF',
          400: '#7551FF',
          500: '#422AFB',
          600: '#3311DB',
          700: '#02044A',
          800: '#190793',
          900: '#02044A',
        },
        brandTabs: {
          50: '#EFEBFF',
          100: '#E9E3FF',
          200: '#422AFB',
          300: '#422AFB',
          400: '#422AFB',
          500: '#422AFB',
          600: '#3311DB',
          700: '#02044A',
          800: '#190793',
          900: '#02044A',
        },
      },
    }
    setTheme && setTheme(newTheme)
  }
  const changeBgDefault = () => {
    const newTheme = {
      ...theme,
      colors: {
        ...theme?.colors,
        background: {
          100: '#FFFFFF',
          900: '#0b1437',
        },
      },
    }
    setTheme && setTheme(newTheme)
  }
  const changeBgContrast = () => {
    const newTheme = {
      ...theme,
      colors: {
        ...theme?.colors,
        background: {
          100: '#F4F7FE',
          900: '#070f2e',
        },
      },
    }
    setTheme && setTheme(newTheme)
  }
  const ContrastBlockImage = useColorModeValue(ContrastBlock, ContrastBlockDark)
  const ContrastImage = useColorModeValue(Contrast, ContrastDark)
  const MiniSidebarImage = useColorModeValue(MiniSidebar, MiniSidebarDark)
  const DefaultSidebarImage = useColorModeValue(DefaultSidebar, DefaultSidebarDark)
  const navbarIcon = useColorModeValue('neutral.400', 'white')
  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const brandColor = useColorModeValue('brand.500', 'white')
  const bgBadge = useColorModeValue('brand.50', 'whiteAlpha.100')
  const bgContrast = useColorModeValue('secondaryGray.300', 'navy.900')
  const borderButton = useColorModeValue('secondaryGray.100', '#323B5D')
  const bgSeparator = useColorModeValue('secondaryGray.400', '#323B5D')
  const activeShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.22)', 'none')
  const activeBg = useColorModeValue('#F7F9FF', 'whiteAlpha.100')
  const Bg = useColorModeValue('white', 'navy.700')
  const drawerBg = useColorModeValue('white', 'navy.800')

  const circlePurple = useColorModeValue('brand.500', 'brand.400')
  const circleGreen = useColorModeValue('horizonGreen.500', 'horizonGreen.400')
  const circleOrange = useColorModeValue('brand.500', 'brand.400')
  const circleRed = useColorModeValue('horizonRed.500', 'horizonRed.400')
  const circleBlue = useColorModeValue('blue.500', 'blue.400')
  const circleTeal = useColorModeValue('blue.500', 'blue.400')
  // document.body.exitFullscreen();

  const shadowBlock = useColorModeValue('0px 6px 14px rgba(200, 207, 215, 0.6)', 'none')
  const shadowPurple = useColorModeValue('0px 6px 18px rgba(67, 24, 255, 0.5)', '0px 6px 18px rgba(117, 81, 255, 0.5)')
  const shadowGreen = useColorModeValue('0px 6px 18px rgba(1, 181, 116, 0.5)', '0px 6px 18px rgba(53, 210, 138, 0.5)')
  const shadowOrange = useColorModeValue('0px 6px 18px rgba(255, 181, 71, 0.5)', '0px 6px 18px rgba(255, 205, 117, 0.5)')
  const shadowRed = useColorModeValue('0px 6px 18px rgba(227, 26, 26, 0.5)', '0px 6px 18px rgba(238, 93, 80, 0.5)')
  const shadowBlue = useColorModeValue('0px 6px 18px rgba(57, 101, 255, 0.5)', '0px 6px 18px rgba(106, 142, 255, 0.5)')
  const shadowTeal = useColorModeValue('0px 6px 18px rgba(51, 195, 183, 0.5)', '0px 6px 18px rgba(51, 195, 183, 0.5)')
  useEffect(() => {
    if (theme?.colors.brand[500] === theme?.colors.horizonGreen[500]) {
      setActive('Green')
    } else if (theme?.colors.brand[500] === theme?.colors.brand[500]) {
      setActive('Orange')
    } else if (theme?.colors.brand[500] === theme?.colors.horizonRed[500]) {
      setActive('Red')
    } else if (theme?.colors.brand[500] === theme?.colors.blue[500]) {
      setActive('Blue')
    } else if (theme?.colors.brand[500] === theme?.colors.blue[500]) {
      setActive('Teal')
    } else {
      setActive('Purple')
    }
  }, [theme?.colors.brand, theme?.colors.horizonGreen, theme?.colors.brand, theme?.colors.horizonRed, theme?.colors.blue])
  const fullscreenBorder = useColorModeValue('secondaryGray.100', 'whiteAlpha.200')
  const fullscreenBg = useColorModeValue('rgba(11,11,11,0)', 'rgba(11,11,11,0)')
  const configuratorShadow = useColorModeValue('-20px 17px 40px 4px rgba(112, 144, 176, 0.18)', '-22px 32px 51px 4px #0B1437')
  useEffect(() => {
    if (theme?.colors.brand[100] === '#FFFFFF') {
      setContrast && setContrast(false)
    } else {
      setContrast && setContrast(true)
    }
  }, [theme?.colors.brand, setContrast])
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Watch for fullscreenchange
  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }

    document.addEventListener('fullscreenchange', onFullscreenChange)

    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])
  return (
    <>
      <Button variant="no-hover" bg="transparent" p="0px" minW="unset" minH="unset" h="18px" w="max-content" onClick={onOpen}>
        <Icon me="10px" h="18px" w="18px" color={navbarIcon} as={MdSettings} />
      </Button>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={document.documentElement.dir === 'rtl' ? 'left' : 'right'}
        blockScrollOnMount={false}
      >
        <DrawerContent
          boxShadow={configuratorShadow}
          w={{ base: 'calc(100vw - 32px)', md: '400px' }}
          maxW={{ base: 'calc(100vw - 32px)', md: '400px' }}
          ms={{
            base: '0px',
            sm: '16px',
          }}
          me={{
            base: '16px',
          }}
          my={{
            sm: '16px',
          }}
          borderRadius="16px"
          bg={drawerBg}
        >
          <DrawerHeader w={{ base: '100%', md: '400px' }} pt="24px" pb="0px" px="24px">
            <Box
              position="absolute"
              cursor="pointer"
              top="13px"
              right="50px"
              onClick={() => {
                resetTheme()
                setMini && setMini(false)
              }}
            >
              <Icon h="22px" w="22px" color={textColor} as={MdRefresh} />
            </Box>
            <DrawerCloseButton color={textColor} />
            <Flex alignItems="center">
              <Flex h="48px" w="48px" me="20px" borderRadius="999px" bgGradient="linear(to-b, brand.400, brand.600)">
                <Image alt="" src={ConfiguratorLogo.src} />
              </Flex>
              <Box>
                <Text color={textColor} fontSize="xl" fontWeight="700">
                  Configurator
                </Text>
                <Text display={'flex'} color="secondaryGray.600" fontSize="md" fontWeight="500">
                  Unicorn x ReVision
                  <Badge
                    display="flex"
                    colorScheme="brand"
                    borderRadius="25px"
                    bg={bgBadge}
                    color={brandColor}
                    textTransform={'none'}
                    letterSpacing="0px"
                    px="4px"
                    ms="6px"
                  >
                    v2.0.0
                  </Badge>
                </Text>
              </Box>
            </Flex>
            <HSeparator my="30px" bg={bgSeparator} />
          </DrawerHeader>
          <DrawerBody pt="0px" pb="24px" w={{ base: '100%', md: '400px' }} maxW="unset">
            <Flex flexDirection="column">
              <Text color={textColor} mb="12px" fontWeight={'700'}>
                Color Mode
              </Text>
              <SimpleGrid columns={2} gap="20px" mb="30px">
                <ConfiguratorRadio
                  onClick={colorMode === 'dark' ? toggleColorMode : null}
                  active={colorMode === 'dark' ? false : true}
                  label={<Text>Light</Text>}
                >
                  <Image alt="" src={Light.src} maxW={{ base: '100%', md: '130px' }} borderRadius="8px" />
                </ConfiguratorRadio>
                <ConfiguratorRadio
                  onClick={colorMode === 'light' ? toggleColorMode : null}
                  active={colorMode === 'light' ? false : true}
                  label={<Text>Dark</Text>}
                >
                  <Image alt="" src={Dark.src} maxW={{ base: '100%', md: '130px' }} borderRadius="8px" />
                </ConfiguratorRadio>
              </SimpleGrid>
              <Text color={textColor} mb="12px" fontWeight={'700'}>
                Contrast
              </Text>
              <SimpleGrid columns={2} gap="20px" mb="30px">
                <ConfiguratorRadio
                  onClick={() => changeBgDefault()}
                  active={contrast === true ? false : true}
                  label={<Text>Transparent</Text>}
                >
                  <Flex
                    pt="10px"
                    ps="10px"
                    bg="repeat"
                    borderRadius="10px"
                    border="1px solid"
                    borderColor={borderButton}
                    bgImage={`url(${ContrastImage})`}
                    overflow="hidden"
                  >
                    <Image alt="" mt="auto" src={ContrastBlockImage.src} boxShadow={shadowBlock} />
                  </Flex>
                </ConfiguratorRadio>
                <ConfiguratorRadio
                  onClick={() => changeBgContrast()}
                  active={contrast === false ? false : true}
                  label={<Text>Filled</Text>}
                >
                  <Flex
                    pt="10px"
                    ps="10px"
                    borderRadius="10px"
                    border="1px solid"
                    borderColor={borderButton}
                    bg={bgContrast}
                    overflow="hidden"
                  >
                    <Image alt="" mt="auto" src={ContrastBlockImage.src} maxW={{ base: '100%', md: '130px' }} boxShadow={shadowBlock} />
                  </Flex>
                </ConfiguratorRadio>
              </SimpleGrid>
              <Text color={textColor} mb="12px" fontWeight={'700'}>
                Sidebar
              </Text>
              <SimpleGrid columns={2} gap="20px" mb="30px">
                <ConfiguratorRadio
                  onClick={() => setMini && setMini(false)}
                  active={mini === true ? false : true}
                  label={<Text>Default</Text>}
                >
                  <Flex
                    // w="130px"
                    // h="120px"
                    py="25px"
                    px="18px"
                    borderRadius="10px"
                    border="1px solid"
                    borderColor={borderButton}
                    bg={bgContrast}
                    overflow="hidden"
                    maxW={{ base: '100%', md: '130px' }}
                  >
                    <Image alt="" src={DefaultSidebarImage.src} maxW={{ base: '100%', md: '96px' }} boxShadow={shadowBlock} />
                  </Flex>
                </ConfiguratorRadio>
                <ConfiguratorRadio
                  onClick={() => setMini && setMini(true)}
                  active={mini === false ? false : true}
                  label={<Text>Minimized</Text>}
                >
                  <Flex
                    // w="130px"
                    // h="120px"
                    py="27.5px"
                    px="28px"
                    maxW={{ base: '100%', md: '130px' }}
                    borderRadius="10px"
                    border="1px solid"
                    borderColor={borderButton}
                    bg={bgContrast}
                    overflow="hidden"
                  >
                    <Image alt="" src={MiniSidebarImage.src} maxW={{ base: '100%', md: '75px' }} boxShadow={shadowBlock} />
                  </Flex>
                </ConfiguratorRadio>
              </SimpleGrid>
              <Text color={textColor} mb="12px" fontWeight={'700'}>
                Color presets
              </Text>
              <SimpleGrid columns={3} gap="20px">
                <Button
                  onClick={() => changeThemeBrand()}
                  h="max-content"
                  py="20px"
                  _hover={{ background: Bg, boxShadow: activeShadow }}
                  _focus={{ background: Bg, boxShadow: activeShadow }}
                  _active={{ background: activeBg, boxShadow: activeShadow }}
                  bg={active === 'Purple' ? Bg : 'transparent'}
                  boxShadow={active === 'Purple' ? activeShadow : 'none'}
                  border="1px solid"
                  borderColor={borderButton}
                >
                  <Flex boxShadow={shadowPurple} bg={circlePurple} w="20px" h="20px" borderRadius={'100%'} />
                </Button>
                <Button
                  onClick={() => changeThemeGreen()}
                  h="max-content"
                  py="20px"
                  border="1px solid"
                  _hover={{ background: Bg, boxShadow: activeShadow }}
                  _focus={{ background: Bg, boxShadow: activeShadow }}
                  _active={{ background: activeBg, boxShadow: activeShadow }}
                  bg={active === 'Green' ? Bg : 'transparent'}
                  boxShadow={active === 'Green' ? activeShadow : 'none'}
                  borderColor={borderButton}
                >
                  <Flex boxShadow={shadowGreen} bg={circleGreen} w="20px" h="20px" borderRadius={'100%'} />
                </Button>
                <Button
                  onClick={() => changeThemeOrange()}
                  h="max-content"
                  py="20px"
                  border="1px solid"
                  _hover={{ background: Bg, boxShadow: activeShadow }}
                  _focus={{ background: Bg, boxShadow: activeShadow }}
                  _active={{ background: activeBg, boxShadow: activeShadow }}
                  bg={active === 'Orange' ? Bg : 'transparent'}
                  boxShadow={active === 'Orange' ? activeShadow : 'none'}
                  borderColor={borderButton}
                >
                  <Flex boxShadow={shadowOrange} bg={circleOrange} w="20px" h="20px" borderRadius={'100%'} />
                </Button>
                <Button
                  onClick={() => changeThemeRed()}
                  h="max-content"
                  py="20px"
                  border="1px solid"
                  _hover={{ background: Bg, boxShadow: activeShadow }}
                  _focus={{ background: Bg, boxShadow: activeShadow }}
                  _active={{ background: activeBg, boxShadow: activeShadow }}
                  bg={active === 'Red' ? Bg : 'transparent'}
                  boxShadow={active === 'Red' ? activeShadow : 'none'}
                  borderColor={borderButton}
                >
                  <Flex boxShadow={shadowRed} bg={circleRed} w="20px" h="20px" borderRadius={'100%'} />
                </Button>
                <Button
                  onClick={() => changeThemeBlue()}
                  h="max-content"
                  py="20px"
                  border="1px solid"
                  _hover={{ background: Bg, boxShadow: activeShadow }}
                  _focus={{ background: Bg, boxShadow: activeShadow }}
                  _active={{ background: activeBg, boxShadow: activeShadow }}
                  bg={active === 'Blue' ? Bg : 'transparent'}
                  boxShadow={active === 'Blue' ? activeShadow : 'none'}
                  borderColor={borderButton}
                >
                  <Flex boxShadow={shadowBlue} bg={circleBlue} w="20px" h="20px" borderRadius={'100%'} />
                </Button>
                <Button
                  onClick={() => changeThemeTeal()}
                  h="max-content"
                  py="20px"
                  border="1px solid"
                  _hover={{ background: Bg, boxShadow: activeShadow }}
                  _focus={{ background: Bg, boxShadow: activeShadow }}
                  _active={{ background: activeBg, boxShadow: activeShadow }}
                  bg={active === 'Teal' ? Bg : 'transparent'}
                  boxShadow={active === 'Teal' ? activeShadow : 'none'}
                  borderColor={borderButton}
                >
                  <Flex boxShadow={shadowTeal} bg={circleTeal} w="20px" h="20px" borderRadius={'100%'} />
                </Button>
              </SimpleGrid>
            </Flex>
            <HSeparator my="30px" bg={bgSeparator} />
            <Button
              h="max-content"
              w="100%"
              py="16px"
              border="1px solid"
              display={'flex'}
              justifyContent="center"
              alignItems="center"
              bg={fullscreenBg}
              _hover={{ background: Bg, boxShadow: activeShadow }}
              _focus={{ background: Bg, boxShadow: activeShadow }}
              _active={{ background: activeBg, boxShadow: activeShadow }}
              borderColor={fullscreenBorder}
              onClick={() => {
                isFullscreen ? document.exitFullscreen() : document.body.requestFullscreen()
              }}
            >
              {isFullscreen ? 'Exit fullscreen' : 'Fullscreen mode'}
              <Icon ms="6px" h="18px" w="18px" color={textColor} as={isFullscreen ? MdOutlineFullscreenExit : MdFullscreen} />
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
