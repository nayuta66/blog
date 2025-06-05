'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface RelatedPost {
  slug: string
  title: string
  excerpt: string
  date: string
}

interface RelatedPostsProps {
  currentSlug: string
  tags: string[]
}

export default function RelatedPosts({ currentSlug, tags }: RelatedPostsProps) {
  const [posts, setPosts] = useState<RelatedPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        // 模拟 API 调用获取相关文章
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // 模拟数据
        const mockPosts: RelatedPost[] = [
          {
            slug: 'nextjs-15-features',
            title: 'Next.js 15 新特性详解',
            excerpt: '深入了解 Next.js 15 带来的革命性更新...',
            date: '2024-01-15'
          },
          {
            slug: 'react-server-components',
            title: 'React Server Components 实战',
            excerpt: '如何在生产环境中使用 RSC...',
            date: '2024-01-10'
          },
          {
            slug: 'web-performance-tips',
            title: 'Web 性能优化技巧',
            excerpt: '提升网站性能的 10 个实用技巧...',
            date: '2024-01-05'
          }
        ].filter(post => post.slug !== currentSlug)
        
        setPosts(mockPosts.slice(0, 2))
      } catch (error) {
        console.error('Failed to fetch related posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedPosts()
  }, [currentSlug, tags])

  if (loading) {
    return (
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4">相关文章</h2>
        <div className="space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (posts.length === 0) {
    return null
  }

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-4">相关文章</h2>
      <div className="space-y-4">
        {posts.map(post => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="block group"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {post.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
} 