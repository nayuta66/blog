import Link from 'next/link'
import { getSortedPostsData } from '@/lib/posts'
import { formatDate } from '@/lib/date'

export default function PostsPage() {
  const allPostsData = getSortedPostsData()

  return (
    <div className="max-w-5xl mx-auto">
      {/* 页面标题区域 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          所有文章
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          探索技术世界，分享知识与经验
        </p>
        <div className="mt-6 flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
        </div>
      </div>
      
      {allPostsData.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-sm">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            暂无文章
          </p>
          <p className="text-gray-500 dark:text-gray-500">
            请在 posts 目录下创建 Markdown 文件
          </p>
        </div>
      ) : (
        <div className="grid gap-8">
          {/* 文章统计 */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">文章总数</h2>
                <p className="text-white/80">持续创作，不断进步</p>
              </div>
              <div className="text-5xl font-bold">{allPostsData.length}</div>
            </div>
          </div>
          
          {/* 文章列表 */}
          <div className="grid gap-6">
            {allPostsData.map((post, index) => (
              <article
                key={post.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Link href={`/posts/${post.id}`}>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-3">
                          {post.title}
                        </h2>
                      </Link>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <time dateTime={post.date} className="flex items-center">
                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(post.date)}
                        </time>
                        {post.author && (
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {post.author}
                          </span>
                        )}
                        <span className="flex items-center text-purple-600 dark:text-purple-400">
                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          阅读文章
                        </span>
                      </div>
                      
                      {post.excerpt && (
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-lg leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}
                      
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Link
                              key={tag}
                              href={`/tags/${tag}`}
                              className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 text-sm rounded-full hover:from-purple-200 hover:to-pink-200 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 transition-all"
                            >
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                              </svg>
                              {tag}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <Link
                      href={`/posts/${post.id}`}
                      className="ml-6 p-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 shadow-lg"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
                
                {/* 底部装饰条 */}
                <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 