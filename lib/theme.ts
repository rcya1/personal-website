import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'
import Color from 'color'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

export const backgroundLight = Color('rgb(250, 252, 253)')
export const backgroundDark = Color('rgb(13, 17, 23)')
export const textLight = Color('rgb(0, 0, 0)')
export const textDark = Color('rgb(230, 237, 243)')

export const highlightLight = Color('rgb(198, 240, 209)')
export const highlightDarkLight = highlightLight.darken(0.075)
export const highlightDarkerLight = highlightLight.darken(0.15)

export const highlightDark = Color('rgb(35, 134, 54)')
export const highlightDarkDark = highlightDark.darken(0.075)
export const highlightDarkerDark = highlightDark.darken(0.15)

const theme = extendTheme({
  config,
  colors: {
    'navbar-light': 'rgb(214, 237, 244)',
    'navbar-dark': 'rgb(32, 37, 44)',
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
