---
title: "React 性能优化完全指南"
date: "2024-12-18"
author: "技术博主"
excerpt: "深入探讨 React 应用的性能优化技巧，从基础到高级，助你打造高性能应用"
tags: ["React", "性能优化", "前端", "JavaScript"]
---

# React 性能优化完全指南

React 应用的性能优化是一个持续的过程。本文将从多个角度探讨如何优化 React 应用的性能。

## 1. React.memo 优化组件重渲染

`React.memo` 是一个高阶组件，它仅在 props 发生变化时才重新渲染组件。

```jsx
// ❌ 没有优化的组件
const ExpensiveComponent = ({ data, id }) => {
  console.log('Rendering ExpensiveComponent');
  return <div>{/* 复杂的渲染逻辑 */}</div>;
};

// ✅ 使用 React.memo 优化
const ExpensiveComponent = React.memo(({ data, id }) => {
  console.log('Rendering ExpensiveComponent');
  return <div>{/* 复杂的渲染逻辑 */}</div>;
});

// 自定义比较函数
const ExpensiveComponent = React.memo(
  ({ data, id }) => {
    return <div>{/* 复杂的渲染逻辑 */}</div>;
  },
  (prevProps, nextProps) => {
    // 返回 true 表示相等（不重新渲染）
    return prevProps.id === nextProps.id;
  }
);
```

## 2. useMemo 和 useCallback

### useMemo - 缓存计算结果

```jsx
function ExpensiveList({ items }) {
  // ❌ 每次渲染都会重新计算
  const sortedItems = items.sort((a, b) => b.value - a.value);

  // ✅ 只有 items 变化时才重新计算
  const sortedItems = useMemo(
    () => items.sort((a, b) => b.value - a.value),
    [items]
  );

  return (
    <ul>
      {sortedItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### useCallback - 缓存函数引用

```jsx
function TodoList({ todos, tab }) {
  // ❌ 每次渲染都创建新函数
  const handleClick = (id) => {
    console.log(`Clicked ${id}`);
  };

  // ✅ 缓存函数引用
  const handleClick = useCallback((id) => {
    console.log(`Clicked ${id}`);
  }, []); // 依赖项为空，函数永不改变

  return todos.map(todo => (
    <TodoItem
      key={todo.id}
      todo={todo}
      onClick={handleClick}
    />
  ));
}
```

## 3. 虚拟化长列表

对于长列表，使用虚拟化技术只渲染可见部分：

```jsx
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );

  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

## 4. 代码分割和懒加载

### 路由级别的代码分割

```jsx
import { lazy, Suspense } from 'react';

// 懒加载组件
const Dashboard = lazy(() => import('./Dashboard'));
const Profile = lazy(() => import('./Profile'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  );
}
```

### 组件级别的懒加载

```jsx
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function MyComponent() {
  const [showHeavy, setShowHeavy] = useState(false);

  return (
    <div>
      <button onClick={() => setShowHeavy(true)}>
        Load Heavy Component
      </button>
      {showHeavy && (
        <Suspense fallback={<div>Loading...</div>}>
          <HeavyComponent />
        </Suspense>
      )}
    </div>
  );
}
```

## 5. 状态管理优化

### 状态下沉

```jsx
// ❌ 状态提升过高
function App() {
  const [inputValue, setInputValue] = useState('');
  
  return (
    <div>
      <Header />
      <MainContent />
      <SearchBox value={inputValue} onChange={setInputValue} />
    </div>
  );
}

// ✅ 状态下沉到需要的组件
function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <SearchBox /> {/* 状态在 SearchBox 内部管理 */}
    </div>
  );
}
```

### 使用 Context 优化

```jsx
// 拆分 Context 避免不必要的重渲染
const ThemeContext = createContext();
const UserContext = createContext();

// 而不是
const AppContext = createContext(); // 包含 theme 和 user
```

## 6. 优化图片加载

```jsx
function OptimizedImage({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy" // 懒加载
      decoding="async" // 异步解码
      onError={(e) => {
        e.target.src = '/placeholder.png'; // 错误处理
      }}
    />
  );
}

// 使用 srcset 提供不同尺寸
function ResponsiveImage({ src, alt }) {
  return (
    <picture>
      <source
        media="(max-width: 768px)"
        srcSet={`${src}?w=768 768w`}
      />
      <source
        media="(max-width: 1200px)"
        srcSet={`${src}?w=1200 1200w`}
      />
      <img src={`${src}?w=1920`} alt={alt} />
    </picture>
  );
}
```

## 7. 防抖和节流

```jsx
import { useMemo, useCallback } from 'react';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

function SearchComponent() {
  // 防抖 - 搜索输入
  const debouncedSearch = useMemo(
    () => debounce((value) => {
      console.log('Searching for:', value);
    }, 300),
    []
  );

  // 节流 - 滚动事件
  const throttledScroll = useMemo(
    () => throttle(() => {
      console.log('Scrolling...');
    }, 100),
    []
  );

  return (
    <div onScroll={throttledScroll}>
      <input
        onChange={(e) => debouncedSearch(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
}
```

## 8. 使用 Web Workers

```jsx
// worker.js
self.addEventListener('message', (e) => {
  const result = heavyComputation(e.data);
  self.postMessage(result);
});

// React 组件
function HeavyComputationComponent() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const worker = new Worker('/worker.js');
    
    worker.postMessage(largeData);
    
    worker.onmessage = (e) => {
      setResult(e.data);
    };

    return () => worker.terminate();
  }, []);

  return <div>{result}</div>;
}
```

## 9. 性能监控

```jsx
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration) {
  console.log(`${id} (${phase}) took ${actualDuration}ms`);
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Header />
      <MainContent />
      <Footer />
    </Profiler>
  );
}
```

## 10. 生产环境优化清单

- [ ] 启用生产模式构建
- [ ] 开启代码压缩和混淆
- [ ] 使用 CDN 加速静态资源
- [ ] 启用 Gzip/Brotli 压缩
- [ ] 优化包体积（tree shaking）
- [ ] 使用 Service Worker 缓存
- [ ] 预加载关键资源
- [ ] 优化字体加载

## 总结

React 性能优化是一个系统工程，需要从多个维度入手：

1. **组件层面**：合理使用 memo、useMemo、useCallback
2. **架构层面**：代码分割、懒加载、状态管理
3. **资源层面**：图片优化、字体优化、包体积优化
4. **运行时层面**：虚拟化、Web Workers、防抖节流

记住，**过早优化是万恶之源**。先用 React DevTools Profiler 找出性能瓶颈，再针对性优化。 