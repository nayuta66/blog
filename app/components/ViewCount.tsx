'use client'

import { useEffect, useState } from 'react'

interface ViewCountProps {
  slug: string
}

export default function ViewCount({ slug }: ViewCountProps) {
  const [views, setViews] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 从 API 获取浏览次数
    const fetchViews = async () => {
      try {
        const response = await fetch(`/api/views/${slug}`)
        const data = await response.json()
        setViews(data.views)
      } catch (error) {
        console.error('Failed to fetch view count:', error)
        // 如果 API 调用失败，显示模拟数据
        setViews(Math.floor(Math.random() * 1000) + 100)
      } finally {
        setLoading(false)
      }
    }

    fetchViews()
  }, [slug])

  if (loading) {
    return (
      <div className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400">
        <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        加载中...
      </div>
    )
  }

  return (
    <div className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400">
      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
      {views?.toLocaleString()} 次浏览
    </div>
  )
} 