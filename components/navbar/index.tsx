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
  const mobileMode = useBreakpointValue({ base: true, md: false })

  const links = {
    'About Me': '/',
    Projects: '/projects',
    Blog: '/blog'
  }

  const desktopLinks = (
    <HStack my="auto" justify="center">
      {Object.entries(links).map((entry) => (
        <NavbarItem
          key={entry[0]}
          title={entry[0]}
          href={entry[1]}
          active={router.asPath === entry[1]}
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
          <NextLink href={entry[1]} passHref>
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

  const mainContent = mobileMode ? (
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
  ) : (
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
      {mainContent}
    </Box>
  )
}

export default Navbar
