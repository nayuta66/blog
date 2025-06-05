import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
        404
      </h1>
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
        页面未找到
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        抱歉，您访问的页面不存在。
      </p>
      <Link
        href="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        返回首页
      </Link>
    </div>
  )
} 