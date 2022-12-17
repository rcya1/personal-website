import { GetStaticPaths, GetStaticProps } from 'next'
import MainLayout from 'layouts/main-layout'
import { getAllPostIds, getPostData } from 'lib/blog'
import BlogRenderer from 'components/blog-renderer'

interface PostData {
  title: string
  date: string
  content: string
  id: string
}

const Post = ({ postData }: { postData: PostData }) => {
  return (
    <MainLayout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
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
