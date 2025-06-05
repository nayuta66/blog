import Link from 'next/link'
import { getAllTags, getSortedPostsData } from '@/lib/posts'

export default function TagsPage() {
  const tags = getAllTags()
  const allPosts = getSortedPostsData()
  
  // 计算每个标签的文章数量
  const tagCounts = tags.reduce((acc, tag) => {
    acc[tag] = allPosts.filter(post => post.tags?.includes(tag)).length
    return acc
  }, {} as Record<string, number>)

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        所有标签
      </h1>
      
      {tags.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400">
            暂无标签
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 text-center"
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                #{tag}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {tagCounts[tag]} 篇文章
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
} 