import {
  extendTheme,
  type ThemeConfig,
  theme as baseTheme
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
    'text-dark': '#e6e6e6'
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
    body: `'Open Sans', sans-serif`
  }
})

export default theme
