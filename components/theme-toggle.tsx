import React, { FC } from 'react'
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { LuMoon, LuSun } from 'react-icons/lu'
import {
  glassBgLight,
  glassBgDark,
  glassBorderLight,
  glassBorderDark,
  glassShadowLight,
  glassShadowDark
} from 'lib/theme'

interface ThemeToggleProps {}

const ThemeToggle: FC<ThemeToggleProps> = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  const glassBg = useColorModeValue(glassBgLight, glassBgDark)
  const glassBorder = useColorModeValue(glassBorderLight, glassBorderDark)
  const glassShadow = useColorModeValue(glassShadowLight, glassShadowDark)
  const accentColor = useColorModeValue('#f59e0b', '#fbbf24')
  const hoverShadow = useColorModeValue(
    '0 2px 8px rgba(245,158,11,0.10)',
    '0 2px 8px rgba(251,191,36,0.08)'
  )

  return (
    <IconButton
      aria-label={
        colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
      }
      onClick={toggleColorMode}
      position="fixed"
      top={{ base: 5, md: 8 }}
      right={{ base: 5, md: 8 }}
      zIndex={20}
      size="lg"
      isRound
      bg={glassBg}
      color={accentColor}
      backdropFilter="blur(12px)"
      borderWidth="1px"
      borderColor={glassBorder}
      boxShadow={glassShadow}
      transition="border-color 0.2s ease, box-shadow 0.2s ease"
      _hover={{
        bg: glassBg,
        borderColor: accentColor,
        boxShadow: hoverShadow
      }}
      icon={
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={colorMode}
            initial={{ opacity: 0, rotate: -60, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 60, scale: 0.5 }}
            transition={{ duration: 0.18 }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {colorMode === 'light' ? <LuSun /> : <LuMoon />}
          </motion.span>
        </AnimatePresence>
      }
    />
  )
}

export default ThemeToggle
