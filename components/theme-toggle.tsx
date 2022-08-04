import React, { FC } from 'react'
import { Box, Flex, Switch, useColorMode } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

interface ThemeToggleProps {

}

// TODO override the styles on the switch so that it uses purple-300
// https://chakra-ui.com/docs/styled-system/component-style#styling-multipart-components
const ThemeToggle: FC<ThemeToggleProps> = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex
      direction='row'
    >
      <Switch
        size='lg'
        colorScheme='purple'
        isChecked={colorMode === 'dark'}
        onChange={() => {
          toggleColorMode()
        }}
        mr={2}
      >
      </Switch>
      <Box>
        {colorMode === 'light' &&
          <SunIcon
            w={6} h={6}
          />
        }
        {colorMode === 'dark' &&
          <MoonIcon
            w={6} h={6}
            color='purple.400'
          />
        }
      </Box>
    </Flex>
  )
}

export default ThemeToggle
