import type { NextPage } from 'next'

import MainLayout from 'layouts/main-layout'
import { Box, Container, Heading } from '@chakra-ui/react'

const YearInPixels: NextPage = () => {
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
              Year in Pixels Creator
            </Heading>
          </Box>
      </Container>
    </MainLayout>
  )
}

export default YearInPixels

