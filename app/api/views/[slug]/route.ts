import { NextRequest, NextResponse } from 'next/server'

// 模拟数据库存储
const viewsStore = new Map<string, number>()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  
  // 模拟数据库查询延迟
  await new Promise(resolve => setTimeout(resolve, 100))
  
  // 获取或初始化浏览次数
  const currentViews = viewsStore.get(slug) || 0
  const newViews = currentViews + 1
  viewsStore.set(slug, newViews)
  
  // 返回响应，包含缓存控制头
  return NextResponse.json(
    { views: newViews },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'X-Response-Time': '100ms',
      },
    }
  )
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  
  // 增加浏览次数
  const currentViews = viewsStore.get(slug) || 0
  const newViews = currentViews + 1
  viewsStore.set(slug, newViews)
  
  return NextResponse.json({ views: newViews })
} 