import { GetStaticPaths, GetStaticProps } from 'next'
import MainLayout from 'layouts/main-layout'
import { getAllPostIds, getPostData, PostData } from 'lib/posts'
import BlogRenderer from 'components/post-renderer'
import { Text, Box, Heading } from '@chakra-ui/react'
import { parseISO, format } from 'date-fns'
import Head from 'next/head'
import Meta from 'components/meta'

const Post = ({ postData }: { postData: PostData }) => {
  const date = parseISO(postData.date)

  return (
    <>
      <Meta title={postData.title} description={postData.excerpt} />
      <MainLayout>
        <Box pt={4} mb={10}>
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
        </Box>
        <BlogRenderer>{postData.content}</BlogRenderer>
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

  return {
    props: {
      postData
    }
  }
}

export default Post
