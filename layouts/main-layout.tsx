import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Box, Container } from '@chakra-ui/react'
import useWindowDimensions, { BasicProps } from 'lib/react-utils'
import Footer from 'components/footer'
import ScrollToTop from 'components/scroll-to-top'
import ThemeToggle from 'components/theme-toggle'
import { ChakraAnimate } from 'lib/animate'
import { ScrollViewContext } from 'lib/scroll'
// @ts-ignore
import Scrollbars from 'react-custom-scrollbars'

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -20 }
}

interface Props extends BasicProps {
  maxW?: string
}

const MainLayout: FC<Props> = ({ children, maxW }) => {
  const [isClient, setIsClient] = useState(false)
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const scrollbarsRef = useRef<any>(null)
  useEffect(() => {
    setIsClient(true)
  }, [])

  const { height } = useWindowDimensions()

  const getScrollView = useCallback(
    () => (scrollbarsRef.current?.view as HTMLElement) ?? null,
    []
  )

  const content = (
    <Box as="main" pb={8}>
      <Container maxW={maxW ? maxW : 'container.md'} mt={{ base: 16, md: 20 }}>
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

  return (
    <ScrollViewContext.Provider value={getScrollView}>
      <ThemeToggle />

      {isClient ? (
        <Scrollbars
          ref={scrollbarsRef}
          universal={true}
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeight
          autoHeightMax={height}
          autoHeightMin={height}
          onScrollFrame={(values: any) => {
            setShowScrollToTop(values.scrollTop > height / 2)
          }}
        >
          {content}

          <ScrollToTop
            visible={showScrollToTop}
            onClick={() => {
              const view = getScrollView()
              if (view) view.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          />
        </Scrollbars>
      ) : (
        <div>{content}</div>
      )}
    </ScrollViewContext.Provider>
  )
}

export default MainLayout
