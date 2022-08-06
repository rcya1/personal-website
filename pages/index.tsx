import React, { FC } from 'react'
import type { NextPage } from 'next'
import { Avatar, Box, Container, Divider, Flex, Heading, Text, chakra } from '@chakra-ui/react'

import MainLayout from 'layouts/main-layout'

interface StyledHeadingProps {
  children: React.ReactNode
}

const StyledHeading: FC<StyledHeadingProps> = ({ children }: StyledHeadingProps) => {
  return (<Heading
    size='md'
    mb={4}
    textDecoration='underline'
    textUnderlineOffset='6px'
    textDecorationThickness='3px'
  >
    { children }
  </Heading>)
}

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Container
        pt={4}
      >
        <Flex
          direction='row'
          justifyContent='center'
        >
          <Box
            mr={12}
          >
            <Heading
              size='xl'
              mb={2}
            >
              Ryan Chang
            </Heading>
            <p>CS / Math / Econ student at MIT</p>
          </Box>
          <Avatar
            size='xl'
            name='Ryan Chang'
            src='https://bit.ly/dan-abramov'
          >
          </Avatar>
        </Flex>

        <Divider
          orientation='horizontal'
          mt={4}
          mb={8}
        />

        <Box
          mb={8}
        >
          <StyledHeading>
            Background
          </StyledHeading>
          <Text
            textAlign='justify'
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nulla mollis ipsum luctus eros fringilla, non tristique justo lacinia.
            Integer faucibus aliquam quam sed hendrerit.
            Curabitur id risus ipsum. Curabitur malesuada urna nec arcu suscipit interdum. 
            Phasellus in sapien eros. Phasellus vel eleifend enim. Donec mattis lacinia imperdiet.
            Etiam dignissim libero et augue bibendum aliquam. Fusce feugiat maximus leo eu pulvinar.
            Morbi luctus porta dolor, vitae suscipit augue facilisis sit amet.
            Sed lobortis, nisl ac scelerisque venenatis, velit nulla tincidunt purus,
            non tristique tortor arcu et nunc. Donec eleifend justo at sagittis laoreet.
            Aenean porta nunc non arcu elementum sollicitudin. 
          </Text>
        </Box>

        <Box>
          <StyledHeading>
            History
          </StyledHeading>
        </Box>

        <Box>
          <StyledHeading>
            Social Media
          </StyledHeading>
        </Box>

      </Container>
    </MainLayout>
  )
}

export default Home
