import type { NextPage } from 'next'
import { Box, Container, Heading } from '@chakra-ui/react'

import MainLayout from 'layouts/main-layout'

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Container
        pt={4}
      >
        <Box>
          <Heading>Ryan Chang</Heading>
          <p>CS / Math / Econ student at MIT</p>
        </Box>
      </Container>

      <Container mt={1000}>
        <p>Test</p>
      </Container>
    </MainLayout>
  )
}

export default Home
