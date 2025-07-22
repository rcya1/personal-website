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
  const normalColor = useColorModeValue('highlight-light', 'highlight-dark')
  const hoverColor = useColorModeValue(
    'highlight-dark-light',
    'highlight-darker-dark'
  )
  const activeColor = useColorModeValue(
    'highlight-darker-light',
    'highlight-darker-dark'
  )
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
        maxWidth="15em"
      >
        {children}
      </Button>
    </NextLink>
  )
}

export default SocialMediaButton
