import React, { FC, useEffect, useMemo, useState } from 'react'
import type { GetStaticProps, NextPage } from 'next'
import {
  Box,
  BoxProps,
  Button,
  Flex,
  Heading,
  Link,
  LinkBox,
  LinkOverlay,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import { AiFillGithub, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai'
import NextLink from 'next/link'
import { format, parseISO } from 'date-fns'

import MainLayout from 'layouts/main-layout'
import SocialMediaButton from 'components/social-media-button'
import { ChakraAnimate } from 'lib/animate'
import { useScrollView } from 'lib/scroll'
import { getSortedPostsData, PostData } from 'lib/posts'
import {
  glassBgLight,
  glassBgDark,
  glassBorderLight,
  glassBorderDark,
  glassShadowLight,
  glassShadowDark
} from 'lib/theme'

import Image from 'next/image'
import profile from 'public/profile.webp'
import Meta from 'components/meta'

const GlassCard: FC<BoxProps> = ({ children, mb = 0, p = 6, ...rest }) => {
  const bg = useColorModeValue(glassBgLight, glassBgDark)
  const border = useColorModeValue(glassBorderLight, glassBorderDark)
  const shadow = useColorModeValue(glassShadowLight, glassShadowDark)

  return (
    <Box
      bg={bg}
      backdropFilter="blur(16px)"
      borderRadius="2xl"
      borderWidth="1px"
      borderColor={border}
      boxShadow={shadow}
      p={p}
      mb={mb}
      {...rest}
    >
      {children}
    </Box>
  )
}

interface WorkExperience {
  company: string
  role: string
  period: string
}

const workExperience: WorkExperience[] = [
  {
    company: 'Jane Street',
    role: 'Software Engineer',
    period: 'Sept 2025 – Present'
  },
  {
    company: 'Jane Street',
    role: 'SWE Intern',
    period: 'May – Aug 2024'
  },
  {
    company: 'Citadel',
    role: 'SWE Intern',
    period: 'Jun – Aug 2023'
  },
  {
    company: 'OPT Industries',
    role: 'SWE Intern',
    period: 'Jun – Aug 2022'
  }
]

const POSTS_PER_PAGE = 4

const Home: NextPage<{ allPostsData: PostData[]; categories: string[] }> = ({
  allPostsData,
  categories
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)
  const [sentinel, setSentinel] = useState<HTMLDivElement | null>(null)
  const getScrollView = useScrollView()

  const photoBorderColor = useColorModeValue(
    'rgba(245,158,11,0.55)',
    'rgba(251,191,36,0.4)'
  )
  const photoShadow = useColorModeValue(
    '0 6px 20px rgba(20,16,12,0.10)',
    '0 6px 22px rgba(0,0,0,0.45)'
  )
  const subtitleColor = useColorModeValue('gray.600', 'gray.400')
  const accentColor = useColorModeValue('#f59e0b', '#fbbf24')
  const dotColor = useColorModeValue('accent-light', 'accent-dark')
  const timelineLineColor = useColorModeValue(
    'rgba(245,158,11,0.3)',
    'rgba(251,191,36,0.25)'
  )
  const glassBg = useColorModeValue(glassBgLight, glassBgDark)
  const glassBorder = useColorModeValue(glassBorderLight, glassBorderDark)
  const glassShadow = useColorModeValue(glassShadowLight, glassShadowDark)
  const hoverBorder = useColorModeValue(
    'rgba(245,158,11,0.55)',
    'rgba(251,191,36,0.5)'
  )
  const hoverShadow = useColorModeValue(
    '0 2px 6px rgba(20,16,12,0.05), 0 10px 28px rgba(20,16,12,0.08)',
    '0 2px 6px rgba(0,0,0,0.3), 0 10px 28px rgba(0,0,0,0.4)'
  )
  const pillBg = useColorModeValue(
    'rgba(245,158,11,0.10)',
    'rgba(251,191,36,0.09)'
  )
  const pillBorder = useColorModeValue(
    'rgba(245,158,11,0.45)',
    'rgba(251,191,36,0.4)'
  )
  const pillIdleBorder = useColorModeValue(
    'rgba(28,25,23,0.1)',
    'rgba(255,255,255,0.12)'
  )
  const rowDividerColor = useColorModeValue(
    'rgba(28,25,23,0.07)',
    'rgba(255,255,255,0.07)'
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.location.hash !== '#posts') return

    const timeout = window.setTimeout(() => {
      const view = getScrollView()
      const target = document.getElementById('posts')
      if (!view || !target) return
      view.scrollTo({
        top: target.offsetTop - view.offsetTop - 16,
        behavior: 'smooth'
      })
    }, 350)

    return () => window.clearTimeout(timeout)
  }, [getScrollView])

  const posts = useMemo(
    () =>
      allPostsData.filter(
        (postData) =>
          postData.id.charAt(0) !== '_' &&
          (selectedCategory === 'All' || postData.category === selectedCategory)
      ),
    [allPostsData, selectedCategory]
  )

  const visiblePosts = posts.slice(0, visibleCount)
  const hasMore = visibleCount < posts.length

  useEffect(() => {
    setVisibleCount(POSTS_PER_PAGE)
  }, [selectedCategory])

  useEffect(() => {
    if (!sentinel || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisibleCount((count) => count + POSTS_PER_PAGE)
        }
      },
      { root: getScrollView(), rootMargin: '300px 0px' }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [getScrollView, hasMore, sentinel, visibleCount])

  return (
    <>
      <Meta />
      <MainLayout maxW="56rem">
        <Box pb={8}>
          {/* Hero */}
          <ChakraAnimate
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            // @ts-ignore
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <GlassCard p={{ base: 6, md: 7 }}>
              <Flex
                direction={{ base: 'column', sm: 'row' }}
                align="center"
                gap={{ base: 4, sm: 7 }}
                textAlign={{ base: 'center', sm: 'left' }}
              >
                <Box
                  borderRadius="full"
                  width={{ base: '104px', md: '124px' }}
                  height={{ base: '104px', md: '124px' }}
                  overflow="hidden"
                  borderWidth="3px"
                  borderColor={photoBorderColor}
                  boxShadow={photoShadow}
                  flexShrink={0}
                >
                  <Image src={profile} alt="Profile Picture" />
                </Box>

                <Box flex={1}>
                  <Heading
                    as="h1"
                    size="xl"
                    fontWeight="bold"
                    letterSpacing="-0.02em"
                    mb={1}
                  >
                    Ryan Chang
                  </Heading>

                  <Text fontSize="md" fontWeight="medium">
                    Software Engineer at Jane Street
                  </Text>

                  <Text fontSize="sm" color={subtitleColor} mb={4}>
                    MIT Class of 2025 &middot; CS + Math
                  </Text>

                  <Flex
                    gap={3}
                    wrap="wrap"
                    justify={{ base: 'center', sm: 'flex-start' }}
                  >
                    <SocialMediaButton
                      icon={<AiFillGithub />}
                      href="https://github.com/rcya1"
                    >
                      GitHub
                    </SocialMediaButton>
                    <SocialMediaButton
                      icon={<AiFillLinkedin />}
                      href="https://www.linkedin.com/in/ryan-chang-105495215/"
                    >
                      LinkedIn
                    </SocialMediaButton>
                    <SocialMediaButton
                      icon={<AiFillInstagram />}
                      href="https://www.instagram.com/chang.ryan1/"
                    >
                      Instagram
                    </SocialMediaButton>
                  </Flex>
                </Box>
              </Flex>

              <Text lineHeight="tall" fontSize="sm" mt={5}>
                Hi, I&apos;m Ryan! I&apos;m currently a Software Engineer at
                Jane Street. I graduated from MIT in 2025, with a double major
                in CS + Math and a MEng in CS. For my MEng, I worked with{' '}
                <Link href="https://people.csail.mit.edu/kaashoek/" isExternal>
                  Frans Kaashoek
                </Link>{' '}
                and{' '}
                <Link href="https://arielszekely.github.io/" isExternal>
                  Ariel Szekely
                </Link>{' '}
                on improving{' '}
                <Link href="https://github.com/mit-pdos/sigmaos" isExternal>
                  SigmaOS
                </Link>
                , a cloud operating system for optimizing both serverless and
                microservice applications. In my free time, I like playing video
                games (especially TFT), watching TV, learning Chinese, and
                working on a new version of Lilypad, my personal note-taking
                software.
              </Text>

              <Box
                mt={6}
                pt={5}
                borderTopWidth="1px"
                borderTopColor={rowDividerColor}
              >
                <Text
                  fontSize="xs"
                  fontWeight="semibold"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  color={subtitleColor}
                  mb={3}
                >
                  Experience
                </Text>

                {workExperience.map(({ company, role, period }) => (
                  <Flex
                    key={`${company}-${period}`}
                    align="baseline"
                    justify="space-between"
                    gap={4}
                    py={1.5}
                  >
                    <Text fontSize="sm" fontWeight="semibold">
                      {company}
                      <Box as="span" color={subtitleColor} fontWeight="normal">
                        {'  ·  '}
                        {role}
                      </Box>
                    </Text>
                    <Text
                      fontSize="xs"
                      color={subtitleColor}
                      fontWeight="medium"
                      whiteSpace="nowrap"
                    >
                      {period}
                    </Text>
                  </Flex>
                ))}
              </Box>
            </GlassCard>
          </ChakraAnimate>

          {/* Posts */}
          <Box id="posts" pt={6}>
            <ChakraAnimate
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              // @ts-ignore
              transition={{ duration: 0.5, delay: 0.18, ease: 'easeOut' }}
            >
              <Flex
                align={{ base: 'flex-start', sm: 'center' }}
                justify="space-between"
                direction={{ base: 'column', sm: 'row' }}
                gap={3}
                mb={5}
              >
                <Heading size="lg" letterSpacing="-0.02em">
                  Posts
                </Heading>

                <Wrap spacing={2}>
                  {categories.map((cat) => {
                    const isSelected = cat === selectedCategory
                    return (
                      <WrapItem key={cat}>
                        <Button
                          size="sm"
                          variant="unstyled"
                          height="auto"
                          px={3}
                          py={1.5}
                          fontSize="xs"
                          fontWeight={isSelected ? 'semibold' : 'medium'}
                          borderRadius="md"
                          borderWidth="1px"
                          borderColor={isSelected ? pillBorder : pillIdleBorder}
                          bg={isSelected ? pillBg : 'transparent'}
                          color={isSelected ? accentColor : 'inherit'}
                          transition="color 0.2s ease, background 0.2s ease, border-color 0.2s ease"
                          _hover={{ borderColor: pillBorder }}
                          onClick={() => setSelectedCategory(cat)}
                        >
                          {cat}
                        </Button>
                      </WrapItem>
                    )
                  })}
                </Wrap>
              </Flex>
            </ChakraAnimate>

            {posts.length === 0 ? (
              <GlassCard p={10} textAlign="center">
                <Text color={subtitleColor} fontSize="sm">
                  No posts yet in this category.
                </Text>
              </GlassCard>
            ) : (
              visiblePosts.map((postData, i) => {
                const date = parseISO(postData.date)
                const isLast = !hasMore && i === visiblePosts.length - 1

                return (
                  <ChakraAnimate
                    key={postData.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    // @ts-ignore
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <Flex align="stretch" gap={{ base: 3, md: 4 }}>
                      {/* Date rail */}
                      <Box
                        display={{ base: 'none', md: 'block' }}
                        width="86px"
                        flexShrink={0}
                        pt="14px"
                        textAlign="right"
                      >
                        <Text
                          fontSize="xs"
                          fontWeight="semibold"
                          color={subtitleColor}
                        >
                          <time dateTime={postData.date}>
                            {format(date, 'LLL d, yyyy')}
                          </time>
                        </Text>
                      </Box>

                      {/* Timeline dot + connecting line */}
                      <Flex
                        direction="column"
                        align="center"
                        width="9px"
                        flexShrink={0}
                      >
                        <Box
                          w="9px"
                          h="9px"
                          borderRadius="full"
                          bg={dotColor}
                          mt="18px"
                          flexShrink={0}
                        />
                        {!isLast && (
                          <Box
                            w="1.5px"
                            flex={1}
                            minH="12px"
                            bg={timelineLineColor}
                            mt="5px"
                            borderRadius="full"
                          />
                        )}
                      </Flex>

                      {/* Post card */}
                      <LinkBox flex={1} pb={4}>
                        <ChakraAnimate
                          whileHover={{ scale: 1.012 }}
                          // @ts-ignore
                          transition={{ duration: 0.15 }}
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
                            <Heading
                              size="sm"
                              fontWeight="semibold"
                              mb={1.5}
                              letterSpacing="-0.01em"
                              _hover={{ textDecorationLine: 'underline' }}
                            >
                              <NextLink href={'/posts/' + postData.id} passHref>
                                <LinkOverlay>{postData.title}</LinkOverlay>
                              </NextLink>
                            </Heading>

                            <Text
                              fontSize="xs"
                              color={subtitleColor}
                              fontWeight="medium"
                              mb={postData.excerpt ? 2.5 : 0}
                            >
                              <Box
                                as="span"
                                display={{ base: 'inline', md: 'none' }}
                              >
                                <time dateTime={postData.date}>
                                  {format(date, 'LLL d, yyyy')}
                                </time>
                                {' · '}
                              </Box>
                              {postData.category}
                              {postData.readingTime != null &&
                                ` · ${postData.readingTime} min read`}
                            </Text>

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
                    </Flex>
                  </ChakraAnimate>
                )
              })
            )}

            {hasMore && (
              <Flex ref={setSentinel} align="stretch" gap={{ base: 3, md: 4 }}>
                <Box
                  display={{ base: 'none', md: 'block' }}
                  width="86px"
                  flexShrink={0}
                />
                <Flex
                  direction="column"
                  align="center"
                  width="9px"
                  flexShrink={0}
                >
                  <Box
                    w="1.5px"
                    h="48px"
                    borderRadius="full"
                    backgroundImage={`linear-gradient(to bottom, ${timelineLineColor}, rgba(0,0,0,0))`}
                  />
                </Flex>
                <Box flex={1} />
              </Flex>
            )}
          </Box>
        </Box>
      </MainLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getSortedPostsData()
  const categories = [
    'All',
    ...Array.from(
      new Set(allPostsData.map((postData) => postData.category))
    ).sort()
  ]

  return {
    props: {
      allPostsData,
      categories
    }
  }
}

export default Home
