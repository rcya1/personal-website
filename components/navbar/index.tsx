import React, { FC, useEffect, useRef, useState } from 'react'
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
  useColorModeValue
} from '@chakra-ui/react'

import ThemeToggle from 'components/theme-toggle'
import { HamburgerIcon } from '@chakra-ui/icons'

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const router = useRouter()
  const navbarBg = useColorModeValue('navbar-glass-light', 'navbar-glass-dark')
  const navbarBorder = useColorModeValue('navbar-border-light', 'navbar-border-dark')
  const mobileButtonColor = useColorModeValue('blackAlpha', 'white')
  const menuBg = useColorModeValue('rgba(255,255,255,0.95)', 'rgba(18,16,28,0.95)')
  const menuBorderColor = useColorModeValue('rgba(255,255,255,0.7)', 'rgba(255,255,255,0.1)')
  const menuItemHoverBg = useColorModeValue('rgba(245,158,11,0.08)', 'rgba(251,191,36,0.08)')
  const nameColor = useColorModeValue('#1c1917', '#e8e4f0')
  const textColor = useColorModeValue('text-light', 'text-dark')
  const accentColor = useColorModeValue('#f59e0b', '#fbbf24')
  const hoverBg = useColorModeValue('rgba(245,158,11,0.08)', 'rgba(251,191,36,0.08)')

  const links: Record<string, string> = {
    'About Me': '/',
    Projects: '/projects',
    Posts: '/posts'
  }
  const linkEntries = Object.entries(links)

  // Active index
  const activeNavIdx = linkEntries.findIndex(([, href]) =>
    href === '/' ? router.asPath === href : router.asPath.startsWith(href)
  )

  // Underline state
  const [hoveredNavIdx, setHoveredNavIdx] = useState<number | null>(null)
  const [navUnderline, setNavUnderline] = useState({ left: 0, width: 0, visible: false })
  const navContainerRef = useRef<HTMLDivElement>(null)
  const navTextRefs = useRef<(HTMLSpanElement | null)[]>([])

  const targetNavIdx = hoveredNavIdx !== null ? hoveredNavIdx : activeNavIdx

  useEffect(() => {
    if (targetNavIdx < 0 || !navContainerRef.current) {
      setNavUnderline((s) => ({ ...s, visible: false }))
      return
    }
    const container = navContainerRef.current
    const textEl = navTextRefs.current[targetNavIdx]
    if (!textEl) return

    const containerRect = container.getBoundingClientRect()
    const textRect = textEl.getBoundingClientRect()
    if (textRect.width === 0) return

    setNavUnderline({
      left: textRect.left - containerRect.left,
      width: textRect.width,
      visible: true
    })
  }, [targetNavIdx, router.asPath])

  const desktopLinks = (
    // position="relative" so the underline is positioned relative to this Box
    <Box ref={navContainerRef} position="relative">
      <HStack spacing={1}>
        {linkEntries.map(([title, href], idx) => {
          const isActive = href === '/' ? router.asPath === href : router.asPath.startsWith(href)
          // Only highlight one item at a time: the hovered item when hovering, otherwise the active item
          const isHighlighted = hoveredNavIdx !== null ? idx === hoveredNavIdx : isActive
          return (
            <Box key={title} px={1}>
              <NextLink href={href} passHref>
                <Link
                  display="block"
                  fontWeight={isActive ? 'semibold' : 'normal'}
                  fontSize="sm"
                  color={isHighlighted ? accentColor : textColor}
                  textDecoration="none"
                  px={4}
                  py={2}
                  borderRadius="lg"
                  transition="color 0.2s ease, background 0.2s ease"
                  bg={isHighlighted ? hoverBg : 'transparent'}
                  _hover={{ textDecoration: 'none' }}
                  onMouseEnter={() => setHoveredNavIdx(idx)}
                  onMouseLeave={() => setHoveredNavIdx(null)}
                >
                  <span ref={(el) => (navTextRefs.current[idx] = el)}>{title}</span>
                </Link>
              </NextLink>
            </Box>
          )
        })}
      </HStack>

      {/* Sliding underline — morphs width and position between words */}
      {navUnderline.visible && (
        <Box
          position="absolute"
          bottom="3px"
          left={`${navUnderline.left}px`}
          width={`${navUnderline.width}px`}
          height="2.5px"
          bg={accentColor}
          borderRadius="full"
          transition="left 0.25s cubic-bezier(0.4, 0, 0.2, 1), width 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
          pointerEvents="none"
        />
      )}
    </Box>
  )

  const mobileMenu = (
    <Menu isLazy id="navbar-menu">
      <MenuButton
        as={IconButton}
        icon={<HamburgerIcon />}
        variant="outline"
        colorScheme={mobileButtonColor}
        aria-label="Menu"
        size="sm"
        borderRadius="lg"
      />
      <MenuList
        bg={menuBg}
        backdropFilter="blur(16px)"
        borderColor={menuBorderColor}
        boxShadow="0 8px 32px rgba(0,0,0,0.12)"
        borderRadius="xl"
        overflow="hidden"
      >
        {linkEntries.map(([title, href]) => {
          const isActive = href === '/' ? router.asPath === href : router.asPath.startsWith(href)
          return (
            <NextLink key={title} href={href} passHref>
              <MenuItem
                as={Link}
                textDecoration="none"
                fontWeight={isActive ? 'semibold' : 'normal'}
                color={isActive ? accentColor : 'inherit'}
                _hover={{ textDecoration: 'none', bg: menuItemHoverBg }}
                bg="transparent"
              >
                {title}
              </MenuItem>
            </NextLink>
          )
        })}
      </MenuList>
    </Menu>
  )

  const mobileContent = (
    <Flex
      direction="row"
      align="center"
      justify="space-between"
      maxW="container.md"
      mx="auto"
      px={4}
    >
      <Heading as="p" size="md" color={nameColor} letterSpacing="tight">
        Ryan Chang
      </Heading>
      <HStack spacing={2}>
        <ThemeToggle />
        {mobileMenu}
      </HStack>
    </Flex>
  )

  const desktopContent = (
    <Flex
      direction="row"
      align="center"
      justify="center"
      maxW="56rem"
      mx="auto"
      position="relative"
      px={4}
    >
      <Heading
        size="md"
        position="absolute"
        left={4}
        top="50%"
        transform="translateY(-50%)"
        color={nameColor}
        letterSpacing="tight"
      >
        Ryan Chang
      </Heading>
      {desktopLinks}
      <Box position="absolute" right="4" top="50%" transform="translateY(-50%)">
        <ThemeToggle />
      </Box>
    </Flex>
  )

  return (
    <Box
      position="fixed"
      top="0"
      w="100%"
      as="nav"
      py={{ base: 3, md: 4 }}
      backgroundColor={navbarBg}
      backdropFilter="blur(16px)"
      borderBottomWidth="1px"
      borderBottomColor={navbarBorder}
      zIndex={100}
    >
      <Box w="100%" display={{ base: 'none', md: 'inline-block' }}>
        {desktopContent}
      </Box>
      <Box w="100%" display={{ base: 'inline-block', md: 'none' }}>
        {mobileContent}
      </Box>
    </Box>
  )
}

export default Navbar
