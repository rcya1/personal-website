import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'
import Color from 'color'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

export const textLight = Color('#1c1917')
export const textDark = Color('#e8e4f0')

export const glassBgLight = 'rgba(255,255,255,0.60)'
export const glassBgDark = 'rgba(255,255,255,0.055)'
export const glassBorderLight = 'rgba(255,255,255,0.85)'
export const glassBorderDark = 'rgba(255,255,255,0.11)'
export const glassShadowLight =
  '0 4px 32px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)'
export const glassShadowDark =
  '0 4px 32px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.3)'

const theme = extendTheme({
  config,
  colors: {
    'text-light': textLight.string(),
    'text-dark': textDark.string(),

    // Amber accent
    'accent-light': '#f59e0b',
    'accent-dark': '#fbbf24',

    // Navbar glass
    'navbar-glass-light': 'rgba(254, 250, 242, 0.82)',
    'navbar-glass-dark': 'rgba(13, 12, 20, 0.82)',
    'navbar-border-light': 'rgba(0, 0, 0, 0.10)',
    'navbar-border-dark': 'rgba(255, 255, 255, 0.18)'
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode('#fefcf8', '#0d0c14')(props),
        color: mode('text-light', 'text-dark')(props),
        backgroundImage: mode(
          'linear-gradient(135deg, #fef9f2 0%, #fefcf8 35%, #f5f0ff 70%, #eef4ff 100%)',
          'linear-gradient(135deg, #0d0b14 0%, #0d0c14 35%, #130d20 70%, #0d1224 100%)'
        )(props),
        backgroundAttachment: 'fixed',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale'
      }
    })
  },
  components: {
    Link: {
      baseStyle: (props: StyleFunctionProps) => ({
        color: mode('blue.600', 'blue.300')(props)
      })
    }
  },
  fonts: {
    heading: `'Raleway', sans-serif`,
    body: `'Noto Sans', 'Noto Color Emoji', sans-serif`
  }
})

export default theme
