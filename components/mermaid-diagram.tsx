import { useEffect, useId, useState } from 'react'
import { Box, Flex, Text, useColorMode } from '@chakra-ui/react'

// load lazily
let mermaidPromise: Promise<any> | null = null
const loadMermaid = () => {
  if (!mermaidPromise) {
    const globals = window as any
    if (!globals.__name) globals.__name = (fn: any) => fn

    mermaidPromise = import('mermaid').then((module) => module.default)
  }
  return mermaidPromise
}

const FONT_FAMILY = '"Kalam", "Comic Sans MS", cursive'

const themeVariables = {
  light: {
    background: 'transparent',
    primaryColor: '#fffdf9',
    primaryTextColor: '#1c1917',
    primaryBorderColor: '#1c1917',
    secondaryColor: '#fef3c7',
    secondaryBorderColor: '#b45309',
    tertiaryColor: '#f1ecff',
    tertiaryBorderColor: '#1c1917',
    clusterBkg: 'transparent',
    clusterBorder: '#1c1917',
    lineColor: '#1c1917',
    textColor: '#1c1917',
    noteBkgColor: '#fef3c7',
    noteBorderColor: '#b45309',
    noteTextColor: '#1c1917'
  },
  dark: {
    background: 'transparent',
    primaryColor: '#171426',
    primaryTextColor: '#e8e4f0',
    primaryBorderColor: '#e8e4f0',
    secondaryColor: '#2b2137',
    secondaryBorderColor: '#fbbf24',
    tertiaryColor: '#152036',
    tertiaryBorderColor: '#e8e4f0',
    clusterBkg: 'transparent',
    clusterBorder: '#e8e4f0',
    lineColor: '#e8e4f0',
    textColor: '#e8e4f0',
    noteBkgColor: '#2b2137',
    noteBorderColor: '#fbbf24',
    noteTextColor: '#e8e4f0'
  }
}

const MermaidDiagram = ({ chart }: { chart: string }) => {
  const { colorMode } = useColorMode()
  const [svg, setSvg] = useState('')
  const [error, setError] = useState<string | null>(null)

  const id = 'mermaid' + useId().replace(/[^a-zA-Z0-9]/g, '')

  useEffect(() => {
    let cancelled = false

    loadMermaid()
      .then(async (mermaid) => {
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'loose',
          look: 'handDrawn',
          handDrawnSeed: 42,
          theme: 'base',
          fontFamily: FONT_FAMILY,
          themeVariables: themeVariables[colorMode],
          flowchart: { curve: 'basis', padding: 12 },
          sequence: {
            actorFontFamily: FONT_FAMILY,
            noteFontFamily: FONT_FAMILY,
            messageFontFamily: FONT_FAMILY
          }
        })

        const rendered = await mermaid.render(id, chart.trim())
        if (!cancelled) {
          setSvg(rendered.svg)
          setError(null)
        }
      })
      .catch((e) => {
        if (!cancelled) setError(String(e?.message ?? e))
      })

    return () => {
      cancelled = true
    }
  }, [chart, colorMode, id])

  if (error) {
    return (
      <Box my={6} p={4} borderWidth="1px" borderRadius="md" overflowX="auto">
        <Text fontSize="sm" fontWeight="bold" mb={2}>
          Could not render diagram
        </Text>
        <Text fontSize="sm" fontFamily="mono" whiteSpace="pre-wrap">
          {error}
        </Text>
      </Box>
    )
  }

  return (
    <Flex
      as="span"
      display="flex"
      justify="center"
      my={6}
      minHeight={svg ? undefined : '120px'}
      overflowX="auto"
      sx={{
        '& svg': { maxWidth: '100%', height: 'auto' },
        '& svg text, & svg span': { fontFamily: `${FONT_FAMILY} !important` }
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

export default MermaidDiagram
