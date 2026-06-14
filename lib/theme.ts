import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'
import Color from 'color'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  disableTransitionOnChange: false
}

export const textLight = Color('#1c1917')
export const textDark = Color('#e8e4f0')

export const glassBgLight = 'rgba(255,255,255,0.62)'
export const glassBgDark = 'rgba(255,255,255,0.05)'
export const glassBorderLight = 'rgba(20,16,12,0.08)'
export const glassBorderDark = 'rgba(255,255,255,0.10)'
export const glassShadowLight =
  '0 1px 3px rgba(20,16,12,0.04), 0 8px 24px rgba(20,16,12,0.05)'
export const glassShadowDark =
  '0 1px 3px rgba(0,0,0,0.30), 0 10px 28px rgba(0,0,0,0.32)'

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
        color: mode('#b45309', '#fbbf24')(props),
        fontWeight: 'medium',
        textUnderlineOffset: '2px',
        transition: 'color 0.15s ease',
        _hover: {
          textDecoration: 'underline',
          color: mode('#92400e', '#fcd34d')(props)
        }
      })
    }
  },
  fonts: {
    heading: `'Raleway', sans-serif`,
    body: `'Noto Sans', 'Noto Color Emoji', sans-serif`
  }
})

export default theme
