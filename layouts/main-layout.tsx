import React, { FC } from 'react'
import { Box, Container } from '@chakra-ui/react'
import Head from 'next/head'

import Navbar from 'components/navbar'
import Footer from 'components/footer'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
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

