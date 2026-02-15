import React, { FC } from 'react'
import type { NextPage } from 'next'
import {
  Box,
  Container,
  Flex,
  Heading,
  Link,
  ListItem,
  SimpleGrid,
  Text,
  UnorderedList
} from '@chakra-ui/react'
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai'

import MainLayout from 'layouts/main-layout'
import SocialMediaButton from 'components/social-media-button'
import { BasicProps } from 'lib/react-utils'

import Image from 'next/image'
import profile from 'public/profile.webp'
import Meta from 'components/meta'

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
      'SWE at Jane Street',
      'September 2025 - Current',
      ['Working under the Research / Trading Tools Team']
    ],
    [
      'SWE Intern at Jane Street',
      'May 2024 - August 2024',
      [
        'Worked under both the Research / Trading Tools Team and the Reconciliations Dev Team'
      ]
    ],
    [
      'SWE Intern at Citadel',
      'June 2023 - August 2023',
      [
        'Worked under the Cost to Carry Team under Treasury Engineering'
        // 'Helped rewrite the Cost to Carry system, which allocates funding fees to desks at the firm',
        // 'Built three new user interfaces to explain cost to carry calculations, which helps hundreds of portfolio managers and traders understand and lower their costs',
        // 'Rewrote cost to carry data providers to improve latency 10x for users across the firm',
        // 'Fixed bugs in Treasury infrastructure to improve error handling and terminate tasks upon timeout'
      ]
    ],
    [
      'SWE Intern at OPT Industries',
      'June 2022 - August 2022',
      [
        'Designed data analysis dashboard in Angular to create interactive visualizations of sensor data for 3D printers'
        // 'Migrated backend from REST API to GraphQL API, improving code performance, readability, and maintainability',
        // 'Designed efficient algorithms for processing millions of sensor readings to calculate printer productivity'
      ]
    ],
    [
      'SWE Intern at Conservation X Labs',
      'January 2022',
      [
        'Developed user dashboard in React deployed to conservationists in Costa Rica in May 2022'
        // 'Created notification system to alert conservationists when endangered species were sighted on cameras',
        // 'Implemented shop that allowed users to purchase AI models over the cloud and deploy them to wildlife cameras'
      ]
    ],
    [
      'Research Assistant at Stevens Institute of Technology',
      'June 2018 - August 2020',
      [
        'Helped develop machine learning algorithm for processing ocean data at the Light and Life Lab',
        // 'Optimized the runtime and memory usage to be competitive with NASA’s algorithm',
        // 'Work was eventually integrated into NASA software',
        'Coauthor of "OC-SMART: A machine learning based data analysis platform for satellite ocean color sensors, 2020"'
      ]
    ]
  ]

  const awards = [
    'Google Code Jam Round 2 Qualifier in 2021 and 2022',
    'USA Computing Olympiad Platinum Qualifier',
    'USA Math Olympiad Qualifier in 2021',
    'ARML Local 2020 - 13th place individually'
  ]

  const itemHeight = 90 // Approximate height of each item
  const timelineHeight = workExperience.length * itemHeight

  return (
    <>
      <Meta />
      <MainLayout>
        <Container pt={8}>
          <Flex direction="row" justifyContent="center" mb={12}>
            <Box mr={12}>
              <Heading size="xl" mb={2} as="h1">
                Ryan Chang
              </Heading>
              <p>SWE at Jane Street</p>
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
              Hi, I&apos;m Ryan! I&apos;m currently a Software Engineer at Jane
              Street. I graduated from the MIT in 2025, with a double major in
              CS + Math and a MEng in CS. For my MEng, I&apos;m worked with{' '}
              <Link href="https://people.csail.mit.edu/kaashoek/" isExternal>
                Frans Kaashoek
              </Link>{' '}
              and{' '}
              <Link href="https://arielszekely.github.io/" isExternal>
                Ariel Szekely
              </Link>{' '}
              on improving{' '}
              <Link href="https://github.com/mit-pdos/sigmaos" isExternal>
                SigmaOS
              </Link>
              , a cloud operating system for optimizing both serverless and
              microservice applications. In my free time, I like playing video
              games (esp. TFT).
            </Text>
          </Box>

          <Box mb={8}>
            <IndexHeading>Work Experience</IndexHeading>

            <Box mt={2}>
              <UnorderedList ml={5} mt={1}>
                {workExperience.map((workExp) => {
                  return (
                    <ListItem key={workExp[0] as string} mt={6}>
                      <Heading size="sm">{workExp[0]}</Heading>
                      <Text fontSize="sm">{workExp[1]}</Text>
                    </ListItem>
                  )
                })}
              </UnorderedList>
            </Box>
          </Box>

          <Box>
            <IndexHeading>Social Media</IndexHeading>

            <SimpleGrid
              columns={{ base: 1, md: 2 }} // 1 column on small screens, 2 on medium+
              spacing={2}
              mt={6}
            >
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
                LinkedIn
              </SocialMediaButton>

              <SocialMediaButton
                icon={<AiFillInstagram />}
                href="https://www.instagram.com/chang.ryan1/"
              >
                Instagram
              </SocialMediaButton>
            </SimpleGrid>
          </Box>
        </Container>
      </MainLayout>
    </>
  )
}

export default Home
