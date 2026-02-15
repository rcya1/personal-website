import fs from 'fs'
import path from 'path'
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

  return {
    id,
    content,
    ...matterResult.data
  }
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
      return postData
    })
  )

  postsData = (await allPostsData).sort((a, b) => {
    if (a.date < b.date) return 1
    else return -1
  })

  return postsData
}

export interface PostData {
  title: string
  date: string
  content: string
  id: string
  excerpt: string
  category: string
}
