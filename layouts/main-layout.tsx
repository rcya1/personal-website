import React, { FC } from 'react'
import { Box, Container } from '@chakra-ui/react'
import useWindowDimensions, { BasicProps } from 'lib/react-utils'
import Navbar from 'components/navbar'
import Footer from 'components/footer'
import { ChakraAnimate } from 'lib/animate'
// @ts-ignore
import Scrollbars from 'react-custom-scrollbars'

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 }
}

const MainLayout: FC<BasicProps> = ({ children }) => {
  const { width, height } = useWindowDimensions()

  return (
    <Scrollbars
      universal={true}
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      autoHeight
      autoHeightMax={height}
      autoHeightMin={height}
    >
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
    </Scrollbars>
  )
}

export default MainLayout
