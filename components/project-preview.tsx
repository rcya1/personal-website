import { Box, Heading, LinkBox, LinkOverlay, AspectRatio } from '@chakra-ui/react'
import NextLink from 'next/link'
import Image, { StaticImageData } from 'next/image'
import React, { FC } from 'react'
import { ChakraAnimate } from 'lib/animate'

interface ProjectPreviewProps extends React.ComponentPropsWithoutRef<typeof Box> {
  title: string,
  href: string,
  thumbnail: StaticImageData
}

const ProjectPreview: FC<ProjectPreviewProps> = ({ title, href, thumbnail, ...htmlProps }: ProjectPreviewProps) => {
  return (
    <ChakraAnimate
      whileHover={{
        scale: 1.05,
        transition: {
          duration: 0.25,
          ease: "easeInOut"
        }
      }}
    >
      <LinkBox >
        <AspectRatio
          ratio={5 / 3}
        >
          <Box
            width='250px'
            height='250px'
            borderRadius={10}
            zIndex={-99}
            {...htmlProps}
          >
            <Image
              src={thumbnail}
              alt={title}
              objectFit="cover"
            >
            </Image>
          </Box>
        </AspectRatio>
        <Heading
          mt={2}
          size='sm'
          textAlign='center'
          fontWeight='light'
        >
          <NextLink href={href} passHref>
            <LinkOverlay>
              {title}
            </LinkOverlay>
          </NextLink>
        </Heading>
      </LinkBox>
    </ChakraAnimate>
  )
}

export default ProjectPreview

