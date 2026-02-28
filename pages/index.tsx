import React, { FC } from 'react'
import type { NextPage } from 'next'
import {
  Box,
  BoxProps,
  Flex,
  Heading,
  Link,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai'

import MainLayout from 'layouts/main-layout'
import SocialMediaButton from 'components/social-media-button'
import { BasicProps } from 'lib/react-utils'
import { ChakraAnimate } from 'lib/animate'
import {
  glassBgLight,
  glassBgDark,
  glassBorderLight,
  glassBorderDark,
  glassShadowLight,
  glassShadowDark
} from 'lib/theme'

import Image from 'next/image'
import profile from 'public/profile.webp'
import Meta from 'components/meta'

const GlassCard: FC<BoxProps> = ({ children, mb = 6, p = 8, ...rest }) => {
  const bg = useColorModeValue(glassBgLight, glassBgDark)
  const border = useColorModeValue(glassBorderLight, glassBorderDark)
  const shadow = useColorModeValue(glassShadowLight, glassShadowDark)

  return (
    <Box
      bg={bg}
      backdropFilter="blur(16px)"
      borderRadius="2xl"
      borderWidth="1px"
      borderColor={border}
      boxShadow={shadow}
      p={p}
      mb={mb}
      {...rest}
    >
      {children}
    </Box>
  )
}

const SectionHeading: FC<BasicProps> = ({ children }: BasicProps) => {
  const accentColor = useColorModeValue('accent-light', 'accent-dark')

  return (
    <Heading
      size="sm"
      mb={5}
      textTransform="uppercase"
      letterSpacing="widest"
      color={accentColor}
      fontWeight="bold"
    >
      {children}
    </Heading>
  )
}

const Home: NextPage = () => {
  const workExperience = [
    ['SWE at Jane Street', 'September 2025 – Present', []],
    [
      'SWE Intern at Jane Street',
      'May 2024 – August 2024',
      [
        'Worked under both the Research / Trading Tools Team and the Reconciliations Dev Team'
      ]
    ],
    [
      'SWE Intern at Citadel',
      'June 2023 – August 2023',
      ['Worked under the Cost to Carry Team under Treasury Engineering']
    ],
    [
      'SWE Intern at OPT Industries',
      'June 2022 – August 2022',
      [
        'Designed data analysis dashboard in Angular to create interactive visualizations of sensor data for 3D printers'
      ]
    ],
    [
      'SWE Intern at Conservation X Labs',
      'January 2022',
      [
        'Developed user dashboard in React deployed to conservationists in Costa Rica in May 2022'
      ]
    ],
    [
      'Research Assistant at Stevens Institute of Technology',
      'June 2018 – August 2020',
      [
        'Helped develop machine learning algorithm for processing ocean data',
        'Coauthor of "OC-SMART: A machine learning based data analysis platform for satellite ocean color sensors, 2020"'
      ]
    ]
  ]

  const photoBorderColor = useColorModeValue(
    'rgba(245,158,11,0.5)',
    'rgba(251,191,36,0.4)'
  )
  const photoGlow = useColorModeValue(
    '0 0 0 4px rgba(245,158,11,0.15), 0 8px 32px rgba(0,0,0,0.12)',
    '0 0 0 4px rgba(251,191,36,0.12), 0 8px 32px rgba(0,0,0,0.5)'
  )
  const subtitleColor = useColorModeValue('gray.600', 'gray.400')
  const dotColor = useColorModeValue('accent-light', 'accent-dark')
  const dotGlow = useColorModeValue(
    '0 0 8px rgba(245,158,11,0.5)',
    '0 0 8px rgba(251,191,36,0.4)'
  )
  const dividerColor = useColorModeValue(
    'rgba(0,0,0,0.08)',
    'rgba(255,255,255,0.08)'
  )

  return (
    <>
      <Meta />
      <MainLayout maxW="56rem">
        <Box pt={6} pb={8}>
          {/* Hero Section */}
          <ChakraAnimate
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            // @ts-ignore
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <GlassCard mb={5} p={{ base: 8, md: 10 }}>
              <Flex direction="column" align="center" textAlign="center">
                {/* Profile photo */}
                <Box
                  borderRadius="full"
                  width={{ base: '120px', md: '148px' }}
                  height={{ base: '120px', md: '148px' }}
                  overflow="hidden"
                  mb={5}
                  borderWidth="3px"
                  borderColor={photoBorderColor}
                  boxShadow={photoGlow}
                  flexShrink={0}
                >
                  <Image src={profile} alt="Profile Picture" />
                </Box>

                {/* Name */}
                <Heading
                  as="h1"
                  size="2xl"
                  fontWeight="bold"
                  letterSpacing="-0.02em"
                  mb={2}
                >
                  Ryan Chang
                </Heading>

                {/* Title */}
                <Text fontSize="lg" fontWeight="medium" mb={1}>
                  Software Engineer at Jane Street
                </Text>

                {/* Details */}
                <Text fontSize="sm" color={subtitleColor} mb={7}>
                  MIT Class of 2025 &middot; CS + Math
                </Text>

                {/* Social links */}
                <Flex gap={3} wrap="wrap" justify="center">
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
                </Flex>
              </Flex>
            </GlassCard>
          </ChakraAnimate>

          {/* Background Section */}
          <ChakraAnimate
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            // @ts-ignore
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          >
            <GlassCard mb={5}>
              <SectionHeading>Background</SectionHeading>
              <Text lineHeight="tall">
                Hi, I&apos;m Ryan! I&apos;m currently a Software Engineer at
                Jane Street. I graduated from MIT in 2025, with a double major
                in CS + Math and a MEng in CS. For my MEng, I worked with{' '}
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
            </GlassCard>
          </ChakraAnimate>

          {/* Work Experience Section */}
          <ChakraAnimate
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            // @ts-ignore
            transition={{ duration: 0.5, delay: 0.18, ease: 'easeOut' }}
          >
            <GlassCard mb={0}>
              <SectionHeading>Work Experience</SectionHeading>

              <Box>
                {workExperience.map((workExp, i) => (
                  <Box key={workExp[0] as string}>
                    <Flex gap={4} align="flex-start" py={4}>
                      {/* Amber dot indicator */}
                      <Box
                        w="8px"
                        h="8px"
                        borderRadius="full"
                        bg={dotColor}
                        boxShadow={dotGlow}
                        mt="6px"
                        flexShrink={0}
                      />
                      <Box flex={1}>
                        <Heading size="xs" fontWeight="semibold" mb={0.5}>
                          {workExp[0] as string}
                        </Heading>
                        <Text
                          fontSize="xs"
                          color={subtitleColor}
                          fontWeight="medium"
                        >
                          {workExp[1] as string}
                        </Text>
                      </Box>
                    </Flex>
                    {i < workExperience.length - 1 && (
                      <Box h="1px" bg={dividerColor} ml="20px" />
                    )}
                  </Box>
                ))}
              </Box>
            </GlassCard>
          </ChakraAnimate>
        </Box>
      </MainLayout>
    </>
  )
}

export default Home
