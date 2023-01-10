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
  HStack,
  Button
} from '@chakra-ui/react'

import MainLayout from 'layouts/main-layout'
import { getSortedPostsData, PostData } from 'lib/posts'
import NextLink from 'next/link'
import { format, parseISO } from 'date-fns'
import { ChakraAnimate } from 'lib/animate'
import {
  backgroundDark,
  backgroundLight,
  highlightDark,
  highlightDarkDark,
  highlightDarkerDark,
  highlightDarkerLight,
  highlightDarkLight,
  highlightLight,
  textDark,
  textLight
} from 'lib/theme'
import { Key, useState } from 'react'
import { AiFillTag } from 'react-icons/ai'
import Color from 'color'

const Posts = ({
  allPostsData,
  categories
}: {
  allPostsData: PostData[]
  categories: String[]
}) => {
  const [selectedCategory, setSelectedCategory] = useState<String>('All')

  const textColor = useColorModeValue(textLight, textDark)
  const backgroundColor = useColorModeValue(backgroundLight, backgroundDark)
  const cardColor = useColorModeValue('navbar-light', 'navbar-dark')
  const cardFontColor = useColorModeValue('text-light', 'text-dark')
  const tagColors = useColorModeValue(
    [highlightLight, highlightDarkLight, highlightDarkerLight],
    [highlightDark, highlightDarkDark, highlightDarkerDark]
  )
  const transparentColor = Color('#00000000').string()

  const tagColor = tagColors[0].string()
  const tagHoverColor = tagColors[1].string()
  const tagPressedColor = tagColors[2].string()
  const transparentTagHoverColor = tagColors[1].mix(backgroundColor).string()
  const transparentTagPressedColor = tagColors[2].mix(backgroundColor).string()

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
        <HStack mt={8} mb={-2} justifyContent="center" spacing={4}>
          {categories.map((category) => {
            const active = selectedCategory == category

            return (
              <Button
                leftIcon={<AiFillTag />}
                key={category as Key}
                backgroundColor={active ? tagColor : transparentColor}
                borderColor={active ? transparentColor : tagColor}
                _hover={{
                  backgroundColor: active ? tagHoverColor : transparentTagHoverColor,
                  borderColor: active ? tagHoverColor : transparentTagHoverColor
                }}
                _active={{
                  backgroundColor: active ? tagPressedColor : transparentTagPressedColor,
                  borderColor: active ? tagPressedColor : transparentTagPressedColor
                }}
                borderWidth={2}
                py={2}
                px={3}
                fontWeight="bold"
                textColor={textColor.toString()}
                onClick={() => {
                  setSelectedCategory(category)
                }}
              >
                {category}
              </Button>
            )
          })}
        </HStack>
        <Box>
          {allPostsData
            .filter((postData) => selectedCategory == 'All' || postData.category == selectedCategory)
            .map((postData) => {
              const date = parseISO(postData.date)

              return (
                <LinkBox mt={8} key={postData.id}>
                  <ChakraAnimate
                    whileHover={{
                      scale: 1.05
                    }}
                    transition={{
                      duration: '0.25'
                    }}
                  >
                    <Card backgroundColor={cardColor} color={cardFontColor}>
                      <CardHeader pb={4}>
                        <ChakraAnimate
                          initial={{
                            textDecorationColor: textColor.alpha(0).toString()
                          }}
                          whileHover={{
                            textDecorationColor: textColor.alpha(1).toString()
                          }}
                          transition={{
                            duration: '0.25'
                          }}
                        >
                          <Heading
                            size="md"
                            fontWeight="light"
                            textDecorationLine="underline"
                            textDecorationColor="inherit"
                          >
                            <NextLink href={'/posts/' + postData.id} passHref>
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
      </Container>
    </MainLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getSortedPostsData()
  const categories = Array.from(
    new Set(allPostsData.map((postData) => postData.category))
  ).sort()
  categories.unshift('All')

  return {
    props: {
      allPostsData,
      categories
    }
  }
}

export default Posts
