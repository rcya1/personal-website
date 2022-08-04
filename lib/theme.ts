import { extendTheme, type ThemeConfig, theme as baseTheme } from '@chakra-ui/react';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

const theme = extendTheme({
  config,
  colors: {
    'navbar-light': baseTheme.colors.green[100] + '40',
    'navbar-dark': baseTheme.colors.gray[800] + '40'
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode('green.50', 'gray.700')(props)
      }
    })
  },
  fonts: {
    heading: `'Raleway', sans-serif`,
    body: `'Open Sans', sans-serif`
  }
})

export default theme

