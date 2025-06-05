import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import { getAllPostIds, getPostData } from '@/lib/posts'
import { formatDate } from '@/lib/date'
import ViewCount from '@/app/components/ViewCount'
import RelatedPosts from '@/app/components/RelatedPosts'
import ScrollToTopButton from '@/app/components/ScrollToTopButton'

export async function generateStaticParams() {
  const posts = getAllPostIds()
  return posts
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const postData = await getPostData(slug)
    return {
      title: `${postData.title} | 技术博客`,
      description: postData.excerpt || `阅读文章：${postData.title}`,
    }
  } catch {
    return {
      title: '文章未找到 | 技术博客',
    }
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let postData
  
  try {
    postData = await getPostData(slug)
  } catch (error) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* 文章头部 */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          {postData.title}
        </h1>
        
        <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-8">
          <time dateTime={postData.date} className="flex items-center">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(postData.date)}
          </time>
          
          {postData.author && (
            <>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {postData.author}
              </span>
            </>
          )}
          
          <span className="text-gray-300 dark:text-gray-600">•</span>
          
          {/* PPR 动态内容 - 浏览次数 */}
          <Suspense fallback={
            <span className="flex items-center text-gray-400">
              <svg className="animate-spin h-4 w-4 mr-1.5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              加载中...
            </span>
          }>
            <ViewCount slug={slug} />
          </Suspense>
        </div>
        
        {postData.tags && postData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center">
            {postData.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium rounded-full hover:from-purple-200 hover:to-pink-200 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50 transition-all transform hover:scale-105"
              >
                <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                {tag}
              </Link>
            ))}
          </div>
        )}
        
        {/* 装饰线 */}
        <div className="mt-8 flex justify-center">
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
        </div>
      </header>
      
      {/* 文章内容 */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12 mb-12">
        <div 
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml! }}
        />
      </div>
      
      {/* PPR 动态内容 - 相关文章推荐 */}
      <Suspense fallback={
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded w-40 mb-6"></div>
            <div className="space-y-4">
              <div className="h-20 bg-gray-200 dark:bg-gray-600 rounded"></div>
              <div className="h-20 bg-gray-200 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      }>
        <RelatedPosts currentSlug={slug} tags={postData.tags || []} />
      </Suspense>
      
      {/* 底部导航 */}
      <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <Link
            href="/posts"
            className="inline-flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all transform hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回文章列表
          </Link>
          
          <ScrollToTopButton />
        </div>
      </footer>
    </article>
  )
} 