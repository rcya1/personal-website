import type { GetStaticProps } from 'next'
import {
  Box,
  Container,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  useColorModeValue,
  Tabs,
  TabList,
  Tab,
  Flex
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

import MainLayout from 'layouts/main-layout'
import { getSortedPostsData, PostData } from 'lib/posts'
import NextLink from 'next/link'
import { format, parseISO } from 'date-fns'
import { AnimatePresence } from 'framer-motion'
import { ChakraAnimate } from 'lib/animate'
import {
  glassBgLight,
  glassBgDark,
  glassBorderLight,
  glassBorderDark,
  glassShadowLight,
  glassShadowDark,
  textDark,
  textLight
} from 'lib/theme'
import { Key, useEffect, useRef, useState } from 'react'
import Meta from 'components/meta'

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
  const accentColor = useColorModeValue('#f59e0b', '#fbbf24')
  const glassBg = useColorModeValue(glassBgLight, glassBgDark)
  const glassBorder = useColorModeValue(glassBorderLight, glassBorderDark)
  const glassShadow = useColorModeValue(glassShadowLight, glassShadowDark)
  const hoverBorder = useColorModeValue('#f59e0b', '#fbbf24')
  const hoverShadow = useColorModeValue(
    '0 6px 32px rgba(245,158,11,0.15)',
    '0 6px 32px rgba(251,191,36,0.1)'
  )
  const subtitleColor = useColorModeValue('gray.500', 'gray.400')
  const tabBg = useColorModeValue(
    'rgba(255,255,255,0.45)',
    'rgba(255,255,255,0.04)'
  )
  const tabBorder = useColorModeValue(
    'rgba(255,255,255,0.7)',
    'rgba(255,255,255,0.08)'
  )

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const textRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [highlightStyle, setHighlightStyle] = useState({
    left: 0,
    width: 0,
    textWidth: 0
  })
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  useEffect(() => {
    const categoryFromURL = typeof category === 'string' ? category : 'Blog'
    if (categoryFromURL !== tabState.selectedCategory) {
      setTabState((prev) => ({ ...prev, selectedCategory: categoryFromURL }))
    }
  }, [category, tabState.selectedCategory])

  // Update pill + underline when selected category changes
  useEffect(() => {
    const idx = categories.indexOf(tabState.selectedCategory)
    const node = tabRefs.current[idx]
    if (!node) return
    const tw = textRefs.current[idx]?.offsetWidth ?? 0
    setHighlightStyle({
      left: node.offsetLeft,
      width: node.offsetWidth,
      textWidth: tw
    })
  }, [tabState.selectedCategory, categories])

  // Update pill + underline on hover (or revert to selected on mouse leave)
  useEffect(() => {
    const idx =
      hoverIndex !== null
        ? hoverIndex
        : categories.indexOf(tabState.selectedCategory)
    const node = tabRefs.current[idx]
    if (!node) return
    const tw = textRefs.current[idx]?.offsetWidth ?? 0
    setHighlightStyle({
      left: node.offsetLeft,
      width: node.offsetWidth,
      textWidth: tw
    })
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
    setTabState({ selectedCategory: newCategory, direction: newDirection })
  }

  return (
    <>
      <Meta
        title="Ryan Chang - Posts"
        description="Random posts about personal experiences, technology, math, and more"
      />
      <MainLayout>
        <Container>
          {/* Page header */}
          <Box pt={8} pb={6} textAlign="center">
            <Heading size="xl" letterSpacing="-0.02em">
              Posts
            </Heading>
          </Box>

          {/* Tab bar */}
          <Box
            bg={tabBg}
            backdropFilter="blur(12px)"
            borderWidth="1px"
            borderColor={tabBorder}
            borderRadius="2xl"
            p={1}
            mb={7}
          >
            <Tabs variant="unstyled" isFitted>
              <TabList position="relative">
                {/* Sliding pill highlight */}
                <Box
                  position="absolute"
                  top={0}
                  bottom={0}
                  left={`${highlightStyle.left}px`}
                  width={`${highlightStyle.width}px`}
                  bg={accentColor}
                  borderRadius="xl"
                  opacity={0.15}
                  transition="left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  pointerEvents="none"
                  zIndex={1}
                />

                {/* Underline — inside TabList so left uses the same offsetParent as the tabs */}
                {highlightStyle.textWidth > 0 && (
                  <Box
                    position="absolute"
                    bottom="2px"
                    left={`${highlightStyle.left + (highlightStyle.width - highlightStyle.textWidth) / 2}px`}
                    width={`${highlightStyle.textWidth}px`}
                    height="2.5px"
                    bg={accentColor}
                    borderRadius="full"
                    transition="left 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    pointerEvents="none"
                    zIndex={5}
                  />
                )}

                {categories.map((cat, idx) => {
                  const isSelected = cat === tabState.selectedCategory
                  return (
                    <Tab
                      key={cat as Key}
                      ref={(el) => (tabRefs.current[idx] = el)}
                      fontWeight={isSelected ? 'semibold' : 'normal'}
                      fontSize="sm"
                      borderRadius="xl"
                      color={isSelected ? accentColor : 'inherit'}
                      transition="color 0.2s ease"
                      onClick={() => handleTabChange(cat)}
                      onMouseEnter={() => setHoverIndex(idx)}
                      onMouseLeave={() => setHoverIndex(null)}
                      zIndex={2}
                      py={2}
                      px={4}
                      userSelect="none"
                      _hover={{ bg: 'transparent' }}
                      _selected={{ bg: 'transparent' }}
                    >
                      <span ref={(el) => (textRefs.current[idx] = el)}>
                        {cat}
                      </span>
                    </Tab>
                  )
                })}
              </TabList>
            </Tabs>
          </Box>

          {/* Post list */}
          <AnimatePresence mode="wait" initial={false}>
            <ChakraAnimate
              key={tabState.selectedCategory as Key}
              initial={{ opacity: 0, x: -32 * tabState.direction }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 32 * tabState.direction }}
              transition={{ duration: '0.2', ease: 'easeInOut' }}
              style={{ width: '100%' }}
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
                      <LinkBox mt={4} key={postData.id}>
                        <ChakraAnimate
                          whileHover={{ scale: 1.015 }}
                          transition={{ duration: '0.15' }}
                        >
                          <Box
                            bg={glassBg}
                            backdropFilter="blur(16px)"
                            borderRadius="xl"
                            borderWidth="1px"
                            borderColor={glassBorder}
                            boxShadow={glassShadow}
                            p={5}
                            transition="border-color 0.2s ease, box-shadow 0.2s ease"
                            _hover={{
                              borderColor: hoverBorder,
                              boxShadow: hoverShadow
                            }}
                          >
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
                                size="sm"
                                fontWeight="semibold"
                                mb={1}
                                letterSpacing="-0.01em"
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

                            <Flex
                              align="center"
                              gap={2}
                              mb={postData.excerpt ? 3 : 0}
                            >
                              <Box
                                w="4px"
                                h="4px"
                                borderRadius="full"
                                bg={accentColor}
                                flexShrink={0}
                              />
                              <Text
                                fontSize="xs"
                                color={subtitleColor}
                                fontWeight="medium"
                              >
                                <time dateTime={postData.date}>
                                  {format(date, 'LLLL do, yyyy')}
                                </time>
                              </Text>
                            </Flex>

                            {postData.excerpt && (
                              <Text
                                fontSize="sm"
                                color={subtitleColor}
                                lineHeight="tall"
                              >
                                {postData.excerpt}
                              </Text>
                            )}
                          </Box>
                        </ChakraAnimate>
                      </LinkBox>
                    )
                  })}
              </Box>
            </ChakraAnimate>
          </AnimatePresence>
        </Container>
      </MainLayout>
    </>
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
