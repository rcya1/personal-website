import type { NextPage } from 'next'
import {
  Box,
  Container,
  Heading,
  LinkBox,
  Text,
  LinkOverlay,
  useColorModeValue,
  AspectRatio,
  SimpleGrid
} from '@chakra-ui/react'
import NextLink from 'next/link'
import NextImage from 'next/image'

import MainLayout from 'layouts/main-layout'

import lilyThumbnail from 'public/projects/lilypad.webp'
import yipThumbnail from 'public/projects/year-in-pixels.webp'
import gpsThumbnail from 'public/projects/golf-parameter-solver.webp'
import ppvThumbnail from 'public/projects/pure-pursuit-visualizer.webp'
import { ChakraAnimate } from 'lib/animate'
import { StaticImageData } from 'next/image'
import { Key } from 'react'
import Meta from 'components/meta'
import {
  glassBgLight,
  glassBgDark,
  glassBorderLight,
  glassBorderDark,
  glassShadowLight,
  glassShadowDark
} from 'lib/theme'

const Projects: NextPage = () => {
  const projects = [
    [
      'Year in Pixels Creator',
      yipThumbnail,
      'https://year-in-pixels-creator.herokuapp.com/#/',
      'A journaling web app for keeping track of your mood throughout the year through colors. Each day, you put in a color representing how the day went \
       and write a note about it. At the end of the year, you have a grid full of colors representing your entire year in a colorful board of pixels.'
    ],
    [
      'Lilypad',
      lilyThumbnail,
      'https://github.com/rcya1/lilypad',
      'My collection of notes throughout college, including a custom Markdown compiler, a VSCode extension for previewing and browsing notes, and a website \
      for hosting the notes online.'
    ],
    [
      'Golf Parameter Solver',
      gpsThumbnail,
      'https://github.com/rcya1/golf-parameter-solver',
      'A simulation tool that launches up to tens of thousands of golf shots with varying power, pitch, and yaw to analyze the game of golf and visualize \
       exactly which golf shots would go in for a randomly generated terrain.'
    ],
    [
      'Pure Pursuit Visualizer',
      ppvThumbnail,
      'https://rcya1.github.io/pure-pursuit-visualizer/',
      'An interactive implentation of the adaptive pure pursuit algorithm for path following that allows the user to customize the path and parameters \
       to visualize. Originally made for my high school robotics team to test the code and also learn more about the limitations of the algorithm.'
    ]
  ]

  const glassBg = useColorModeValue(glassBgLight, glassBgDark)
  const glassBorder = useColorModeValue(glassBorderLight, glassBorderDark)
  const glassShadow = useColorModeValue(glassShadowLight, glassShadowDark)
  const hoverBorder = useColorModeValue('#f59e0b', '#fbbf24')
  const hoverShadow = useColorModeValue(
    '0 8px 40px rgba(245,158,11,0.18), 0 2px 8px rgba(0,0,0,0.08)',
    '0 8px 40px rgba(251,191,36,0.12), 0 2px 8px rgba(0,0,0,0.4)'
  )
  const subtitleColor = useColorModeValue('gray.600', 'gray.400')
  const headingColor = useColorModeValue('#1c1917', '#e8e4f0')
  const accentColor = useColorModeValue('accent-light', 'accent-dark')

  return (
    <>
      <Meta
        title="Ryan Chang - Projects"
        description="Showcasing some of my personal projects I've made over the years"
      />
      <MainLayout maxW="container.lg">
        <Container maxW="container.lg">
          <Box pt={8} pb={4} textAlign="center">
            <Heading size="xl" letterSpacing="-0.02em">
              Projects
            </Heading>
          </Box>

          <Box mt={8}>
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              spacing={{ base: 5, md: 6 }}
              maxW="90%"
              mx="auto"
              alignItems="stretch"
            >
              {projects.map((project) => (
                <ChakraAnimate
                  whileHover={{
                    scale: 1.02,
                    transition: {
                      duration: 0.2,
                      ease: 'easeOut'
                    }
                  }}
                  key={project[0] as Key}
                >
                  <LinkBox height="100%">
                    <Box
                      height="100%"
                      display="flex"
                      flexDirection="column"
                      bg={glassBg}
                      backdropFilter="blur(16px)"
                      borderRadius="2xl"
                      borderWidth="1px"
                      borderColor={glassBorder}
                      boxShadow={glassShadow}
                      overflow="hidden"
                      transition="border-color 0.2s ease, box-shadow 0.2s ease"
                      _hover={{
                        borderColor: hoverBorder,
                        boxShadow: hoverShadow
                      }}
                    >
                      {/* Image */}
                      <AspectRatio ratio={5 / 3}>
                        <Box width="100%" overflow="hidden">
                          <NextImage
                            src={project[1] as StaticImageData}
                            alt={project[0] as string}
                            objectFit="cover"
                          />
                        </Box>
                      </AspectRatio>

                      {/* Card content */}
                      <Box p={5} flex={1} display="flex" flexDirection="column">
                        <Heading
                          size="sm"
                          fontWeight="semibold"
                          mb={2}
                          color={headingColor}
                          letterSpacing="-0.01em"
                        >
                          <NextLink href={project[2] as string} passHref>
                            <LinkOverlay>{project[0] as string}</LinkOverlay>
                          </NextLink>
                        </Heading>

                        <Text
                          fontSize="sm"
                          color={subtitleColor}
                          lineHeight="tall"
                        >
                          {project[3] as string}
                        </Text>
                      </Box>
                    </Box>
                  </LinkBox>
                </ChakraAnimate>
              ))}
            </SimpleGrid>
          </Box>
        </Container>
      </MainLayout>
    </>
  )
}

export default Projects
