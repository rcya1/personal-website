import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import theme from 'lib/theme'

import '@fontsource/raleway/700.css'
import '@fontsource/noto-sans/400.css'
import '@fontsource/noto-sans/600.css'
import '@fontsource/noto-sans/700.css'
import './global.css'
import Head from 'next/head'

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
}

function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <title>Ryan Chang</title>
        <meta
          name="description"
          content="Personal website for Ryan Chang, a student at the Massachusetts Institute of Technology majoring in computer science \
            and math who is interested in computer systems and optimizing software performance"
          key="desc"
        />
      </Head>
      <ChakraProvider theme={theme}>
        <AnimatePresence
          mode="wait"
          initial={true}
          onExitComplete={() => {
            if (typeof window !== 'undefined') {
              window.scrollTo({ top: 0 })
            }
          }}
        >
          <Component key={router.route} {...pageProps} />
        </AnimatePresence>
      </ChakraProvider>
    </>
  )
}

export default App
