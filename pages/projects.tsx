import type { NextPage } from 'next'
import { Box, Container, Heading } from '@chakra-ui/react'

import MainLayout from 'layouts/main-layout'

const Projects: NextPage = () => {
  return (
    <MainLayout>
      <Container>
        <Box>
          <Heading>Projects</Heading>
        </Box>
      </Container>

      <Container mt={1000}>
        <p>Test</p>
      </Container>
    </MainLayout>
  )
}

export default Projects

