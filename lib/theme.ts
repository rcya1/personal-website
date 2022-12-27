import {
  extendTheme,
  type ThemeConfig,
} from '@chakra-ui/react'
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

const theme = extendTheme({
  config,
  colors: {
    'navbar-light': '#eee0cb',
    'navbar-dark': '#2d3238',
    'background-light': '#f0e7db',
    'background-dark': '#202023',
    'text-light': '#000000',
    'text-dark': 'rgb(212, 212, 216)',

    'highlight-light': '#f0b6a8',
    'highlight-dark-light': '#d8a497',
    'highlight-darker-light': '#c09286',

    'highlight-dark': 'blue.700',
    'highlight-dark-dark': 'blue.800',
    'highlight-darker-dark': 'blue.900',
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode('background-light', 'background-dark')(props),
        color: mode('text-light', 'text-dark')(props)
      }
    })
  },
  fonts: {
    heading: `'Raleway', sans-serif`,
    body: `'Noto Sans', sans-serif`
  },
})

export default theme
