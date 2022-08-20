import React, { FC } from 'react'
import NextLink from 'next/link'
import { Box, Link } from '@chakra-ui/react'

interface NavbarItemProps {
  title: string
  href: string
  active: boolean
}

const NavbarItem: FC<NavbarItemProps> = ({ title, href, active }) => {
  return (
    <Box
      px={3}
    >
      <NextLink
        href={href}
        passHref
      >
        <Link
          mx='auto'
          textAlign='center'
          fontWeight={active ? 'black' : 'normal'}
          fontSize='md'
          textDecoration={active ? 'underline' : 'none'}
          textUnderlineOffset={'1.5px'}
          textDecorationThickness={'0.7px'}
          _hover={{
            textDecoration: 'underline',
            textUnderlineOffset: '1.5px',
            textDecorationThickness: '0.7px',
          }}
        >
          { title }
        </Link>
      </NextLink>
    </Box>
  )
}

export default NavbarItem
