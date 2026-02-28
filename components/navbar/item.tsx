import React, { FC } from 'react'
import NextLink from 'next/link'
import { Box, Link, useColorModeValue } from '@chakra-ui/react'

interface NavbarItemProps {
  title: string
  href: string
  active: boolean
}

const NavbarItem: FC<NavbarItemProps> = ({ title, href, active }) => {
  const textColor = useColorModeValue('text-light', 'text-dark')
  const activeColor = useColorModeValue('accent-light', 'accent-dark')
  const hoverBg = useColorModeValue('rgba(245,158,11,0.08)', 'rgba(251,191,36,0.08)')

  return (
    <Box px={1}>
      <NextLink href={href} passHref>
        <Link
          display="block"
          mx="auto"
          textAlign="center"
          fontWeight={active ? 'semibold' : 'normal'}
          fontSize="sm"
          color={active ? activeColor : textColor}
          textDecoration="none"
          px={4}
          py={2}
          borderRadius="lg"
          position="relative"
          transition="all 0.2s ease"
          bg={active ? hoverBg : 'transparent'}
          _hover={{
            textDecoration: 'none',
            color: activeColor,
            bg: hoverBg
          }}
          _after={
            active
              ? {
                  content: '""',
                  position: 'absolute',
                  bottom: '6px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '16px',
                  height: '2px',
                  bg: activeColor,
                  borderRadius: 'full'
                }
              : {}
          }
        >
          {title}
        </Link>
      </NextLink>
    </Box>
  )
}

export default NavbarItem
