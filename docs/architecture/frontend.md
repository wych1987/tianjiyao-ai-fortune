# 前端架构设计

天机爻前端基于 **Next.js 14** 构建，采用现代化的 React 开发模式，提供流畅的用户体验和卓越的性能表现。

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 14.x | React 框架，支持 SSR/SSG |
| React | 18.x | UI 组件库 |
| TypeScript | 5.x | 类型安全 |
| Tailwind CSS | 3.x | 原子化 CSS |
| Zustand | 4.x | 轻量级状态管理 |
| React Query | 5.x | 数据获取与缓存 |
| Framer Motion | 11.x | 动画库 |
| shadcn/ui | - | UI 组件库 |

## 项目结构

```
frontend/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 认证相关页面
│   │   ├── login/
│   │   └── register/
│   ├── (main)/            # 主要功能页面
│   │   ├── bazi/          # 八字排盘
│   │   ├── ziwei/         # 紫微斗数
│   │   ├── compatibility/ # 合盘匹配
│   │   └── dashboard/     # 用户中心
│   ├── api/               # API Routes
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # 组件
│   ├── ui/               # UI 基础组件
│   ├── features/         # 功能组件
│   └── layouts/          # 布局组件
├── lib/                  # 工具库
│   ├── api/             # API 请求
│   ├── utils/           # 工具函数
│   └── hooks/           # 自定义 Hooks
├── store/               # 状态管理
├── styles/              # 样式文件
├── public/              # 静态资源
└── types/               # TypeScript 类型定义
```

## 渲染策略

### 1. 静态生成 (SSG)

适用于内容不经常变化的页面：

```typescript
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  return <Article post={post} />;
}
```

**应用场景**：
- 首页
- 博客文章
- 功能介绍页面

### 2. 服务端渲染 (SSR)

适用于需要实时数据的页面：

```typescript
// app/dashboard/page.tsx
export default async function Dashboard() {
  const session = await getServerSession();
  const userData = await fetchUserData(session.user.id);
  
  return <DashboardLayout data={userData} />;
}
```

**应用场景**：
- 用户中心
- 占卜结果页面
- 个性化推荐页面

### 3. 客户端渲染 (CSR)

适用于交互密集的页面：

```typescript
'use client';

export default function BaziCalculator() {
  const [birthInfo, setBirthInfo] = useState({});
  const { data, isLoading } = useQuery({
    queryKey: ['bazi', birthInfo],
    queryFn: () => calculateBazi(birthInfo),
  });
  
  return <Calculator data={data} loading={isLoading} />;
}
```

**应用场景**：
- 八字计算器
- 交互式图表
- 实时聊天

## 组件设计

### 原子化设计系统

```
Atoms (原子)
  ↓
Molecules (分子)
  ↓
Organisms (组织)
  ↓
Templates (模板)
  ↓
Pages (页面)
```

### 示例：按钮组件

```typescript
// components/ui/button.tsx
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary/90',
        outline: 'border border-input hover:bg-accent',
        ghost: 'hover:bg-accent',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export function Button({ variant, size, ...props }: ButtonProps) {
  return <button className={buttonVariants({ variant, size })} {...props} />;
}
```

## 状态管理

### Zustand Store

```typescript
// store/userStore.ts
import { create } from 'zustand';

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
```

### React Query (数据获取)

```typescript
// lib/hooks/useBaziData.ts
import { useQuery } from '@tanstack/react-query';

export function useBaziData(birthInfo: BirthInfo) {
  return useQuery({
    queryKey: ['bazi', birthInfo],
    queryFn: async () => {
      const response = await fetch('/api/bazi', {
        method: 'POST',
        body: JSON.stringify(birthInfo),
      });
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 分钟缓存
    enabled: !!birthInfo.birthDate,
  });
}
```

## 性能优化

### 1. 代码分割

```typescript
// 动态导入组件
const DynamicChart = dynamic(() => import('@/components/Chart'), {
  loading: () => <Skeleton />,
  ssr: false,
});
```

### 2. 图片优化

```typescript
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="天机爻"
  width={1200}
  height={600}
  priority
  placeholder="blur"
/>
```

### 3. 字体优化

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
```

### 4. 预加载关键资源

```typescript
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <link rel="preconnect" href="https://api.tianjiyao.com" />
        <link rel="dns-prefetch" href="https://cdn.tianjiyao.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## SEO 优化

### Metadata API

```typescript
// app/bazi/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '八字排盘 - 天机爻 AI 命理分析',
  description: '免费在线八字排盘，AI 智能解读命格运势，精准分析五行喜忌',
  keywords: ['八字排盘', 'AI占卜', '命理分析', '天机爻'],
  openGraph: {
    title: '八字排盘 - 天机爻',
    description: '免费在线八字排盘，AI 智能解读',
    url: 'https://www.tianjiyao.com/bazi',
    images: ['/og-bazi.png'],
  },
};
```

### 结构化数据

```typescript
// components/StructuredData.tsx
export function BaziStructuredData({ data }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '八字排盘分析',
    author: {
      '@type': 'Organization',
      name: '天机爻',
    },
    // ... 更多数据
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
```

## 国际化 (i18n)

```typescript
// lib/i18n.ts
import { createI18n } from 'next-international';

export const { useI18n, I18nProvider } = createI18n({
  zh: () => import('./locales/zh.json'),
  en: () => import('./locales/en.json'),
});

// 使用
const t = useI18n();
<h1>{t('welcome')}</h1>
```

## 响应式设计

### Tailwind 断点

```typescript
<div className="
  w-full           // 移动端：100% 宽度
  md:w-1/2         // 平板：50% 宽度
  lg:w-1/3         // 桌面：33.33% 宽度
  xl:w-1/4         // 大屏：25% 宽度
">
  内容
</div>
```

### 自适应布局

```css
/* 使用 CSS Grid 实现响应式 */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
```

## 动画与交互

### Framer Motion

```typescript
import { motion } from 'framer-motion';

export function AnimatedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      卡片内容
    </motion.div>
  );
}
```

## 错误处理

```typescript
// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>出错了！</h2>
      <p>{error.message}</p>
      <button onClick={reset}>重试</button>
    </div>
  );
}
```

## 部署优化

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 图片优化
  images: {
    domains: ['cdn.tianjiyao.com'],
    formats: ['image/avif', 'image/webp'],
  },
  
  // 压缩
  compress: true,
  
  // 严格模式
  reactStrictMode: true,
  
  // 实验性功能
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons'],
  },
};

export default nextConfig;
```

## 性能指标

| 指标 | 目标 | 实际 |
|------|------|------|
| First Contentful Paint | < 1.8s | 1.2s |
| Largest Contentful Paint | < 2.5s | 1.8s |
| Time to Interactive | < 3.8s | 2.5s |
| Cumulative Layout Shift | < 0.1 | 0.05 |
| First Input Delay | < 100ms | 65ms |

## 下一步

- [后端架构](/architecture/backend)
- [AI 引擎设计](/architecture/ai-engine)
- [部署方案](/tech-stack/deployment)

---

::: tip 💡 技术细节
想了解更多前端实现细节？查看 [Next.js 应用](/tech-stack/nextjs) 或 [GitHub 源代码](https://github.com/wych1987/tianjiyao-ai-fortune)。
:::
