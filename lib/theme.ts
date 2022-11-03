import { extendTheme, type ThemeConfig, theme as baseTheme } from '@chakra-ui/react';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

const theme = extendTheme({
  config,
  colors: {
    'navbar-light': baseTheme.colors.orange[100] + 'A0',
    'navbar-dark': baseTheme.colors.blue[700] + 'A0',
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode('yellow.50', 'gray.700')(props)
      }
    })
  },
  fonts: {
    heading: `'Raleway', sans-serif`,
    body: `'Open Sans', sans-serif`
  }
})

export default theme

