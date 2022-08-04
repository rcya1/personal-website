import React, { FC } from 'react'
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

interface NavbarItemProps {
  title: string
  href: string
  active: boolean
}

const NavbarItem: FC<NavbarItemProps> = ({ title, href, active }) => {
  return (
    <NextLink
      href={href}
      passHref
    >
      <Link
        paddingX={2}
        fontWeight={active ? 'black' : 'normal'}
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
  )
}

export default NavbarItem
