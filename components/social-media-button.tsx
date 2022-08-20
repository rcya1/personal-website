import { Button, useColorModeValue } from '@chakra-ui/react'
import React, { FC } from 'react'

interface SocialMediaButtonProps {
  icon: React.ReactElement
  children: React.ReactNode
}

const SocialMediaButton: FC<SocialMediaButtonProps> = ({ icon, children }: SocialMediaButtonProps) => {
  const normalColor = useColorModeValue('green.100', 'blue.700')
  const hoverColor = useColorModeValue('green.200', 'blue.800')
  const activeColor = useColorModeValue('green.300', 'blue.900')

  return (
    <Button
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
    >
      {children}
    </Button>
  )
}

export default SocialMediaButton

