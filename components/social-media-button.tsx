import { Button, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import React, { FC } from 'react'

interface SocialMediaButtonProps {
  icon: React.ReactElement
  href: string
  children: React.ReactNode
}

const SocialMediaButton: FC<SocialMediaButtonProps> = ({
  icon,
  href,
  children
}: SocialMediaButtonProps) => {
  const normalColor = useColorModeValue('#f0b6a8', 'blue.700')
  const hoverColor = useColorModeValue('#d8a497', 'blue.800')
  const activeColor = useColorModeValue('#c09286', 'blue.900')
  const fontWeight = useColorModeValue('bold', 'semibold')

  return (
    <NextLink href={href} passHref>
      <Button
        as="a"
        leftIcon={icon}
        backgroundColor={normalColor}
        _hover={{
          backgroundColor: hoverColor
        }}
        _active={{
          backgroundColor: activeColor
        }}
        py={2}
        px={3}
        mb={2}
        fontWeight={fontWeight}
      >
        {children}
      </Button>
    </NextLink>
  )
}

export default SocialMediaButton
