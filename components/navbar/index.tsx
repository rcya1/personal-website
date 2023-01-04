import React, { FC } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useBreakpointValue,
  useColorModeValue
} from '@chakra-ui/react'

import ThemeToggle from 'components/theme-toggle'
import NavbarItem from './item'
import { HamburgerIcon } from '@chakra-ui/icons'

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const router = useRouter()
  const navbarColor = useColorModeValue('navbar-light', 'navbar-dark')
  const mobileButtonColor = useColorModeValue('blackAlpha', 'white')

  const links = {
    'About Me': '/',
    Projects: '/projects',
    Posts: '/posts'
  }

  const desktopLinks = (
    <HStack my="auto" justify="center">
      {Object.entries(links).map((entry) => (
        <NavbarItem
          key={entry[0]}
          title={entry[0]}
          href={entry[1]}
          active={entry[1] == '/' ? router.asPath == entry[1] : router.asPath.startsWith(entry[1])}
        />
      ))}
    </HStack>
  )

  const mobileMenu = (
    <Menu isLazy id="navbar-menu">
      <MenuButton
        as={IconButton}
        icon={<HamburgerIcon />}
        variant="outline"
        colorScheme={mobileButtonColor}
        aria-label="Menu"
      />
      <MenuList>
        {Object.entries(links).map((entry) => (
          <NextLink key={entry[0]} href={entry[1]} passHref>
            <MenuItem
              as={Link}
              textDecoration={router.asPath === entry[1] ? 'underline' : 'none'}
              fontWeight={router.asPath === entry[1] ? 'black' : 'normal'}
            >
              {entry[0]}
            </MenuItem>
          </NextLink>
        ))}
      </MenuList>
    </Menu>
  )

  const mobileContent = (
    <Flex
      direction="row"
      justify="space-between"
      maxW="container.md"
      mx="auto"
      wrap="wrap"
      position="relative"
    >
      <Heading size="md" mt={2} ml={5} alignSelf="flex-start">
        Ryan Chang
      </Heading>

      <HStack mr={3}>
        <Box mr={3}>
          <ThemeToggle></ThemeToggle>
        </Box>
        <Box>{mobileMenu}</Box>
      </HStack>
    </Flex>
  )
  
  const desktopContent = (
    <Flex
      direction="row"
      justify="center"
      maxW="container.md"
      mx="auto"
      wrap="wrap"
      position="relative"
    >
      <Heading size="md" position="absolute" left={0} alignSelf="flex-start">
        Ryan Chang
      </Heading>
      {desktopLinks}
      <Box position="absolute" right="0">
        <ThemeToggle></ThemeToggle>
      </Box>
    </Flex>
  )

  return (
    <Box
      position="fixed"
      top="0"
      w="100%"
      as="nav"
      py={{ base: 2, md: 4 }}
      backgroundColor={navbarColor}
      backdropFilter="auto"
      backdropBlur="8px"
      zIndex={100}
    >
      <Box w="100%" display={{ base: 'none', md: 'inline-block' }}>
        { desktopContent }
      </Box>
      <Box w="100%" display={{ base: 'inline-block', md: 'none' }}>
        { mobileContent }
      </Box>
    </Box>
  )
}

export default Navbar
