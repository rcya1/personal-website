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

  const events = [
    ['May - Aug 2023', 'Upcoming Software Engineering Internship at Citadel'],
    ['June - Aug 2022', 'Software Engineering Internship at OPT Industries'],
    ['Jan 2022', 'Software Engineering Internship at Conservation X Labs'],
    ['Sep 2021', 'Started school at Massachusetts Institute of Technology'],
    ['Jun 2021', 'Graduated from Union County Magnet High School'],
    ['Jul 2018 - Aug 2020', 'Research at Stevens Institute of Technology'],
  ]

  return (
    <Box>
      <UnorderedList position="relative" listStyleType="none">
        {events.map((event) => {
          return (
            <ListItem mb={2} key={event[1]}>
              <Text fontSize="xs" textColor={secondaryColor}>
                <ListIcon as={BsFillDiamondFill} color={markingsColor} />
                {event[0]}
              </Text>
              <Text ml={5} fontSize="md">
                {event[1]}
              </Text>
            </ListItem>
          )
        })}

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
