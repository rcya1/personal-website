import React, { FC } from 'react'
import { Box, Container } from '@chakra-ui/react'
import Head from 'next/head'
import { BasicProps } from 'lib/react-utils'
import Navbar from 'components/navbar'
import Footer from 'components/footer'
import { ChakraAnimate } from 'lib/animate'

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 }
}

const MainLayout: FC<BasicProps> = ({ children }) => {
  return (
    <Box as="main" pb={8}>
      <Navbar />

      <Container maxW="container.md" mt={16}>
        <ChakraAnimate
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          // @ts-ignore
          transition={{ duration: 0.4 }}
          style={{ position: 'relative' }}
        >
          {children}
        </ChakraAnimate>
      </Container>

      <Footer />
    </Box>
  )
}

export default MainLayout
