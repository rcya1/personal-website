import { GetStaticPaths, GetStaticProps } from 'next'
import NextLink from 'next/link'
import MainLayout from 'layouts/main-layout'
import {
  getAllPostIds,
  getPostData,
  getSortedPostsData,
  PostData
} from 'lib/posts'
import BlogRenderer from 'components/post-renderer'
import {
  Text,
  Box,
  Heading,
  Link,
  useColorModeValue,
  Flex,
  Icon
} from '@chakra-ui/react'
import { parseISO, format } from 'date-fns'
import Meta from 'components/meta'
import { LuArrowLeft, LuArrowRight, LuLayoutList } from 'react-icons/lu'
import {
  glassBgLight,
  glassBgDark,
  glassBorderLight,
  glassBorderDark,
  glassShadowLight,
  glassShadowDark
} from 'lib/theme'

const Post = ({
  postData,
  prevPost,
  nextPost
}: {
  postData: PostData
  prevPost: PostData | null
  nextPost: PostData | null
}) => {
  const date = parseISO(postData.date)

  const glassBg = useColorModeValue(glassBgLight, glassBgDark)
  const glassBorder = useColorModeValue(glassBorderLight, glassBorderDark)
  const glassShadow = useColorModeValue(glassShadowLight, glassShadowDark)
  const accentColor = useColorModeValue('#f59e0b', '#fbbf24')
  const subtitleColor = useColorModeValue('gray.500', 'gray.400')
  const dividerColor = useColorModeValue('rgba(0,0,0,0.07)', 'rgba(255,255,255,0.07)')
  const hoverBorder = useColorModeValue('#f59e0b', '#fbbf24')
  const hoverShadow = useColorModeValue(
    '0 6px 32px rgba(245,158,11,0.15)',
    '0 6px 32px rgba(251,191,36,0.1)'
  )
  const disabledOpacity = 0.4

  const navCardBase = {
    bg: glassBg,
    backdropFilter: 'blur(12px)',
    borderRadius: 'xl',
    borderWidth: '1px',
    borderColor: glassBorder,
    boxShadow: glassShadow,
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
  }

  const PostNavCard = ({
    post,
    direction
  }: {
    post: PostData | null
    direction: 'prev' | 'next'
  }) => {
    const isPrev = direction === 'prev'
    if (!post) {
      return (
        <Box
          {...navCardBase}
          flex={1}
          p={4}
          opacity={disabledOpacity}
          display="flex"
          flexDirection="column"
          alignItems={isPrev ? 'flex-start' : 'flex-end'}
        >
          <Flex align="center" gap={1.5} mb={1} color={subtitleColor}>
            {isPrev && <Icon as={LuArrowLeft} w={3.5} h={3.5} />}
            <Text fontSize="xs" fontWeight="medium">
              {isPrev ? 'Previous' : 'Next'}
            </Text>
            {!isPrev && <Icon as={LuArrowRight} w={3.5} h={3.5} />}
          </Flex>
          <Text fontSize="sm" color={subtitleColor}>
            —
          </Text>
        </Box>
      )
    }

    return (
      <NextLink href={`/posts/${post.id}`} passHref>
        <Link
          {...navCardBase}
          flex={1}
          p={4}
          display="flex"
          flexDirection="column"
          alignItems={isPrev ? 'flex-start' : 'flex-end'}
          textAlign={isPrev ? 'left' : 'right'}
          textDecoration="none"
          _hover={{
            textDecoration: 'none',
            borderColor: hoverBorder,
            boxShadow: hoverShadow
          }}
        >
          <Flex align="center" gap={1.5} mb={1} color={accentColor}>
            {isPrev && <Icon as={LuArrowLeft} w={3.5} h={3.5} />}
            <Text fontSize="xs" fontWeight="medium">
              {isPrev ? 'Previous' : 'Next'}
            </Text>
            {!isPrev && <Icon as={LuArrowRight} w={3.5} h={3.5} />}
          </Flex>
          <Text fontSize="sm" fontWeight="medium" noOfLines={2}>
            {post.title}
          </Text>
        </Link>
      </NextLink>
    )
  }

  return (
    <>
      <Meta title={postData.title} description={postData.excerpt} />
      <MainLayout maxW="56rem">
        <Box pt={6} pb={8}>
          {/* Post card */}
          <Box
            bg={glassBg}
            backdropFilter="blur(16px)"
            borderRadius="2xl"
            borderWidth="1px"
            borderColor={glassBorder}
            boxShadow={glassShadow}
            overflow="hidden"
            mb={4}
          >
            {/* Header */}
            <Box px={{ base: 6, md: 10 }} pt={8} pb={6} borderBottom="1px" borderColor={dividerColor} textAlign="center">
              <Heading
                size="xl"
                letterSpacing="-0.02em"
                mb={3}
              >
                {postData.title}
              </Heading>
              <Flex align="center" justify="center" gap={2}>
                <Text fontSize="sm" color={subtitleColor}>
                  <time dateTime={postData.date}>
                    {format(date, 'LLLL do, yyyy')}
                  </time>
                </Text>
                {postData.readingTime != null && (
                  <>
                    <Box w="3px" h="3px" borderRadius="full" bg={accentColor} flexShrink={0} />
                    <Text fontSize="sm" color={subtitleColor}>
                      {postData.readingTime} min read
                    </Text>
                  </>
                )}
              </Flex>
            </Box>

            {/* Content */}
            <Box px={{ base: 6, md: 10 }} py={8}>
              <BlogRenderer>{postData.content}</BlogRenderer>
            </Box>
          </Box>

          {/* Navigation */}
          <Flex gap={3} align="stretch">
            <PostNavCard post={prevPost} direction="prev" />

            <NextLink href="/posts" passHref>
              <Link
                {...navCardBase}
                px={4}
                py={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap={1}
                textDecoration="none"
                color={subtitleColor}
                _hover={{
                  textDecoration: 'none',
                  borderColor: hoverBorder,
                  boxShadow: hoverShadow,
                  color: accentColor
                }}
              >
                <Icon as={LuLayoutList} w={4} h={4} />
                <Text fontSize="xs" fontWeight="medium" whiteSpace="nowrap">
                  All Posts
                </Text>
              </Link>
            </NextLink>

            <PostNavCard post={nextPost} direction="next" />
          </Flex>
        </Box>
      </MainLayout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params === undefined) {
    return {
      props: {}
    }
  }

  const postData = await getPostData(params.id)
  const allPosts = await getSortedPostsData()

  let ix = -1
  for (let i = 0; i < allPosts.length; i++) {
    if (allPosts[i].id === params.id) {
      ix = i
    }
  }

  if (ix === -1) {
    throw new Error(`Post with id ${params.id} not found`)
  }

  let nextPost: PostData | null = null
  for (let i = ix - 1; i >= 0; i--) {
    if (allPosts[i].category === postData.category) {
      nextPost = allPosts[i]
      break
    }
  }

  let prevPost: PostData | null = null
  for (let i = ix + 1; i < allPosts.length; i++) {
    if (allPosts[i].category === postData.category) {
      prevPost = allPosts[i]
      break
    }
  }

  return {
    props: {
      postData,
      prevPost,
      nextPost
    }
  }
}

export default Post
