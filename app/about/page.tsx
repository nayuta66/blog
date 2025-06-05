export default function AboutPage() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <h1>关于本博客</h1>
      
      <p>
        欢迎来到我的技术博客！这是一个分享技术见解、编程经验和学习心得的地方。
      </p>
      
      <h2>技术栈</h2>
      <p>本博客使用以下技术构建：</p>
      <ul>
        <li><strong>Next.js 15</strong> - React 框架，启用了 PPR (Partial Prerendering) 功能</li>
        <li><strong>TypeScript</strong> - 类型安全的 JavaScript</li>
        <li><strong>Tailwind CSS</strong> - 实用优先的 CSS 框架</li>
        <li><strong>Markdown</strong> - 文章内容格式</li>
        <li><strong>Gray Matter</strong> - 解析 Markdown 前置数据</li>
        <li><strong>Remark</strong> - Markdown 处理器</li>
      </ul>
      
      <h2>功能特性</h2>
      <ul>
        <li>📝 Markdown 文章支持</li>
        <li>🏷️ 标签系统</li>
        <li>🌓 深色模式支持</li>
        <li>📱 响应式设计</li>
        <li>⚡ 使用 PPR 优化性能</li>
        <li>🔍 SEO 优化</li>
      </ul>
      
      <h2>PPR (Partial Prerendering) 详解</h2>
      <p>
        本博客采用 Next.js 15 的 PPR 功能，这是一种革命性的渲染模式，结合了静态生成和动态渲染的优势。
      </p>
      
      <h3>PPR 的工作原理</h3>
      <p>
        PPR 允许在同一个路由中混合使用静态和动态内容。静态部分在构建时预渲染，而动态部分在请求时渲染。
      </p>
      
      <h3>在本博客中的应用</h3>
      <ul>
        <li><strong>静态内容</strong>：博客文章内容、页面布局、导航栏等</li>
        <li><strong>动态内容</strong>：评论数量、阅读次数、相关推荐等</li>
      </ul>
      
      <h3>性能优势</h3>
      <ol>
        <li><strong>首屏加载极快</strong> - 静态内容立即显示，无需等待服务器处理</li>
        <li><strong>SEO 友好</strong> - 搜索引擎可以抓取预渲染的静态内容</li>
        <li><strong>动态数据实时性</strong> - 动态部分始终显示最新数据</li>
        <li><strong>减少服务器负载</strong> - 静态内容从 CDN 提供，减少源服务器压力</li>
      </ol>
      
      <h3>请求流程示例</h3>
      <p>当用户访问一篇博客文章时：</p>
      <pre><code>{`1. 初始请求 (0-50ms)
   → CDN 立即返回预渲染的 HTML shell
   → 包含文章标题、内容、布局等静态部分
   
2. 页面渲染 (50-100ms)
   → 浏览器开始渲染静态内容
   → 用户可以立即看到并阅读文章
   
3. 动态内容加载 (100-300ms)
   → React 水合完成
   → 异步获取阅读次数、评论等动态数据
   → 无缝更新页面相应部分

// 示例代码结构
export default async function BlogPost({ params }) {
  // 静态部分 - 构建时执行
  const post = await getPost(params.slug)
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
      
      {/* 动态部分 - 使用 Suspense 包裹 */}
      <Suspense fallback={<div>加载中...</div>}>
        <ViewCount slug={params.slug} />
        <Comments slug={params.slug} />
      </Suspense>
    </article>
  )
}`}</code></pre>
      
      <h3>实际效果对比</h3>
      <table className="min-w-full">
        <thead>
          <tr>
            <th>指标</th>
            <th>传统 SSR</th>
            <th>使用 PPR</th>
            <th>提升</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>首字节时间 (TTFB)</td>
            <td>200-400ms</td>
            <td>20-50ms</td>
            <td>~85%</td>
          </tr>
          <tr>
            <td>首次内容绘制 (FCP)</td>
            <td>300-500ms</td>
            <td>50-100ms</td>
            <td>~80%</td>
          </tr>
          <tr>
            <td>可交互时间 (TTI)</td>
            <td>500-800ms</td>
            <td>200-300ms</td>
            <td>~60%</td>
          </tr>
        </tbody>
      </table>
      
      <h2>如何使用</h2>
      <p>
        要添加新文章，只需在 <code>posts</code> 目录下创建一个新的 Markdown 文件。
        文件名将作为文章的 URL 路径。
      </p>
      
      <h3>Markdown 文件格式示例：</h3>
      <pre><code>{`---
title: "文章标题"
date: "2024-01-01"
author: "作者名"
excerpt: "文章摘要"
tags: ["标签1", "标签2"]
---

# 文章内容

这里是文章的正文内容...`}</code></pre>
      
      <h2>联系方式</h2>
      <p>
        如果你有任何问题或建议，欢迎通过以下方式联系我：
      </p>
      <ul>
        <li>Email: nayuta66@163.com</li>
        <li>GitHub: <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">@nayuta66@163.com</a></li>
        <li>Twitter: <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">@nayuta66@163.com</a></li>
      </ul>
    </div>
  )
} 