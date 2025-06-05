import Link from 'next/link'
import { getSortedPostsData } from '@/lib/posts'
import { formatDate } from '@/lib/date'

export default function Home() {
  const allPostsData = getSortedPostsData()
  const recentPosts = allPostsData.slice(0, 5)

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 p-12 md:p-20">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white rounded-full opacity-10 blur-3xl"></div>
        
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            欢迎来到<span className="block mt-2">nayuta的技术博客</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            分享技术见解，记录成长历程，探索无限可能
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
            <Link
              href="/posts"
              className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              浏览所有文章
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all duration-200"
            >
              了解更多
            </Link>
          </div>
        </div>
      </section>

      {/* 特性展示 */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="group p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">技术深度</h3>
          <p className="text-gray-600 dark:text-gray-300">深入浅出地分享技术知识，让复杂概念变得简单易懂</p>
        </div>
        
        <div className="group p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">性能优化</h3>
          <p className="text-gray-600 dark:text-gray-300">采用 Next.js PPR 技术，提供极速的页面加载体验</p>
        </div>
        
        <div className="group p-8 bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">持续更新</h3>
          <p className="text-gray-600 dark:text-gray-300">定期分享最新的技术趋势和实践经验</p>
        </div>
      </section>

      {/* Recent Posts */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            最新文章
          </h2>
          {allPostsData.length > 5 && (
            <Link
              href="/posts"
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
            >
              查看全部 →
            </Link>
          )}
        </div>
        
        <div className="grid gap-6">
          {recentPosts.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                暂无文章
              </p>
              <p className="text-gray-500 dark:text-gray-500 mt-2">
                请在 posts 目录下创建 Markdown 文件
              </p>
            </div>
          ) : (
            recentPosts.map((post, index) => (
              <article
                key={post.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 dark:border-gray-700 article-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Link href={`/posts/${post.id}`}>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-3">
                        {post.title}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <time dateTime={post.date} className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(post.date)}
                      </time>
                      {post.author && (
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {post.author}
                        </span>
                      )}
                    </div>
                    
                    {post.excerpt && (
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Link
                            key={tag}
                            href={`/tags/${tag}`}
                            className="inline-flex items-center px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm rounded-full hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
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
                    className="ml-6 p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
