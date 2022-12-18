import { GetStaticPaths, GetStaticProps } from 'next'
import MainLayout from 'layouts/main-layout'
import { getAllPostIds, getPostData } from 'lib/blog'
import BlogRenderer from 'components/blog-renderer'
import { Text, Box, Heading } from '@chakra-ui/react'
import { parseISO, format } from 'date-fns'

interface PostData {
  title: string
  date: string
  content: string
  id: string
}

const Post = ({ postData }: { postData: PostData }) => {
  const date = parseISO(postData.date)

  return (
    <MainLayout>
      <Box
        pt={4}
        mb={10}
      >
        <Heading
          size='xl'
          textAlign='center'
        >
          {postData.title}
        </Heading>
        <Box
          mt={2}
        >
          <Text
            size='sm'
            textAlign='center'
          >
            <time dateTime={postData.date}>{format(date, 'LLLL d, yyyy')}</time>
          </Text>
        </Box>
      </Box>
      <BlogRenderer
        children={postData.content}
      />
    </MainLayout>
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