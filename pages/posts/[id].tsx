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
  Button,
  useColorModeValue,
  Flex
} from '@chakra-ui/react'
import { parseISO, format } from 'date-fns'
import Meta from 'components/meta'
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu'
import { FaHome } from 'react-icons/fa'

const NavButton = ({
  href,
  icon,
  text,
  align,
  isDisabled,
  width,
  color,
  hoverColor,
  activeColor,
  fontWeight
}: {
  href: string
  icon?: React.ReactElement
  text: string
  align: 'left' | 'right'
  width: string
  isDisabled: boolean
  color: string
  hoverColor: string
  activeColor: string
  fontWeight: string
}) => (
  <NextLink href={href} passHref>
    <Button
      as="a"
      leftIcon={align === 'left' ? icon : undefined}
      rightIcon={align === 'right' ? icon : undefined}
      backgroundColor={color}
      _hover={{
        backgroundColor: isDisabled ? color : hoverColor
      }}
      _active={{
        backgroundColor: isDisabled ? color : activeColor
      }}
      py={2}
      px={4}
      fontWeight={fontWeight}
      width={width}
      whiteSpace="normal"
      wordBreak="break-word"
      textAlign={align}
      disabled={isDisabled}
      height="auto"
      onClick={(e) => {
        if (isDisabled) {
          e.preventDefault()
        }
      }}
    >
      <Box ml={align === 'left' ? 1 : 0} mr={align === 'right' ? 1 : 0}>
        {text}
      </Box>
    </Button>
  </NextLink>
)

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

  const normalColor = useColorModeValue('highlight-light', 'highlight-dark')
  const postColor = useColorModeValue('post-light', 'post-dark')
  const hoverColor = useColorModeValue(
    'highlight-dark-light',
    'highlight-darker-dark'
  )
  const activeColor = useColorModeValue(
    'highlight-darker-light',
    'highlight-darker-dark'
  )
  const fontWeight = useColorModeValue('bold', 'semibold')

  return (
    <>
      <Meta title={postData.title} description={postData.excerpt} />
      <MainLayout key={postData.id}>
        <Box
          bgColor={postColor}
          px={8}
          py={4}
          marginTop={20}
          boxShadow="md"
          borderRadius={7}
        >
          <Heading size="xl" textAlign="center">
            {postData.title}
          </Heading>
          <Box mt={2}>
            <Text fontSize="md" textAlign="center">
              <time dateTime={postData.date}>
                Posted {format(date, 'LLLL do, yyyy')}
              </time>
            </Text>
          </Box>
          <BlogRenderer>{postData.content}</BlogRenderer>
          <Flex
            mt={10}
            textAlign="center"
            direction="row"
            justifyContent="space-between"
          >
            <NavButton
              href={`/posts/${prevPost?.id}`}
              icon={<LuArrowLeft size="1.5em" />}
              text={prevPost ? prevPost.title : 'No Previous Post'}
              align="left"
              isDisabled={!prevPost}
              width="15em"
              color={normalColor}
              hoverColor={hoverColor}
              activeColor={activeColor}
              fontWeight={fontWeight}
            />

            <NavButton
              href="/posts/"
              icon={<FaHome size="1.25em" />}
              text="Home"
              align="left"
              isDisabled={false}
              width="8em"
              color={normalColor}
              hoverColor={hoverColor}
              activeColor={activeColor}
              fontWeight={fontWeight}
            />

            <NavButton
              href={`/posts/${nextPost?.id}`}
              icon={<LuArrowRight size="1.5em" />}
              text={nextPost ? nextPost.title : 'No Next Post'}
              align="right"
              isDisabled={!nextPost}
              width="15em"
              color={normalColor}
              hoverColor={hoverColor}
              activeColor={activeColor}
              fontWeight={fontWeight}
            />
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
