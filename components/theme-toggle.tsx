import React, { FC } from 'react'
import { Box, Flex, Switch, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import { AnimatePresence, motion } from 'framer-motion'

interface ThemeToggleProps {}

const ThemeToggle: FC<ThemeToggleProps> = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const iconColor = useColorModeValue('#f59e0b', '#fbbf24')

  return (
    <Flex direction="row" align="center">
      <Switch
        size="lg"
        colorScheme="yellow"
        isChecked={colorMode === 'dark'}
        onChange={toggleColorMode}
        mr={2}
        sx={{
          '& .chakra-switch__track[data-checked]': {
            bg: iconColor
          }
        }}
      />
      <Box display="flex" alignItems="center" width="20px" height="20px" position="relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={colorMode}
            initial={{ opacity: 0, rotate: -60, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 60, scale: 0.5 }}
            transition={{ duration: 0.18 }}
            style={{ position: 'absolute', display: 'flex', alignItems: 'center' }}
          >
            {colorMode === 'light' ? (
              <SunIcon w={5} h={5} color={iconColor} />
            ) : (
              <MoonIcon w={5} h={5} color={iconColor} />
            )}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Flex>
  )
}

export default ThemeToggle
