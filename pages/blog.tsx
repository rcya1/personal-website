import type { GetStaticProps } from 'next'
import { Box, Container, Heading, Text } from '@chakra-ui/react'

import MainLayout from 'layouts/main-layout'
import { getSortedPostsData, PostData } from 'lib/blog'
import NextLink from 'next/link'
import { format, parseISO } from 'date-fns'
import { ChakraAnimate } from 'lib/animate'

const Blog = ({ allPostsData }: { allPostsData: PostData[] }) => {
  return (
    <MainLayout>
      <Container>
        <Box pt={4}>
          <Heading
            size="lg"
            textAlign="center"
            textDecoration="underline"
            textDecorationThickness="3px"
            textUnderlineOffset="8px"
          >
            Blog
          </Heading>
        </Box>
        <Box mt={4}>
          {allPostsData.map((postData) => {
            const date = parseISO(postData.date)

            // TODO: make the underline animate actually work by making it a div or something
            return (
              <Box mt={8}>
                <ChakraAnimate
                  whileHover={{
                    textDecoration: "underline",
                  }}
                >
                  <Heading
                    size="md"
                    fontWeight="light"
                  >
                    <NextLink href={'/blog/' + postData.id}>
                      {postData.title}
                    </NextLink>
                  </Heading>
                </ChakraAnimate>
                <Box mt={1}>
                  <Text fontSize="sm">
                    <time dateTime={postData.date}>
                      Posted {format(date, 'LLLL do, yyyy')}
                    </time>
                  </Text>
                </Box>
              </Box>
            )
          })}
        </Box>
      </Container>
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getSortedPostsData()

  return {
    props: {
      allPostsData
    }
  }
}

export default Blog
