import React, { FC } from 'react'
import { Box, Container } from '@chakra-ui/react'
import Head from 'next/head'
import { BasicProps } from 'lib/react-utils'
import Navbar from 'components/navbar'
import Footer from 'components/footer'

const MainLayout: FC<BasicProps> = ({ children }) => {
  return (
    <Box 
      as='main'
      pb={8}
    >
      <Head>
      </Head>

      <Navbar />

      <Container 
        maxW='container.md'
        mt={16}
      >
        { children }
      </Container>

      <Footer />
    </Box>
  )
}

export default MainLayout

