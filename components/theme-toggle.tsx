import React, { FC } from 'react'
import { Box, Flex, Switch, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

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
      <Box display="flex" alignItems="center">
        {colorMode === 'light' && <SunIcon w={5} h={5} color={iconColor} />}
        {colorMode === 'dark' && <MoonIcon w={5} h={5} color={iconColor} />}
      </Box>
    </Flex>
  )
}

export default ThemeToggle
