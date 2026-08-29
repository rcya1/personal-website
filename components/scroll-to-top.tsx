import { IconButton, useColorModeValue } from '@chakra-ui/react'
import { LuArrowUp } from 'react-icons/lu'
import {
  glassBgLight,
  glassBgDark,
  glassBorderLight,
  glassBorderDark,
  glassShadowLight,
  glassShadowDark
} from 'lib/theme'

const ScrollToTop = ({
  visible,
  onClick
}: {
  visible: boolean
  onClick: () => void
}) => {
  const glassBg = useColorModeValue(glassBgLight, glassBgDark)
  const glassBorder = useColorModeValue(glassBorderLight, glassBorderDark)
  const glassShadow = useColorModeValue(glassShadowLight, glassShadowDark)
  const accentColor = useColorModeValue('#f59e0b', '#fbbf24')
  const hoverShadow = useColorModeValue(
    '0 6px 32px rgba(245,158,11,0.20)',
    '0 6px 32px rgba(251,191,36,0.15)'
  )

  return (
    <IconButton
      aria-label="Back to top"
      icon={<LuArrowUp />}
      onClick={onClick}
      position="fixed"
      bottom={{ base: 5, md: 8 }}
      right={{ base: 5, md: 8 }}
      zIndex={10}
      size="lg"
      isRound
      bg={glassBg}
      backdropFilter="blur(12px)"
      borderWidth="1px"
      borderColor={glassBorder}
      boxShadow={glassShadow}
      opacity={visible ? 1 : 0}
      transform={visible ? 'translateY(0)' : 'translateY(12px)'}
      pointerEvents={visible ? 'auto' : 'none'}
      transition="opacity 0.25s ease, transform 0.25s ease, border-color 0.2s ease, box-shadow 0.2s ease"
      _hover={{
        bg: glassBg,
        color: accentColor,
        borderColor: accentColor,
        boxShadow: hoverShadow
      }}
    />
  )
}

export default ScrollToTop
