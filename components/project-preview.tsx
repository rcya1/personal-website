import { Box, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react'
import NextLink from 'next/link'
import React, { FC } from 'react'

interface ProjectPreviewProps extends React.ComponentPropsWithoutRef<typeof Box> {
  title: string,
  href: string
}

const ProjectPreview: FC<ProjectPreviewProps> = ({ title, href, ...htmlProps }: ProjectPreviewProps) => {
  return (
    <LinkBox>
      <Box
        backgroundColor='gray.800'
        width='250px'
        height='150px'
        borderRadius={10}
        {...htmlProps}
      >
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

