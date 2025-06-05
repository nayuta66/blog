import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface PostData {
  id: string
  title: string
  date: string
  excerpt?: string
  tags?: string[]
  author?: string
  contentHtml?: string
}

export function getSortedPostsData(): PostData[] {
  // 确保 posts 目录存在
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
    return []
  }

  // 获取 posts 目录下的文件名
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      // 移除 .md 后缀作为 id
      const id = fileName.replace(/\.md$/, '')

      // 读取 markdown 文件内容
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // 使用 gray-matter 解析文章元数据
      const matterResult = matter(fileContents)

      // 组合数据
      return {
        id,
        ...(matterResult.data as Omit<PostData, 'id'>)
      }
    })

  // 按日期排序
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, '')
        }
      }
    })
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // 使用 gray-matter 解析文章元数据
  const matterResult = matter(fileContents)

  // 使用 remark 将 markdown 转换为 HTML
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // 组合数据
  return {
    id,
    contentHtml,
    ...(matterResult.data as Omit<PostData, 'id' | 'contentHtml'>)
  }
}

export function getPostsByTag(tag: string): PostData[] {
  const allPosts = getSortedPostsData()
  return allPosts.filter(post => post.tags?.includes(tag))
}

export function getAllTags(): string[] {
  const allPosts = getSortedPostsData()
  const tags = new Set<string>()
  
  allPosts.forEach(post => {
    post.tags?.forEach(tag => tags.add(tag))
  })
  
  return Array.from(tags).sort()
} 