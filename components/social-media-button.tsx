import { Box, Flex, Link, useColorModeValue } from '@chakra-ui/react'
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
  const bg = useColorModeValue('rgba(255,255,255,0.55)', 'rgba(255,255,255,0.07)')
  const border = useColorModeValue('rgba(255,255,255,0.8)', 'rgba(255,255,255,0.12)')
  const hoverBg = useColorModeValue('rgba(245,158,11,0.12)', 'rgba(251,191,36,0.12)')
  const hoverBorder = useColorModeValue('#f59e0b', '#fbbf24')
  const hoverShadow = useColorModeValue(
    '0 4px 16px rgba(245,158,11,0.2)',
    '0 4px 16px rgba(251,191,36,0.15)'
  )
  const textColor = useColorModeValue('#1c1917', '#e8e4f0')
  const iconColor = useColorModeValue('#f59e0b', '#fbbf24')

  return (
    <NextLink href={href} passHref>
      <Link
        display="inline-flex"
        alignItems="center"
        gap={2}
        px={4}
        py={2}
        borderRadius="full"
        bg={bg}
        backdropFilter="blur(8px)"
        borderWidth="1px"
        borderColor={border}
        color={textColor}
        fontSize="sm"
        fontWeight="medium"
        textDecoration="none"
        transition="all 0.2s ease"
        _hover={{
          textDecoration: 'none',
          bg: hoverBg,
          borderColor: hoverBorder,
          transform: 'translateY(-1px)',
          boxShadow: hoverShadow
        }}
        _active={{ transform: 'translateY(0)' }}
      >
        <Box as="span" color={iconColor} fontSize="lg" lineHeight={1}>
          {icon}
        </Box>
        {children}
      </Link>
    </NextLink>
  )
}

export default SocialMediaButton
