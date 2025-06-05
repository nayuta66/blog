'use client'

import { useEffect, useState } from 'react'

interface PerformanceMetrics {
  ttfb: number // Time to First Byte
  fcp: number  // First Contentful Paint
  lcp: number  // Largest Contentful Paint
  tti: number  // Time to Interactive
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // 使用 Performance API 获取真实的性能数据
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const navEntry = entries.find(entry => entry.entryType === 'navigation') as PerformanceNavigationTiming
      
      if (navEntry) {
        setMetrics({
          ttfb: navEntry.responseStart - navEntry.requestStart,
          fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
          lcp: 0, // 将通过 LCP observer 更新
          tti: navEntry.loadEventEnd - navEntry.fetchStart
        })
      }
    })

    observer.observe({ entryTypes: ['navigation', 'paint'] })

    // 监听 LCP
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      
      setMetrics(prev => prev ? { ...prev, lcp: lastEntry.startTime } : null)
    })

    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
    } catch (e) {
      // LCP 可能不被所有浏览器支持
    }

    return () => {
      observer.disconnect()
      lcpObserver.disconnect()
    }
  }, [])

  if (!metrics) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="bg-gray-900 dark:bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-mono"
      >
        PPR: {Math.round(metrics.fcp)}ms
      </button>
      
      {showDetails && (
        <div className="absolute bottom-full right-0 mb-2 bg-gray-900 dark:bg-gray-800 text-white p-4 rounded-lg shadow-lg min-w-[250px]">
          <h3 className="font-bold mb-2">性能指标 (PPR)</h3>
          <div className="space-y-1 text-sm font-mono">
            <div className="flex justify-between">
              <span>TTFB:</span>
              <span className={metrics.ttfb < 100 ? 'text-green-400' : 'text-yellow-400'}>
                {Math.round(metrics.ttfb)}ms
              </span>
            </div>
            <div className="flex justify-between">
              <span>FCP:</span>
              <span className={metrics.fcp < 200 ? 'text-green-400' : 'text-yellow-400'}>
                {Math.round(metrics.fcp)}ms
              </span>
            </div>
            <div className="flex justify-between">
              <span>LCP:</span>
              <span className={metrics.lcp < 500 ? 'text-green-400' : 'text-yellow-400'}>
                {Math.round(metrics.lcp)}ms
              </span>
            </div>
            <div className="flex justify-between">
              <span>TTI:</span>
              <span className={metrics.tti < 1000 ? 'text-green-400' : 'text-yellow-400'}>
                {Math.round(metrics.tti)}ms
              </span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-700 text-xs">
            <p>✅ 静态内容立即加载</p>
            <p>⚡ 动态内容异步渲染</p>
          </div>
        </div>
      )}
    </div>
  )
} 