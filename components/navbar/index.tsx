import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { Box, Divider, Flex, Heading, HStack, Icon, useColorModeValue } from '@chakra-ui/react'

import ThemeToggle from 'components/theme-toggle'
import NavbarItem from './item'

interface NavbarProps {

}

const Navbar: FC<NavbarProps> = ({ }) => {
  const router = useRouter()
  const navbarColor = useColorModeValue('navbar-light', 'navbar-dark')
  const dividerColor = useColorModeValue('navbar-light', 'white')

  const links = {
    'About Me': '/',
    'Projects': '/projects',
    'Blog': '/blog'
  }

  return (
    <Box
      position='fixed'
      top='0'
      w='100%'
      as='nav'
      py={4}
      backgroundColor={navbarColor}
      backdropFilter='auto'
      backdropBlur='8px'
      zIndex={100}
    >
      <Flex
        direction='row'
        justify='center'
        maxW="container.md"
        mx="auto"
        wrap="wrap"
        position='relative'
      >
        <Heading
          size='md'
          position='absolute'
          left='0'
        >
          Ryan Chang
        </Heading>
        <HStack
          display="flex"
          my='auto'
          justify='center'
        >
          { 
            Object.entries(links).map(entry => 
              <NavbarItem key={entry[0]} title={entry[0]} href={entry[1]} active={router.asPath === entry[1]} />)
          }
        </HStack>
        <Box
          position='absolute'
          right='0'
        >
          <ThemeToggle></ThemeToggle>
        </Box>
      </Flex>
    </Box>
  )
}

export default Navbar
