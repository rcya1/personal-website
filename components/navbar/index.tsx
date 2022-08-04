import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex, Heading, HStack, useColorModeValue } from '@chakra-ui/react'

import ThemeToggle from 'components/theme-toggle'
import NavbarItem from './item'

interface NavbarProps {

}

const Navbar: FC<NavbarProps> = ({ }) => {
  const router = useRouter()
  const navbarColor = useColorModeValue('navbar-light', 'navbar-dark')

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
      backdropBlur='6px'
    >
      <Flex
        direction='row'
        justify='space-between'
        maxW="container.md"
        mx="auto"
        wrap="wrap"
      >
        <Heading
          size='md'
          mr={6}
        >
          Ryan Chang
        </Heading>
        <HStack
          display="flex"
          flexGrow={1}
        >
          { 
            Object.entries(links).map(entry => 
              <NavbarItem title={entry[0]} href={entry[1]} active={router.asPath === entry[1]} />)
          }
        </HStack>
        <Box>
          <ThemeToggle></ThemeToggle>
        </Box>
      </Flex>
    </Box>
  )
}

export default Navbar
