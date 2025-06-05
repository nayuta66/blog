import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostsByTag, getAllTags } from '@/lib/posts'
import { formatDate } from '@/lib/date'

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag: tag,
  }))
}

export async function generateMetadata({ params }: { params: { tag: string } }) {
  return {
    title: `标签: ${params.tag} | 技术博客`,
    description: `查看所有标记为 "${params.tag}" 的文章`,
  }
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const posts = getPostsByTag(params.tag)
  
  if (posts.length === 0) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        标签: #{params.tag}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        共 {posts.length} 篇文章
      </p>
      
      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <Link href={`/posts/${post.id}`}>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-2">
                {post.title}
              </h2>
            </Link>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.author && <span>作者：{post.author}</span>}
            </div>
            {post.excerpt && (
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {post.excerpt}
              </p>
            )}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    className={`text-xs px-3 py-1 rounded-full transition-colors ${
                      tag === params.tag
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
      
      <div className="mt-8">
        <Link
          href="/tags"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← 返回标签列表
        </Link>
      </div>
    </div>
  )
} 