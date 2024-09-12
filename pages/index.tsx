import React, { FC } from 'react'
import type { NextPage } from 'next'
import {
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

import Image from 'next/image'
import profile from 'public/profile.webp'

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
    ['Incoming Software Engineer at Jane Street', 'September 2025 - ?', []],
    [
      'Software Engineering Intern at Jane Street',
      'May 2024 - August 2024',
      [
        'Worked under both the Research / Trading Tools Team and the Reconciliations Dev Team'
      ]
    ],
    [
      'Software Engineering Intern at Citadel',
      'June 2023 - August 2023',
      [
        'Helped rewrite the Cost to Carry system, which allocates funding fees to desks at the firm',
        'Built three new user interfaces to explain cost to carry calculations, which helps hundreds of portfolio managers and traders understand and lower their costs',
        'Rewrote cost to carry data providers to improve latency 10x for users across the firm',
        'Fixed bugs in Treasury infrastructure to improve error handling and terminate tasks upon timeout'
      ]
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
        'Work was eventually integrated into NASA software',
        'Coauthor of "OC-SMART: A machine learning based data analysis platform for satellite ocean color sensors, 2020"'
      ]
    ]
  ]

  const coursework = [
    'Advanced Algorithms (6.854)',
    'Computer Systems Security (6.858)',
    'Distributed Computer Systems Engineering (6.824)',
    'Machine Learning (6.867)',
    'Computer Networks* (6.5820)',
    'Deep Learning* (6.7960)',
    'Software Performance Engineering (6.172)',
    'Software Construction (6.031)',
    'Computer Systems Engineering (6.033)',
    'Advances in Computer Vision (6.819)',
    '',
    'Theory of Computation (18.404)',
    'Fundamentals of Statistics (18.650)',
    'Algebra I (18.701)',
    'Linear Algebra (18.06)',
    'Probability and Random Variables (18.600)',
    '',
    'Chinese V (21G.105)'
  ]

  const awards = [
    'Google Code Jam Round 2 Qualifier in 2021 and 2022',
    'USA Computing Olympiad Platinum Qualifier',
    'USA Math Olympiad Qualifier in 2021',
    'ARML Local 2020 - 13th place individually'
  ]

  return (
    <MainLayout>
      <Container pt={8}>
        <Flex direction="row" justifyContent="center" mb={12}>
          <Box mr={12}>
            <Heading size="xl" mb={2} as="h1">
              Ryan Chang
            </Heading>
            <p>CS / Math student at MIT</p>
          </Box>
          <Box
            borderRadius="50px"
            width="100px"
            height="100px"
            overflow="hidden"
          >
            <Image src={profile} alt="Profile Picture" />
          </Box>
        </Flex>

        <Box mb={8}>
          <IndexHeading>Background</IndexHeading>
          <Text>
            Hi, I&apos;m Ryan! I&apos;m currently attending the Massachusetts
            Institute of Technology, and I&apos;m planning on graduating in May
            2025 with a double major in CS + Math and a Master&apos;s in CS. For
            my Master&apos;s, I&apos;m working under the PDOS group at MIT with
            Professor Fraans Kashoek and Ariel Szekely. Outside of school, I
            enjoy playing video games (especially TFT), solving math /
            programming problems, and working on random projects while learning
            new things.
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
                      return (
                        <ListItem key={bullet as string}>{bullet} </ListItem>
                      )
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
                  return <Spacer key={course} mt={3} />
                }
                return <ListItem key={course}>{course}</ListItem>
              })}
            </UnorderedList>
            <br />
            <Text>
              * indicates courses taken officially under listener, but I
              completed all assignments.
            </Text>
          </Box>
        </Box>

        <Box mb={8}>
          <IndexHeading>High School Awards</IndexHeading>
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
              GitHub
            </SocialMediaButton>
            <SocialMediaButton
              icon={<AiFillLinkedin />}
              href="https://www.linkedin.com/in/ryan-chang-105495215/"
            >
              Linkedin
            </SocialMediaButton>
          </VStack>
        </Box>
      </Container>
    </MainLayout>
  )
}

export default Home
