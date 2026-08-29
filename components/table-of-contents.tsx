import {
  Box,
  Collapse,
  Flex,
  Icon,
  Link,
  Text,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import { LuChevronDown, LuList } from 'react-icons/lu'
import { PostHeading } from 'lib/posts'

const TableOfContents = ({ headings }: { headings: PostHeading[] }) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })

  const accentColor = useColorModeValue('#f59e0b', '#fbbf24')
  const subtitleColor = useColorModeValue('gray.500', 'gray.400')
  const hoverColor = useColorModeValue('#b45309', '#fbbf24')
  const borderColor = useColorModeValue(
    'rgba(0,0,0,0.07)',
    'rgba(255,255,255,0.07)'
  )

  if (headings.length === 0) return null

  const minDepth = Math.min(...headings.map((heading) => heading.depth))

  const scrollTo = (slug: string) => {
    document
      .getElementById(slug)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <Box
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="xl"
      px={5}
      py={4}
      mb={8}
    >
      <Flex
        as="button"
        width="100%"
        align="center"
        gap={2}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <Icon as={LuList} w={4} h={4} color={accentColor} />
        <Text fontWeight="semibold" fontSize="sm" letterSpacing="0.04em">
          CONTENTS
        </Text>
        <Icon
          as={LuChevronDown}
          w={4}
          h={4}
          ml="auto"
          color={subtitleColor}
          transform={isOpen ? 'rotate(180deg)' : undefined}
          transition="transform 0.2s ease"
        />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Box as="ul" listStyleType="none" mt={3}>
          {headings.map((heading) => (
            <Box
              as="li"
              key={heading.slug}
              pl={(heading.depth - minDepth) * 4}
              py={0.5}
            >
              <Link
                href={`#${heading.slug}`}
                fontSize="sm"
                fontWeight={heading.depth === minDepth ? 'medium' : 'normal'}
                color={heading.depth === minDepth ? undefined : subtitleColor}
                textDecoration="none"
                _hover={{ color: hoverColor, textDecoration: 'none' }}
                onClick={(event) => {
                  event.preventDefault()
                  scrollTo(heading.slug)
                }}
              >
                {heading.text}
              </Link>
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  )
}

export default TableOfContents
