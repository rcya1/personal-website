import { ReactElement, ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import { Heading } from '@chakra-ui/react'

const headingWrapper = (size: string) => {
  return ({ children }: { children: ReactNode }) => {
    return <Heading
      size={size}
    >
      { children }
    </Heading>
  }
}

const BlogRenderer = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      children={children}
      components={{
        h1: headingWrapper('2xl'),
        h2: headingWrapper('xl'),
        h3: headingWrapper('lg'),
        h4: headingWrapper('md'),
        h5: headingWrapper('sm'),
      }}
      remarkPlugins={[]}
      rehypePlugins={[]}
    />
  )
}

export default BlogRenderer
