import { Box, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react'
import NextLink from 'next/link'
import Image, { StaticImageData } from 'next/image'
import { AspectRatio } from '@chakra-ui/react'
import React, { FC, useState } from 'react'

interface ProjectPreviewProps extends React.ComponentPropsWithoutRef<typeof Box> {
  title: string,
  href: string,
  thumbnail: StaticImageData
}

const ProjectPreview: FC<ProjectPreviewProps> = ({ title, href, thumbnail, ...htmlProps }: ProjectPreviewProps) => {
  const [hover, setHover] = useState(false)

  return (
    <LinkBox
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
    >
      <Box>
        <AspectRatio
          ratio={5/3}
          position='absolute'
          width='100%'
        >
          <Box
            backdropFilter='auto'
            borderRadius={10}
            backdropBlur={hover ? 'md' : 'none'}
            zIndex={-1}
          />
        </AspectRatio>
        <AspectRatio
          ratio={5/3}
        >
          <Box
            width='250px'
            height='250px'
            borderRadius={10}
            borderWidth={2}
            borderColor='gray.300'
            overflow='hidden'
            zIndex={-99}
            {...htmlProps}
          >
            <Image
              src={thumbnail}
              alt={title}
              objectFit="cover"
              style={{ borderRadius: '10px', zIndex: -100 }}
            >
            </Image>
          </Box>
        </AspectRatio>
      </Box>
      <Heading
        mt={2}
        size='sm'
        textAlign='center'
      >
        <NextLink href={href} passHref>
          <LinkOverlay>
            { title }
          </LinkOverlay>
        </NextLink>
      </Heading>
    </LinkBox>
  )
}

export default ProjectPreview

