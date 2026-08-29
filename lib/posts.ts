import fs from 'fs'
import path from 'path'
import { slugify } from 'lib/slug'
const matter = require('gray-matter')

const postsDirectory = path.join(process.cwd(), 'posts')

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id: any): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)
  const content = matterResult.content

  const headings = extractHeadings(content)

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length
  const readingTime = Math.max(1, Math.round(wordCount / 200))

  return {
    id,
    content,
    readingTime,
    headings,
    ...matterResult.data
  }
}

function extractHeadings(content: string): PostHeading[] {
  const headings: PostHeading[] = []
  let inCodeFence = false

  for (const line of content.split('\n')) {
    if (line.startsWith('```')) {
      inCodeFence = !inCodeFence
      continue
    }
    if (inCodeFence) continue

    const match = /^(#{1,3})\s+(.*)$/.exec(line)
    if (!match) continue

    const text = match[2].replace(/[*_`]/g, '').trim()
    headings.push({
      depth: match[1].length,
      text,
      slug: slugify(text)
    })
  }

  return headings
}

let postsData: PostData[] | undefined = undefined

export async function getSortedPostsData(): Promise<PostData[]> {
  if (postsData !== undefined) {
    return postsData
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = Promise.all(
    fileNames.map(async (fileName) => {
      let postData = await getPostData(fileName.replace(/\.md$/, ''))
      postData.content = ''
      postData.headings = []
      return postData
    })
  )

  postsData = (await allPostsData).sort((a, b) => {
    if (a.date < b.date) return 1
    else return -1
  })

  return postsData
}

export interface PostHeading {
  depth: number
  text: string
  slug: string
}

export interface PostData {
  title: string
  date: string
  content: string
  id: string
  excerpt: string
  category: string
  readingTime?: number
  headings?: PostHeading[]
  toc?: boolean
}
