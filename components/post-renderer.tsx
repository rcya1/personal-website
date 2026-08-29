import React, { useState } from 'react'
import NextLink from 'next/link'
import NextImage from 'next/image'
import ReactMarkdown from 'react-markdown'
import {
  AspectRatio,
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Image as ChakraImage,
  Link,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ListItem,
  OrderedList,
  Table,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  UnorderedList,
  useColorModeValue,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import useWindowDimensions, { BasicProps } from 'lib/react-utils'
import { slugify } from 'lib/slug'
import MermaidDiagram from 'components/mermaid-diagram'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
// @ts-ignore
import { Document, Page, pdfjs } from 'react-pdf'
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  oneLight,
  atomDark
  // @ts-ignore
} from 'react-syntax-highlighter/dist/cjs/styles/prism'
// @ts-ignore

import { HiOutlineBookmark, HiOutlineClipboardList } from 'react-icons/hi'
import { TbBook2 } from 'react-icons/tb'
import { FiEdit } from 'react-icons/fi'
import { BiNote } from 'react-icons/bi'
import { IconType } from 'react-icons'

import 'katex/dist/katex.min.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import { AiOutlineWarning } from 'react-icons/ai'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const headingText = (children: React.ReactNode): string => {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children)
  }
  if (Array.isArray(children)) {
    return children.map(headingText).join('')
  }
  if (React.isValidElement(children)) {
    return headingText(children.props.children)
  }
  return ''
}

const CreateHeadingWrapper = (size: string) => {
  const HeadingWrapper = ({ children }: BasicProps) => {
    return (
      <Heading
        size={size}
        mt={8}
        mb={2}
        id={slugify(headingText(children))}
        scrollMarginTop="90px"
      >
        {children}
      </Heading>
    )
  }

  return HeadingWrapper
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
    <Container maxW="container.md" overflowX="auto">
      <Table mt={5} mb={5} variant="striped" colorScheme="black" size="sm">
        {children}
      </Table>
    </Container>
  )
}

const TheadWrapper = ({ children }: BasicProps) => {
  const bgColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.200')

  return (
    <Thead bgColor={bgColor} textTransform="none">
      {children}
    </Thead>
  )
}

const ThWrapper = ({ children }: BasicProps) => {
  const color = useColorModeValue('text-light', 'text-dark')

  return (
    <Th py={2} color={color} textTransform="none">
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
  const { width, height } = useWindowDimensions()

  return (
    <Document
      file={children}
      onLoadSuccess={({ numPages }: { numPages: number }) => {
        setNumPages(numPages)
      }}
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page
          key={`page_${index + 1}`}
          pageNumber={index + 1}
          width={Math.min(width * 0.9, 736)}
        />
      ))}
    </Document>
  )
}

const HorizontalRuleWrapper = () => {
  const accent = useColorModeValue('accent-light', 'accent-dark')

  return (
    <Box
      as="hr"
      border="none"
      height="3px"
      width="72px"
      mx="auto"
      my={10}
      borderRadius="full"
      bg={accent}
    />
  )
}

const CreateCustomBlockQuoteWrapper = (heading: string, icon: IconType) => {
  const CustomBlockQuoteWrapper = (contents: string) => (
    <BlockquoteWrapper>
      <Heading
        size="md"
        textDecoration="underline"
        textUnderlineOffset="6px"
        mb={3}
      >
        <Icon boxSize={5} as={icon} mr={2} verticalAlign="middle" />
        {heading}
      </Heading>
      <BlogRenderer>{contents}</BlogRenderer>
    </BlockquoteWrapper>
  )

  return CustomBlockQuoteWrapper
}

type ZoomableImageProps = {
  src: string
  width: number
  height: number
  caption?: string
}

const ZoomableImage = ({ src, width, height, caption }: ZoomableImageProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <VStack as="span">
      <Flex as="span" justify="center">
        <Box
          as="span"
          display="inline-block"
          lineHeight={0}
          cursor="pointer"
          transition="transform 0.2s ease"
          _hover={{ transform: 'scale(1.03)' }}
          onClick={onOpen}
        >
          <NextImage src={src} alt="" width={width} height={height} />
        </Box>
      </Flex>
      <Text as="span" fontStyle="italic">
        {' '}
        {caption}
      </Text>
      <Modal isOpen={isOpen} onClose={onClose} size="full" motionPreset="scale">
        <ModalOverlay bg="blackAlpha.800" backdropFilter="blur(8px)" />
        <ModalContent
          bg="transparent"
          boxShadow="none"
          m={0}
          cursor="pointer"
          onClick={onClose}
        >
          <ModalCloseButton
            color="white"
            zIndex={1}
            _hover={{ bg: 'whiteAlpha.300' }}
          />
          <Flex
            align="center"
            justify="center"
            h="100vh"
            px={{ base: 3, md: 6 }}
            py={{ base: 12, md: 6 }}
          >
            <ChakraImage
              src={src}
              alt={caption}
              maxH="100%"
              maxW="100%"
              objectFit="contain"
              borderRadius="md"
            />
          </Flex>
        </ModalContent>
      </Modal>
    </VStack>
  )
}

const languageComponentMap = {
  pdf: (contents: string) => {
    return <PDFWrapper>{contents.replace('\n', '')}</PDFWrapper>
  },
  youtube: (contents: string) => {
    return (
      <AspectRatio mx="auto" width="70%" ratio={16 / 9} mb={4}>
        <iframe
          width="100%%"
          height="100%"
          src={contents}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </AspectRatio>
    )
  },
  mermaid: (contents: string) => {
    return <MermaidDiagram chart={contents} />
  },
  definition: CreateCustomBlockQuoteWrapper('Definition', TbBook2),
  example: CreateCustomBlockQuoteWrapper('Example', FiEdit),
  theorem: CreateCustomBlockQuoteWrapper('Theorem', HiOutlineBookmark),
  note: CreateCustomBlockQuoteWrapper('Note', BiNote),
  problem: CreateCustomBlockQuoteWrapper(
    'Problem Statement',
    HiOutlineClipboardList
  ),
  warning: CreateCustomBlockQuoteWrapper('Warning', AiOutlineWarning)
}

const BlogRenderer = ({ children }: { children: string }) => {
  const codeStyle = useColorModeValue(oneLight, atomDark)

  return (
    <ReactMarkdown
      components={{
        h1: CreateHeadingWrapper('xl'),
        h2: CreateHeadingWrapper('lg'),
        h3: CreateHeadingWrapper('md'),
        h4: CreateHeadingWrapper('sm'),
        h5: CreateHeadingWrapper('xs'),
        p: TextWrapper,
        table: TableWrapper,
        thead: TheadWrapper,
        th: ThWrapper,
        tr: TrWrapper,
        td: TdWrapper,
        blockquote: BlockquoteWrapper,
        hr: HorizontalRuleWrapper,
        ul: UnorderedListWrapper,
        ol: OrderedListWrapper,
        li: ListItemWrapper,
        img({ src, alt }) {
          if (!src) return <Text>{alt}</Text>

          const hashPosition = src.indexOf('#')
          let actualSource: string, width: number, height: number
          if (!hashPosition) {
            actualSource = src
            width = 400
            height = 400
          } else {
            actualSource = src.substring(0, hashPosition)
            const rest = src.substring(hashPosition + 1)
            const xPosition = rest.indexOf('x')

            width = parseInt(rest.substring(0, xPosition))
            height = parseInt(rest.substring(xPosition + 1))
          }

          return (
            <ZoomableImage
              src={actualSource}
              width={width}
              height={height}
              caption={alt}
            />
          )
        },
        a({ href, children }) {
          if (!href) return <Text>{children}</Text>

          if (href.startsWith('#')) {
            return (
              <Link
                href={href}
                onClick={(event) => {
                  event.preventDefault()
                  document
                    .getElementById(href.slice(1))
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
              >
                {children}
              </Link>
            )
          }

          return (
            <NextLink href={href} passHref>
              <Link>{children}</Link>
            </NextLink>
          )
        },
        pre({ children }) {
          return <>{children}</>
        },
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          if (match) {
            const language = match[1] as keyof typeof languageComponentMap
            const contents = children[0] as string
            if (language in languageComponentMap) {
              return languageComponentMap[language](contents)
            }

            return (
              <SyntaxHighlighter
                style={codeStyle}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            )
          }

          return (
            <code className={className} {...props}>
              {children}
            </code>
          )
        }
      }}
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[rehypeKatex, rehypeRaw]}
    >
      {children}
    </ReactMarkdown>
  )
}

export default BlogRenderer
