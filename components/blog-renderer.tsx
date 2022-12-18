import ReactMarkdown from 'react-markdown'
import { Heading, Table, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { BasicProps } from 'lib/react-utils'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

import 'katex/dist/katex.min.css'

const HeadingWrapper = (size: string) => {
  return ({ children }: BasicProps) => {
    return <Heading
      size={size}
      mt={8}
      mb={2}
    >
      { children }
    </Heading>
  }
}

const TextWrapper = ({ children }: BasicProps) => {
  return <Text
    mb={2}
    fontSize='md'
  >
    { children }
  </Text>
}

const TableWrapper = ({ children }: BasicProps) => {
  return <Table
    mt={5}
    mb={5}
    variant='striped'
    colorScheme='black'
    size='sm'
  >
    { children }
  </Table>
}

const TheadWrapper = ({ children }: BasicProps) => {
  return <Thead
    bgColor='blackAlpha.300'
  >
    { children }
  </Thead>
}

const ThWrapper = ({ children }: BasicProps) => {
  return <Th
    py={2}
  >
    { children }
  </Th>
}

const TrWrapper = ({ children }: BasicProps) => {
  return <Tr
  >
    { children }
  </Tr>
}

const TdWrapper = ({ children }: BasicProps) => {
  return <Td
  >
    { children }
  </Td>
}

const BlogRenderer = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      children={children}
      components={{
        h1: HeadingWrapper('xl'),
        h2: HeadingWrapper('lg'),
        h3: HeadingWrapper('md'),
        h4: HeadingWrapper('sm'),
        h5: HeadingWrapper('xs'),
        p : TextWrapper,
        table: TableWrapper,
        thead: TheadWrapper,
        th   : ThWrapper,
        tr   : TrWrapper,
        td   : TdWrapper
      }}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
    />
  )
}

export default BlogRenderer
