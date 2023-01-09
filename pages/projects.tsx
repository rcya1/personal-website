import type { NextPage } from 'next'
import {
  Box,
  Card,
  Container,
  Heading,
  LinkBox,
  Text,
  Stack,
  CardBody,
  LinkOverlay,
  useColorModeValue,
  AspectRatio,
  SimpleGrid
} from '@chakra-ui/react'
import NextLink from 'next/link'
import NextImage from 'next/image'

import MainLayout from 'layouts/main-layout'

import yipThumbnail from 'public/projects/year-in-pixels.webp'
import gpsThumbnail from 'public/projects/golf-parameter-solver.webp'
import ppvThumbnail from 'public/projects/pure-pursuit-visualizer.webp'
import { ChakraAnimate } from 'lib/animate'
import { StaticImageData } from 'next/image'

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
       to visualize. Originally made for my high school robotics team to test the code and also learn more about the limitations of the algorithm.h'
    ]
  ]

  const cardColor = useColorModeValue('navbar-light', 'navbar-dark')
  const cardFontColor = useColorModeValue('text-light', 'text-dark')

  return (
    <MainLayout>
      <Container>
        <Box pt={6}>
          <Heading
            size="lg"
            textAlign="center"
            textDecoration="underline"
            textDecorationThickness="3px"
            textUnderlineOffset="8px"
          >
            Projects
          </Heading>
        </Box>
        <Box mt={-2}>
          {/* <SimpleGrid columns={[1, null, 2]} spacing="30px 40px"> */}
            {projects.map((project) => {
              return (
                <ChakraAnimate
                  whileHover={{
                    scale: 1.05,
                    transition: {
                      duration: 0.25,
                      ease: 'easeInOut'
                    }
                  }}
                >
                  <LinkBox>
                    <Card
                      direction="column"
                      mt={12}
                      borderRadius={10}
                      backgroundColor={cardColor}
                      color={cardFontColor}
                      width={{ base: '100%', md: '90%' }}
                      mx="auto"
                    >
                      <CardBody>
                        <Stack>
                          <AspectRatio ratio={5 / 3}>
                            <Box
                              width="100%"
                              borderRadius="10px"
                              overflow="hidden"
                              mx="auto"
                            >
                              <NextImage
                                src={project[1] as StaticImageData}
                                alt={project[0] as string}
                                objectFit="cover"
                              />
                            </Box>
                          </AspectRatio>
                          <Heading pt={2} size="md" textAlign="center">
                            <NextLink href={project[2] as string} passHref>
                              <LinkOverlay>{project[0] as string}</LinkOverlay>
                            </NextLink>
                          </Heading>
                          <Text py={0}>{project[3] as string} </Text>
                        </Stack>
                      </CardBody>
                    </Card>
                  </LinkBox>
                </ChakraAnimate>
              )
            })}
          {/* </SimpleGrid> */}
        </Box>
      </Container>
    </MainLayout>
  )
}

export default Projects
