import type { GetStaticProps } from 'next'
import {
  Box,
  Container,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  Card,
  CardBody,
  CardHeader,
  useColorModeValue,
  Tabs,
  TabList,
  Tab
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

import MainLayout from 'layouts/main-layout'
import { getSortedPostsData, PostData } from 'lib/posts'
import NextLink from 'next/link'
import { format, parseISO } from 'date-fns'
import { AnimatePresence } from 'framer-motion'
import { ChakraAnimate } from 'lib/animate'
import {
  highlightDark,
  highlightDarkDark,
  highlightDarkerDark,
  highlightDarkerLight,
  highlightDarkLight,
  highlightLight,
  textDark,
  textLight
} from 'lib/theme'
import { Key, useEffect, useRef, useState } from 'react'

const Posts = ({
  allPostsData,
  categories
}: {
  allPostsData: PostData[]
  categories: string[]
}) => {
  const router = useRouter()
  const { category } = router.query

  const initialCategory = typeof category === 'string' ? category : 'Blog'

  const [tabState, setTabState] = useState({
    selectedCategory: initialCategory,
    direction: 1
  })
  const textColor = useColorModeValue(textLight, textDark)
  const cardColor = useColorModeValue('navbar-light', 'navbar-dark')
  const cardFontColor = useColorModeValue('text-light', 'text-dark')
  const tagColors = useColorModeValue(
    [highlightLight, highlightDarkLight, highlightDarkerLight],
    [highlightDark, highlightDarkDark, highlightDarkerDark]
  )
  const tagColor = tagColors[0].string()

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 })
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  // Keep local state in sync with URL
  useEffect(() => {
    const categoryFromURL = typeof category === 'string' ? category : 'Blog'
    if (categoryFromURL !== tabState.selectedCategory) {
      setTabState((prev) => ({
        ...prev,
        selectedCategory: categoryFromURL
      }))
    }
  }, [category, tabState.selectedCategory])

  // When selectedCategory changes, update highlight position
  useEffect(() => {
    const idx = categories.indexOf(tabState.selectedCategory)
    if (tabRefs.current[idx]) {
      const node = tabRefs.current[idx]!
      setHighlightStyle({ left: node.offsetLeft, width: node.offsetWidth })
    }
  }, [tabState.selectedCategory, categories])

  // On hover, update highlight to hovered tab
  useEffect(() => {
    if (hoverIndex !== null && tabRefs.current[hoverIndex]) {
      const node = tabRefs.current[hoverIndex]!
      setHighlightStyle({ left: node.offsetLeft, width: node.offsetWidth })
    } else {
      // revert to selected tab position
      const idx = categories.indexOf(tabState.selectedCategory)
      if (tabRefs.current[idx]) {
        const node = tabRefs.current[idx]!
        setHighlightStyle({ left: node.offsetLeft, width: node.offsetWidth })
      }
    }
  }, [hoverIndex, tabState.selectedCategory, categories])

  const prevCategoryIndex = useRef(0)

  const handleTabChange = (newCategory: string) => {
    const newIndex = categories.indexOf(newCategory)
    const oldIndex = categories.indexOf(tabState.selectedCategory)

    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, category: newCategory }
      },
      undefined,
      { shallow: true }
    )

    const newDirection = newIndex > oldIndex ? 1 : -1

    prevCategoryIndex.current = newIndex
    setTabState({
      selectedCategory: newCategory,
      direction: newDirection
    })
  }

  const tabHoverBg = useColorModeValue('rgb(245, 245, 245)', 'whiteAlpha.100')
  const tabSelectedBg = useColorModeValue(
    'rgb(242, 242, 242)',
    'whiteAlpha.300'
  )

  return (
    <MainLayout>
      <Container>
        <Box pt={6}>
          <Heading
            size="lg"
            textAlign="center"
            textDecoration="underline"
            textDecorationThickness="3px"
            textUnderlineOffset="8px"
          >
            Posts
          </Heading>
        </Box>

        <Tabs variant="unstyled" mt={8} mb={-2} isFitted>
          <TabList position="relative" justifyContent="center" gap="4px">
            {/* Sliding highlight */}
            <Box
              position="absolute"
              bottom={0}
              left={highlightStyle.left}
              width={highlightStyle.width}
              height="4px"
              bg={tagColor.toString()}
              borderRadius="2px 2px 0 0"
              transition="left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              pointerEvents="none"
              zIndex={3}
            />

            {categories.map((category, idx) => {
              return (
                <Tab
                  key={category as Key}
                  ref={(el) => (tabRefs.current[idx] = el)}
                  fontWeight="bold"
                  borderRadius="md"
                  transition="all 0.2s ease-in-out"
                  _hover={{
                    bg: tabHoverBg,
                    boxShadow: 'sm'
                  }}
                  _selected={{
                    bg: tabSelectedBg,
                    boxShadow: 'sm'
                  }}
                  onClick={() => handleTabChange(category)}
                  onMouseEnter={() => setHoverIndex(idx)}
                  onMouseLeave={() => setHoverIndex(null)}
                  zIndex={2}
                  py={2}
                  px={4}
                  userSelect="none"
                >
                  {category}
                </Tab>
              )
            })}
          </TabList>
        </Tabs>

        <AnimatePresence mode="wait" initial={false}>
          <ChakraAnimate
            key={tabState.selectedCategory as Key} // triggers exit/enter on tab change
            initial={{ opacity: 0, x: -40 * tabState.direction }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 * tabState.direction }}
            transition={{ duration: '0.2', ease: 'easeInOut' }}
            style={{ width: '100%' }} // needed to prevent layout shift
          >
            <Box>
              {allPostsData
                .filter(
                  (postData) =>
                    postData.id.charAt(0) !== '_' &&
                    postData.category === tabState.selectedCategory
                )
                .map((postData) => {
                  const date = parseISO(postData.date)

                  return (
                    <LinkBox mt={8} key={postData.id}>
                      <ChakraAnimate
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: '0.15' }}
                      >
                        <Card backgroundColor={cardColor} color={cardFontColor}>
                          <CardHeader pb={4}>
                            <ChakraAnimate
                              initial={{
                                textDecorationColor: textColor
                                  .alpha(0)
                                  .toString()
                              }}
                              whileHover={{
                                textDecorationColor: textColor
                                  .alpha(1)
                                  .toString()
                              }}
                              transition={{ duration: '0.15' }}
                            >
                              <Heading
                                size="md"
                                fontWeight="light"
                                _hover={{ textDecorationLine: 'underline' }}
                                textDecorationColor="inherit"
                              >
                                <NextLink
                                  href={'/posts/' + postData.id}
                                  passHref
                                >
                                  <LinkOverlay>{postData.title}</LinkOverlay>
                                </NextLink>
                              </Heading>
                            </ChakraAnimate>
                            <Text fontSize="sm">
                              <time dateTime={postData.date}>
                                Posted {format(date, 'LLLL do, yyyy')}
                              </time>
                            </Text>
                          </CardHeader>
                          {postData.excerpt && (
                            <CardBody pt={1}>
                              <Text fontSize="sm">{postData.excerpt}</Text>
                            </CardBody>
                          )}
                        </Card>
                      </ChakraAnimate>
                    </LinkBox>
                  )
                })}
            </Box>
          </ChakraAnimate>
        </AnimatePresence>
      </Container>
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getSortedPostsData()
  const categories = Array.from(
    new Set(allPostsData.map((postData) => postData.category))
  ).sort()

  return {
    props: {
      allPostsData,
      categories
    }
  }
}

export default Posts
