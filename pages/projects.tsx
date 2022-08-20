import type { NextPage } from 'next'
import { Box, Container, Heading, SimpleGrid } from '@chakra-ui/react'

import MainLayout from 'layouts/main-layout'
import ProjectPreview from 'components/project-preview'

const Projects: NextPage = () => {
  return (
    <MainLayout>
      <Container>
        <Box
          pt={4}
        >
          <Heading
            size='lg'
            textAlign='center'
            textDecoration='underline'
            textDecorationThickness='3px'
            textUnderlineOffset='8px'
          >
            Projects
          </Heading>
        </Box>
        <Box
          mt={7}
        >
          <SimpleGrid
            columns={[1, null, 2]}
            spacing='20px'
          >
            <ProjectPreview
              title="Year in Pixels Creator"
              href="/projects/year-in-pixels"
            />
            <ProjectPreview
              title="Test 2"
              href="https://google.com"
            />
            <ProjectPreview
              title="Test 3"
              href="https://google.com"
            />
            <ProjectPreview
              title="Test 4"
              href="https://google.com"
            />
          </SimpleGrid>
        </Box>
      </Container>
    </MainLayout>
  )
}

export default Projects
