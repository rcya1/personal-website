import type { NextPage } from 'next'
import { Box, Container, Heading, SimpleGrid } from '@chakra-ui/react'

import MainLayout from 'layouts/main-layout'
import ProjectPreview from 'components/project-preview'

import yipThumbnail from 'public/projects/year-in-pixels.webp'
import gpsThumbnail from 'public/projects/golf-parameter-solver.webp'
import ppvThumbnail from 'public/projects/pure-pursuit-visualizer.webp'

// TODO: redo this page so that each project is a card with one half being a thumbnail and the other half being the title and the description
// every other row alternates which side is the thing

const Projects: NextPage = () => {
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
        <Box mt={10}>
          {/* <SimpleGrid columns={[1, null, 2]} spacing="30px 40px"> */}
            <ProjectPreview
              title="Year in Pixels Creator"
              href="https://year-in-pixels-creator.herokuapp.com/#/"
              thumbnail={yipThumbnail}
            />
            <ProjectPreview
              title="Golf Parameter Solver"
              href="https://github.com/rcya1/golf-parameter-solver"
              thumbnail={gpsThumbnail}
            />
            <ProjectPreview
              title="Pure Pursuit Visualizer"
              href="https://github.com/rcya1/pure-pursuit-visualizer"
              thumbnail={ppvThumbnail}
            />
          {/* </SimpleGrid> */}
        </Box>
      </Container>
    </MainLayout>
  )
}

export default Projects
