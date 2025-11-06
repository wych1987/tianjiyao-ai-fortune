# 技术栈详解

天机爻采用现代化的全栈技术方案，覆盖前端、后端、AI、数据库、部署等全链路。

## 🎯 技术选型原则

- **稳定可靠**：选择经过生产验证的成熟技术
- **性能优先**：追求极致的加载速度和响应时间
- **开发效率**：TypeScript 全栈，提升开发体验
- **成本可控**：优先选择按需付费的云服务
- **易于扩展**：模块化设计，支持水平扩展

---

## 📦 完整技术栈

### 前端技术栈

| 技术 | 版本 | 用途 | 为什么选择 |
|------|------|------|-----------|
| **Next.js** | 14.x | React 框架 | SSR/SSG 支持，SEO 友好，性能卓越 |
| **React** | 18.x | UI 库 | 生态成熟，组件化开发，虚拟 DOM 优化 |
| **TypeScript** | 5.x | 类型安全 | 编译时错误检测，代码提示，重构友好 |
| **Tailwind CSS** | 3.x | CSS 框架 | 原子化 CSS，开发效率高，打包体积小 |
| **Zustand** | 4.x | 状态管理 | 轻量级，API 简洁，无需 Provider |
| **React Query** | 5.x | 数据获取 | 自动缓存，请求去重，后台刷新 |
| **Framer Motion** | 11.x | 动画库 | 声明式 API，性能优异，手势支持 |
| **shadcn/ui** | - | 组件库 | 可定制，无 npm 依赖，Tailwind 集成 |

**示例：Next.js App Router**

```typescript
// app/bazi/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '八字排盘 - 天机爻',
  description: 'AI 智能八字分析',
};

export default async function BaziPage() {
  // SSR: 服务端渲染
  const data = await fetchInitialData();
  
  return (
    <div>
      <h1>八字排盘</h1>
      <BaziCalculator initialData={data} />
    </div>
  );
}
```

---

### 后端技术栈

| 技术 | 版本 | 用途 | 为什么选择 |
|------|------|------|-----------|
| **Node.js** | 18.x | 运行时 | 高性能，异步 I/O，生态丰富 |
| **Azure Functions** | v4 | 无服务器 | 按需付费，自动扩展，零运维 |
| **TypeScript** | 5.x | 类型安全 | 与前端共享类型定义 |
| **Express.js** | 4.x | Web 框架 | 轻量灵活，中间件丰富 |
| **Joi** | 17.x | 参数验证 | 声明式 Schema，错误提示友好 |
| **Winston** | 3.x | 日志库 | 结构化日志，多传输支持 |

**示例：Azure Function**

```typescript
// functions/bazi/index.ts
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { calculateBazi } from '@/lib/bazi';

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest) => {
  const { birthDate, birthTime, gender } = req.body;
  const chart = await calculateBazi({ birthDate, birthTime, gender });
  
  context.res = {
    status: 200,
    body: { success: true, data: chart },
  };
};

export default httpTrigger;
```

---

### AI 技术栈

| 技术 | 版本 | 用途 | 为什么选择 |
|------|------|------|-----------|
| **OpenAI GPT-4** | Turbo | 文本生成 | 最强 LLM，理解能力卓越 |
| **Azure OpenAI** | - | 企业 API | 稳定可靠，合规性强 |
| **LangChain** | 0.1.x | AI 工作流 | Prompt 管理，链式调用 |
| **Pinecone** | - | 向量数据库 | 知识检索，语义搜索 |
| **Azure Speech** | - | 语音合成 | TTS 输出，多语言支持 |

**示例：OpenAI API 调用**

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const completion = await openai.chat.completions.create({
  model: 'gpt-4-turbo',
  messages: [
    { role: 'system', content: '你是命理大师' },
    { role: 'user', content: '分析这个八字...' },
  ],
  temperature: 0.7,
  stream: true, // 流式输出
});
```

---

### 数据存储技术栈

| 技术 | 版本 | 用途 | 为什么选择 |
|------|------|------|-----------|
| **Supabase** | - | PostgreSQL | 开源，实时订阅，自带 Auth |
| **MongoDB Atlas** | 7.x | NoSQL 数据库 | 灵活 Schema，水平扩展 |
| **Redis** | 7.x | 缓存/Session | 高性能，数据结构丰富 |
| **Azure Blob** | - | 对象存储 | 文件存储，CDN 集成 |

**示例：Supabase 查询**

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId)
  .single();
```

---

### 部署与运维

| 技术 | 用途 | 为什么选择 |
|------|------|-----------|
| **Vercel** | 前端部署 | 零配置，全球 CDN，自动 HTTPS |
| **Azure** | 后端部署 | 企业级稳定性，合规性强 |
| **Cloudflare** | CDN/DNS | 全球加速，DDoS 防护 |
| **GitHub Actions** | CI/CD | 免费，集成度高，配置简单 |
| **Docker** | 容器化 | 环境一致，快速部署 |

**示例：GitHub Actions**

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - run: npm run deploy
```

---

### 监控与分析

| 技术 | 用途 | 为什么选择 |
|------|------|-----------|
| **Azure Insights** | 性能监控 | 分布式追踪，实时告警 |
| **Sentry** | 错误追踪 | 详细错误栈，用户上下文 |
| **Google Analytics** | 用户分析 | 流量分析，转化追踪 |
| **PostHog** | 产品分析 | 开源，功能全面，隐私友好 |

---

## 🔧 开发工具

| 工具 | 用途 |
|------|------|
| **VS Code** | 代码编辑器 |
| **Cursor** | AI 辅助编程 |
| **Postman** | API 测试 |
| **DBeaver** | 数据库管理 |
| **Figma** | UI 设计 |
| **Git** | 版本控制 |

---

## 📊 技术对比

### 为什么选择 Next.js 而不是 Vite?

| 特性 | Next.js | Vite |
|------|---------|------|
| SSR/SSG | ✅ 内置 | ❌ 需手动配置 |
| 路由 | ✅ 文件系统路由 | ❌ 需引入 React Router |
| SEO | ✅ 优秀 | ⚠️ 需额外配置 |
| 部署 | ✅ Vercel 一键部署 | ⚠️ 需手动配置 |
| 学习曲线 | ⚠️ 中等 | ✅ 简单 |

**结论**：Next.js 更适合需要 SEO 的项目。

### 为什么选择 Azure Functions 而不是 AWS Lambda?

| 特性 | Azure Functions | AWS Lambda |
|------|----------------|-----------|
| TypeScript 支持 | ✅ 原生支持 | ⚠️ 需配置 |
| 冷启动时间 | ⚠️ 1-2s | ⚠️ 1-3s |
| 价格 | ✅ 略便宜 | ⚠️ 略贵 |
| 中国区可用性 | ✅ 有中国区 | ❌ 需备案 |
| 生态 | ⚠️ 中等 | ✅ 最丰富 |

**结论**：Azure 在中国区可用性更好。

### 为什么选择 Supabase 而不是 Firebase?

| 特性 | Supabase | Firebase |
|------|----------|----------|
| 数据库类型 | ✅ PostgreSQL (SQL) | ⚠️ Firestore (NoSQL) |
| 开源 | ✅ 完全开源 | ❌ 闭源 |
| 实时订阅 | ✅ 支持 | ✅ 支持 |
| 定价 | ✅ 更透明 | ⚠️ 复杂 |
| 数据导出 | ✅ 容易 | ⚠️ 困难 |

**结论**：Supabase 更灵活，数据掌控力强。

---

## 🚀 性能优化

### 1. 前端优化

```typescript
// 代码分割
const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false,
});

// 图片优化
import Image from 'next/image';

<Image
  src="/hero.jpg"
  width={1200}
  height={600}
  alt="天机爻"
  priority
  placeholder="blur"
/>

// 字体优化
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });
```

### 2. 后端优化

```typescript
// 连接池
const pool = new Pool({ max: 20 });

// 批量查询
const users = await db.query(
  'SELECT * FROM users WHERE id = ANY($1)',
  [userIds]
);

// 缓存
const cached = await redis.get(key);
if (cached) return JSON.parse(cached);
```

### 3. 数据库优化

```sql
-- 创建索引
CREATE INDEX idx_users_email ON users(email);

-- 查询优化
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 'xxx';

-- 分区表（大表优化）
CREATE TABLE orders_2025 PARTITION OF orders
FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');
```

---

## 📈 可扩展性设计

### 水平扩展

- **前端**：Vercel 自动扩展
- **后端**：Azure Functions 按需扩展（最多 200 实例）
- **数据库**：读写分离、分片

### 垂直扩展

- **计算**：升级 Azure Functions Premium Plan
- **数据库**：增加 CPU/内存
- **缓存**：Redis Cluster

---

## 🔐 安全措施

| 层级 | 措施 |
|------|------|
| **网络** | HTTPS、DDoS 防护、WAF |
| **认证** | JWT、OAuth 2.0、多因子认证 |
| **数据** | AES-256 加密、敏感数据脱敏 |
| **代码** | 依赖扫描、代码审计、SAST |
| **权限** | RBAC、最小权限原则 |

---

## 💰 成本估算

### 月度成本（1 万用户）

| 服务 | 月费用（USD） |
|------|-------------|
| Vercel Pro | $20 |
| Azure Functions | $50 |
| Supabase Pro | $25 |
| MongoDB Atlas | $57 |
| Redis Cloud | $10 |
| OpenAI API | $200 |
| Cloudflare Pro | $20 |
| **总计** | **$382** |

### 优化建议

- 使用缓存减少 OpenAI API 调用
- 优化数据库查询减少连接数
- 使用免费额度（GitHub Actions、Vercel 等）

---

## 🎓 学习资源

### 官方文档

- [Next.js 文档](https://nextjs.org/docs)
- [React 文档](https://react.dev/)
- [TypeScript 文档](https://www.typescriptlang.org/docs/)
- [Azure Functions 文档](https://docs.microsoft.com/azure/azure-functions/)
- [Supabase 文档](https://supabase.com/docs)

### 推荐课程

- [Next.js 14 完整教程](https://www.youtube.com/watch?v=wm5gMKuwSYk)
- [Azure Functions 实战](https://learn.microsoft.com/training/paths/create-serverless-applications/)
- [TypeScript 深入理解](https://www.typescriptlang.org/docs/handbook/intro.html)

---

## 📋 技术决策记录

### ADR-001: 选择 Next.js 作为前端框架

**决策日期**：2025-01-15

**背景**：需要一个 SEO 友好、性能优异的 React 框架

**决策**：选择 Next.js 14

**理由**：
- SSR/SSG 支持，SEO 优秀
- Vercel 部署体验极佳
- 社区活跃，生态成熟

**后果**：
- 学习曲线略陡
- 但长期收益大

---

## 下一步

- [系统架构](/architecture/)
- [前端架构](/architecture/frontend)
- [后端架构](/architecture/backend)
- [AI 引擎设计](/architecture/ai-engine)

---

::: tip 💡 技术选型建议
选择技术时，考虑：
1. 是否适合项目需求
2. 团队是否熟悉
3. 生态是否成熟
4. 长期维护成本
:::
