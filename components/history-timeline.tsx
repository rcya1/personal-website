import React from 'react'
import {
  Box,
  Text,
  ListItem,
  UnorderedList,
  ListIcon,
  useColorModeValue
} from '@chakra-ui/react'
import { BsFillDiamondFill } from 'react-icons/bs'

const HistoryTimeline = () => {
  let markingsColor = useColorModeValue('black', 'white')
  let secondaryColor = useColorModeValue('gray.600', 'gray.400')

  return (
    <Box>
      <UnorderedList position="relative" listStyleType="none">
        <ListItem mb={2}>
          <Text fontSize="xs" textColor={secondaryColor}>
            <ListIcon as={BsFillDiamondFill} color={markingsColor} />
            2022
          </Text>
          <Text ml={5} fontSize="md">
            Did some stuff
          </Text>
        </ListItem>
        <ListItem mb={2}>
          <Text fontSize="xs" textColor={secondaryColor}>
            <ListIcon as={BsFillDiamondFill} color={markingsColor} />
            2022
          </Text>
          <Text ml={5} fontSize="md">
            Did some stuff
          </Text>
        </ListItem>
        <ListItem mb={2}>
          <Text fontSize="xs" textColor={secondaryColor}>
            <ListIcon as={BsFillDiamondFill} color={markingsColor} />
            2022
          </Text>
          <Text ml={5} fontSize="md">
            Did some stuff
          </Text>
        </ListItem>

        <Box
          position="absolute"
          height="calc(100% - 35px)"
          top="5px"
          left="5.3px"
          borderLeft="2px"
          borderColor={markingsColor}
        ></Box>
      </UnorderedList>
    </Box>
  )
}

export default HistoryTimeline
