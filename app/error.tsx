'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        出错了！
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        抱歉，加载页面时出现了错误。
      </p>
      <button
        onClick={reset}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        重试
      </button>
    </div>
  )
} 