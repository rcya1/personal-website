import ReactMarkdown from 'react-markdown'
import {
  Box,
  Heading,
  ListItem,
  OrderedList,
  Table,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  UnorderedList,
  useColorModeValue
} from '@chakra-ui/react'
import useWindowDimensions, { BasicProps } from 'lib/react-utils'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
// @ts-ignore
import { Document, Page, pdfjs } from 'react-pdf'

import 'katex/dist/katex.min.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'

import { useState } from 'react'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const HeadingWrapper = (size: string) => {
  return ({ children }: BasicProps) => {
    return (
      <Heading size={size} mt={8} mb={2}>
        {children}
      </Heading>
    )
  }
}

const TextWrapper = ({ children }: BasicProps) => {
  return (
    <Text mb={4} fontSize="md" lineHeight="6">
      {children}
    </Text>
  )
}

const TableWrapper = ({ children }: BasicProps) => {
  return (
    <Table mt={5} mb={5} variant="striped" colorScheme="black" size="sm">
      {children}
    </Table>
  )
}

const TheadWrapper = ({ children }: BasicProps) => {
  const bgColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.200')

  return <Thead bgColor={bgColor}>{children}</Thead>
}

const ThWrapper = ({ children }: BasicProps) => {
  const color = useColorModeValue('text-light', 'text-dark')

  return (
    <Th py={2} color={color}>
      {children}
    </Th>
  )
}

const TrWrapper = ({ children }: BasicProps) => {
  return <Tr>{children}</Tr>
}

const TdWrapper = ({ children }: BasicProps) => {
  return <Td>{children}</Td>
}

const BlockquoteWrapper = ({ children }: BasicProps) => {
  const borderColor = useColorModeValue('text-light', 'blue.600')

  return (
    <Box
      borderLeftColor={borderColor}
      borderLeftWidth="thick"
      marginLeft={1}
      paddingLeft={5}
      marginTop={5}
      marginBottom={5}
    >
      {children}
    </Box>
  )
}

const OrderedListWrapper = ({ children }: BasicProps) => {
  return (
    <OrderedList mb={5} ml={8} spacing={0.8}>
      {children}
    </OrderedList>
  )
}

const UnorderedListWrapper = ({ children }: BasicProps) => {
  return (
    <UnorderedList mb={5} ml={8} spacing={0.8}>
      {children}
    </UnorderedList>
  )
}

const ListItemWrapper = ({ children }: BasicProps) => {
  return <ListItem>{children}</ListItem>
}

const PDFWrapper = ({ children }: BasicProps) => {
  const [numPages, setNumPages] = useState<null | number>(null)
  const {width, height} = useWindowDimensions()

  return (
    <Document
      file={children}
      onLoadSuccess={({ numPages }: { numPages: number }) => {
        setNumPages(numPages)
      }}
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} width={Math.min(width * 0.9, 736)} />
      ))}
    </Document>
  )
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
        p: TextWrapper,
        table: TableWrapper,
        thead: TheadWrapper,
        th: ThWrapper,
        tr: TrWrapper,
        td: TdWrapper,
        blockquote: BlockquoteWrapper,
        ul: UnorderedListWrapper,
        ol: OrderedListWrapper,
        li: ListItemWrapper,
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          if (match) {
            const language = match[1]
            const contents = children[0]
            if (language === 'pdf') {
              return (
                <PDFWrapper>
                  {(contents as string).replace('\n', '')}
                </PDFWrapper>
              )
            }
          }

          return (
            <code className={className} {...props}>
              {children}
            </code>
          )
        }
      }}
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex, rehypeRaw]}
    />
  )
}

export default BlogRenderer
