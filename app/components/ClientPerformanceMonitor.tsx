'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const PerformanceMonitor = dynamic(
  () => import('./PerformanceMonitor'),
  { 
    ssr: false,
    loading: () => null
  }
)

export default function ClientPerformanceMonitor() {
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <Suspense fallback={null}>
      <PerformanceMonitor />
    </Suspense>
  )
} 