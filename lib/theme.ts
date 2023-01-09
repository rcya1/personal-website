import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'
import Color from 'color'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

export const backgroundLight = Color('#f0e7db')
export const backgroundDark = Color('#263340')
export const textLight = Color('#000000')
export const textDark = Color('rgb(204, 208, 212)')

export const highlightLight = Color('#f0b6a8')
export const highlightDarkLight = highlightLight.darken(0.075)
export const highlightDarkerLight = highlightLight.darken(0.15)

export const highlightDark = Color('#2c5282')
export const highlightDarkDark = highlightDark.darken(0.075)
export const highlightDarkerDark = highlightDark.darken(0.15)

const theme = extendTheme({
  config,
  colors: {
    'navbar-light': '#eee0cb',
    'navbar-dark': '#1d2833',
    'background-light': backgroundLight.string(),
    'background-dark': backgroundDark.string(),
    'text-light': textLight.string(),
    'text-dark': textDark.string(),

    'highlight-light': highlightLight.string(),
    'highlight-dark-light': highlightDarkLight.string(),
    'highlight-darker-light': highlightDarkerLight.string(),

    'highlight-dark': highlightDark.string(),
    'highlight-dark-dark': highlightDarkDark.string(),
    'highlight-darker-dark': highlightDarkerDark.string()
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
  }
})

export default theme
