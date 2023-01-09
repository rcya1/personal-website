import React, { FC } from 'react'
import type { NextPage } from 'next'
import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  ListItem,
  Spacer,
  Text,
  UnorderedList,
  VStack
} from '@chakra-ui/react'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'

import MainLayout from 'layouts/main-layout'
import SocialMediaButton from 'components/social-media-button'
import { BasicProps } from 'lib/react-utils'

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
  const workExperience = [
    [
      'Incoming Software Engineering Intern at Citadel LLC',
      'May 2023 - August 2023',
      ['Working on the post-trade engineering team']
    ],
    [
      'Software Engineering Intern at OPT Industries',
      'June 2022 - August 2022',
      [
        'Designed data analysis dashboard in Angular to create interactive visualizations of sensor data for 3D printers',
        'Migrated backend from REST API to GraphQL API, improving code performance, readability, and maintainability',
        'Designed efficient algorithms for processing millions of sensor readings to calculate printer productivity'
      ]
    ],
    [
      'Software Engineering Intern at Conservation X Labs',
      'January 2022',
      [
        'Developed user dashboard in React deployed to conservationists in Costa Rica in May 2022',
        'Created notification system to alert conservationists when endangered species were sighted on cameras',
        'Implemented shop that allowed users to purchase AI models over the cloud and deploy them to wildlife cameras'
      ]
    ],
    [
      'Research Assistant at Stevens Institute of Technology',
      'June 2018 - August 2020',
      [
        'Helped develop machine learning algorithm for processing ocean data with greater accuracy than NASA’s algorithm',
        'Optimized the runtime and memory usage to be competitive with NASA’s algorithm',
        'Coauthor of paper published in Volume 253 of Remote Sensing of Environment in 2020'
      ]
    ]
  ]

  const coursework = [
    'Advanced Algorithms (6.854)',
    'Distributed Computer Systems Engineering (6.824)',
    'Software Construction (6.031)',
    'Advances in Computer Vision (6.819)',
    '',
    'Theory of Computation (18.404)',
    'Linear Algebra (18.06)',
    'Probability and Random Variables (18.600)',
  ]

  const awards = [
    'Google Code Jam Round 2 Qualifier in 2021 and 2022',
    'USA Computing Olympiad Platinum Qualifier',
    'USA Math Olympiad Qualifier in 2021'
  ]

  return (
    <MainLayout>
      <Container pt={8}>
        <Flex direction="row" justifyContent="center" mb={12}>
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

        <Box mb={8}>
          <IndexHeading>Background</IndexHeading>
          <Text>
            Hi, I&apos;m Ryan! I&apos;m currently attending the Massachusetts Institute of
            Technology double majoring in computer science and math, and I&apos;m
            graduating in May 2025. I&apos;m currently interested in computer systems
            and optimizing software performance. Outside of school, I enjoy
            playing video games, solving math / programming problems, and
            working on random projects while learning new things.
          </Text>
        </Box>

        <Box mb={8}>
          <IndexHeading>Work Experience</IndexHeading>

          <Box mt={2}>
            {workExperience.map((workExp) => {
              return (
                <Box key={workExp[0] as string} mt={6}>
                  <Heading size="sm">{workExp[0]}</Heading>
                  <Text fontSize="sm">{workExp[1]}</Text>
                  <UnorderedList ml={5} mt={1}>
                    {(workExp[2] as string[]).map((bullet) => {
                      return <ListItem key={bullet as string}>{bullet} </ListItem>
                    })}
                  </UnorderedList>
                </Box>
              )
            })}
          </Box>
        </Box>

        <Box mb={8}>
          <IndexHeading>Coursework</IndexHeading>
          <Box mt={2}>
            <UnorderedList ml={5} mt={-1}>
              {coursework.map((course) => {
                if (course.length == 0) {
                  return <Spacer key={course} mt={3}/>
                }
                return <ListItem key={course}>{course}</ListItem>
              })}
            </UnorderedList>
          </Box>
        </Box>

        <Box mb={8}>
          <IndexHeading>Awards</IndexHeading>
          <Box mt={2}>
            <UnorderedList ml={5} mt={-1}>
              {awards.map((award) => {
                return <ListItem key={award}>{award}</ListItem>
              })}
            </UnorderedList>
          </Box>
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
