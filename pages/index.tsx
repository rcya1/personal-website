import React, { FC } from 'react'
import type { NextPage } from 'next'
import {
  Avatar,
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Text,
  VStack
} from '@chakra-ui/react'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'

import MainLayout from 'layouts/main-layout'
import SocialMediaButton from 'components/social-media-button'
import { BasicProps } from 'lib/react-utils'
import HistoryTimeline from 'components/history-timeline'

const IndexHeading: FC<BasicProps> = ({ children }: BasicProps) => {
  return (
    <Heading
      size="md"
      mb={4}
      textDecoration="underline"
      textUnderlineOffset="6px"
      textDecorationThickness="2px"
    >
      {children}
    </Heading>
  )
}

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Container pt={4}>
        <Flex direction="row" justifyContent="center">
          <Box mr={12}>
            <Heading size="xl" mb={2}>
              Ryan Chang
            </Heading>
            <p>CS / Math student at MIT</p>
          </Box>
          <Avatar
            size="xl"
            name="Ryan Chang"
            src="https://bit.ly/dan-abramov"
          ></Avatar>
        </Flex>

        <Divider orientation="horizontal" mt={4} mb={8} />

        <Box mb={8}>
          <IndexHeading>Background</IndexHeading>
          <Text textAlign="justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            mollis ipsum luctus eros fringilla, non tristique justo lacinia.
            Integer faucibus aliquam quam sed hendrerit. Curabitur id risus
            ipsum. Curabitur malesuada urna nec arcu suscipit interdum.
            Phasellus in sapien eros. Phasellus vel eleifend enim. Donec mattis
            lacinia imperdiet. Etiam dignissim libero et augue bibendum aliquam.
            Fusce feugiat maximus leo eu pulvinar. Morbi luctus porta dolor,
            vitae suscipit augue facilisis sit amet. Sed lobortis, nisl ac
            scelerisque venenatis, velit nulla tincidunt purus, non tristique
            tortor arcu et nunc. Donec eleifend justo at sagittis laoreet.
            Aenean porta nunc non arcu elementum sollicitudin.
          </Text>
        </Box>

        <Box mb={8}>
          <IndexHeading>History</IndexHeading>
          <HistoryTimeline />
        </Box>

        <Box>
          <IndexHeading>Social Media</IndexHeading>
          <VStack spacing={2} mt={6} align="start">
            <SocialMediaButton
              icon={<AiFillGithub />}
              href="https://github.com/rcya1"
            >
              rcya1
            </SocialMediaButton>
            <SocialMediaButton
              icon={<AiFillLinkedin />}
              href="https://www.linkedin.com/in/ryan-chang-105495215/"
            >
              Ryan Chang
            </SocialMediaButton>
          </VStack>
        </Box>
      </Container>
    </MainLayout>
  )
}

export default Home
