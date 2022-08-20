import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import theme from 'lib/theme'

import '@fontsource/raleway/700.css'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/700.css'

function App({ Component, pageProps }: AppProps) {
  return <ChakraProvider theme={theme}>
    <Component { ...pageProps }/>
  </ChakraProvider>
}

export default App
