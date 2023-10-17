import { mode } from '@chakra-ui/theme-tools'

export const globalStyles = {
  fonts: {
    heading: 'Fraunces, serif',
    body: 'DM Sans, Roboto, sans-serif',
  },
  colors: {
    brandYellow: {
      0: '#FCF052',
      50: '#fefcdc',
      100: '#fef9ba',
      200: '#fdf697',
      300: '#fdf375',
      400: '#fcf052',
      500: '#e3d84a',
      600: '#b0a839',
      700: '#7e7829',
      800: '#4c4819',
      900: '#191808',
    },
    brand: {
      50: '#f9e1db',
      100: '#f2c2b8',
      200: '#eca494',
      300: '#e58571',
      400: '#e05845',
      500: '#cc4d3b',
      600: '#9c4836',
      700: '#703427',
      800: '#431f17',
      900: '#160a08',
    },
    brandScheme: {
      50: '#fceeec',
      100: '#f6cdc7',
      200: '#f0aca2',
      300: '#e98a7d',
      400: '#e36958',
      500: '#ca4f3e',
      600: '#9d3e30',
      700: '#702c23',
      800: '#431a15',
      900: '#160907',
    },
    brandTabs: {
      50: '#fceeec',
      100: '#f6cdc7',
      200: '#f0aca2',
      300: '#e98a7d',
      400: '#e36958',
      500: '#ca4f3e',
      600: '#9d3e30',
      700: '#702c23',
      800: '#431a15',
      900: '#160907',
    },
    horizonGreen: {
      50: '#fffde7',
      100: '#fffab7',
      200: '#fff788',
      300: '#fff458',
      400: '#fff128',
      500: '#e6d70e',
      600: '#b3a70b',
      700: '#807808',
      800: '#4d4805',
      900: '#191802',
    },
    horizonRed: {
      50: '#fceeec',
      100: '#f6cdc7',
      200: '#f0aca2',
      300: '#e98a7d',
      400: '#e36958',
      500: '#ca4f3e',
      600: '#9d3e30',
      700: '#702c23',
      800: '#431a15',
      900: '#160907',
    },
    blue: {
      50: '#d3e5e9',
      100: '#a7cbd3',
      200: '#7bb0bd',
      300: '#4f96a7',
      400: '#237c91',
      500: '#207083',
      600: '#195766',
      700: '#123e49',
      800: '#0b252c',
      900: '#030c0e',
    },
    secondaryGray: {
      50: '#e9e9e9',
      100: '#bdbdbc',
      200: '#929190',
      300: '#666564',
      400: '#3a3937',
      500: '#20201e',
      600: '#191917',
      700: '#121211',
      800: '#0b0b0a',
      900: '#040303',
    },
    red: {
      100: '#FEEFEE',
      500: '#EE5D50',
      600: '#E31A1A',
    },
    orange: {
      100: '#FFF6DA',
      500: '#FFB547',
    },
    green: {
      100: '#E6FAF5',
      500: '#01B574',
    },
    navy: {
      50: '#fceeec',
      100: '#f6cdc7',
      200: '#f0aca2',
      300: '#e98a7d',
      400: '#e36958',
      500: '#ca4f3e',
      600: '#9d3e30',
      700: '#702c23',
      800: '#431a15',
      900: '#160907',
    },
    neutral: {
      100: '#fdfdfd',
      200: '#eaeaea',
      300: '#dcdcdc',
      400: '#bfbfbf',
      500: '#a4a4a4',
      600: '#838383',
      700: '#636363',
      800: '#3d3d3d',
      900: '#262626',
    },
  },
  styles: {
    global: (props: any) => ({
      html: {
        background: 'neutral.100',
        fontFamily: globalStyles.fonts.body,
      },
      body: {
        bg: 'neutral.100', // mode('neutral.100', 'neutral.900')(props),
        fontFamily: globalStyles.fonts.body,
      },
      input: {
        color: 'neutral.700',
      },
      h1: {
        fontFamily: globalStyles.fonts.heading,
      },
      p: {
        fontFamily: globalStyles.fonts.body,
      },
    }),
  },
}
