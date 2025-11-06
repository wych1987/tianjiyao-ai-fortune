# 后端架构设计

天机爻后端采用 **Serverless 无服务器架构**，基于 Azure Functions 构建，实现高可用、弹性扩展和按需付费的云原生应用。

## 技术架构概览

```
┌─────────────────────────────────────────────────────────┐
│                  API Gateway Layer                       │
│  Azure API Management / Vercel Edge Functions           │
│  • 请求路由  • 限流控制  • 身份验证  • 日志记录        │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ 八字排盘服务  │ │ 紫微斗数服务  │ │ AI 解读服务   │
│ (Function)   │ │ (Function)   │ │ (Function)   │
└──────┬───────┘ └──────┬───────┘ └──────┬───────┘
       │                │                │
       └────────────────┼────────────────┘
                        ▼
        ┌───────────────────────────────┐
        │    Service Bus (消息队列)     │
        │  • 异步任务  • 事件驱动       │
        └───────────────┬───────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Supabase     │ │ MongoDB      │ │ Redis Cache  │
│ (主数据库)    │ │ (文档数据库)  │ │ (缓存层)     │
└──────────────┘ └──────────────┘ └──────────────┘
```

## 核心技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Azure Functions | v4 | 无服务器计算 |
| Node.js | 18.x | 运行时环境 |
| TypeScript | 5.x | 类型安全 |
| Azure API Management | - | API 网关 |
| Azure Service Bus | - | 消息队列 |
| Supabase | - | PostgreSQL 数据库 |
| MongoDB Atlas | 7.x | NoSQL 数据库 |
| Redis | 7.x | 缓存和 Session |
| Azure Blob Storage | - | 文件存储 |

## 微服务架构

### 1. 八字排盘服务

**功能：** 计算四柱八字、大运流年

```typescript
// functions/bazi-calculate/index.ts
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { calculateBazi } from '../../lib/bazi';

const httpTrigger: AzureFunction = async (
  context: Context,
  req: HttpRequest
): Promise<void> => {
  try {
    // 1. 参数验证
    const { birthDate, birthTime, timezone, gender } = req.body;
    
    if (!birthDate || !birthTime || !gender) {
      context.res = {
        status: 400,
        body: { error: 'Missing required parameters' }
      };
      return;
    }

    // 2. 八字计算
    const chart = await calculateBazi({
      birthDate,
      birthTime,
      timezone: timezone || 'Asia/Shanghai',
      gender,
    });

    // 3. 缓存结果
    const cacheKey = generateCacheKey(req.body);
    await cache.set(cacheKey, chart, 3600); // 1小时

    // 4. 记录日志
    context.log('Bazi calculation completed', { userId: req.headers['x-user-id'] });

    // 5. 返回结果
    context.res = {
      status: 200,
      body: {
        success: true,
        data: chart,
      },
    };
  } catch (error) {
    context.log.error('Bazi calculation error', error);
    context.res = {
      status: 500,
      body: { error: 'Internal server error' },
    };
  }
};

export default httpTrigger;
```

### 2. AI 解读服务

**功能：** 调用 OpenAI API 生成命理解读

```typescript
// functions/ai-interpret/index.ts
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { generateInterpretation } from '../../lib/ai';
import { ServiceBusClient } from '@azure/service-bus';

const httpTrigger: AzureFunction = async (
  context: Context,
  req: HttpRequest
): Promise<void> => {
  try {
    const { chart, userId } = req.body;

    // 1. 检查缓存
    const cacheKey = `ai:${generateHash(chart)}`;
    const cached = await cache.get(cacheKey);
    
    if (cached) {
      context.res = {
        status: 200,
        body: { success: true, data: cached, fromCache: true },
      };
      return;
    }

    // 2. 异步处理（长时间任务）
    if (req.query.async === 'true') {
      // 发送到消息队列
      const serviceBusClient = new ServiceBusClient(process.env.SERVICE_BUS_CONNECTION);
      const sender = serviceBusClient.createSender('ai-interpret-queue');
      
      await sender.sendMessages({
        body: { chart, userId },
        messageId: `ai-${Date.now()}`,
      });

      context.res = {
        status: 202,
        body: {
          success: true,
          message: 'Request queued for processing',
          requestId: `ai-${Date.now()}`,
        },
      };
      return;
    }

    // 3. 同步处理
    const interpretation = await generateInterpretation(chart);

    // 4. 保存到数据库和缓存
    await Promise.all([
      cache.set(cacheKey, interpretation, 86400), // 24小时
      saveToDatabase({ userId, chart, interpretation }),
    ]);

    context.res = {
      status: 200,
      body: {
        success: true,
        data: interpretation,
      },
    };
  } catch (error) {
    context.log.error('AI interpretation error', error);
    
    // 发送到 Sentry
    Sentry.captureException(error);
    
    context.res = {
      status: 500,
      body: { error: 'AI service temporarily unavailable' },
    };
  }
};

export default httpTrigger;
```

### 3. 用户认证服务

**功能：** JWT 验证、权限控制

```typescript
// functions/auth/middleware.ts
import jwt from 'jsonwebtoken';
import { Context, HttpRequest } from '@azure/functions';

export async function authenticate(
  context: Context,
  req: HttpRequest
): Promise<boolean> {
  try {
    // 1. 提取 Token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      context.res = {
        status: 401,
        body: { error: 'Missing or invalid authorization header' },
      };
      return false;
    }

    const token = authHeader.substring(7);

    // 2. 验证 Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. 检查用户状态
    const user = await getUserById(decoded.userId);
    if (!user || !user.isActive) {
      context.res = {
        status: 403,
        body: { error: 'User account is inactive' },
      };
      return false;
    }

    // 4. 注入用户信息
    req.user = user;
    return true;
  } catch (error) {
    context.res = {
      status: 401,
      body: { error: 'Invalid or expired token' },
    };
    return false;
  }
}
```

## 数据流程

### 1. 同步请求流程

```
用户请求
  ↓
API Gateway (身份验证、限流)
  ↓
Azure Function (业务逻辑)
  ↓
缓存查询 (Redis)
  ↓ (缓存未命中)
数据库查询 (Supabase/MongoDB)
  ↓
OpenAI API (AI 解读)
  ↓
写入缓存
  ↓
返回结果
```

### 2. 异步请求流程

```
用户请求
  ↓
API Gateway
  ↓
Azure Function (入队)
  ↓
Service Bus (消息队列)
  ↓
返回 202 Accepted
  
后台处理：
Service Bus → Worker Function → 处理任务 → 保存结果 → Webhook 通知
```

## 性能优化

### 1. 缓存策略

```typescript
// lib/cache/strategy.ts
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export class CacheStrategy {
  // L1: 内存缓存（进程内，最快）
  private memoryCache = new Map<string, any>();
  
  // L2: Redis 缓存（分布式，快）
  private redisClient = redis;

  async get(key: string): Promise<any> {
    // 先查内存缓存
    if (this.memoryCache.has(key)) {
      return this.memoryCache.get(key);
    }

    // 再查 Redis
    const value = await this.redisClient.get(key);
    if (value) {
      const parsed = JSON.parse(value);
      this.memoryCache.set(key, parsed); // 回写 L1
      return parsed;
    }

    return null;
  }

  async set(key: string, value: any, ttl: number): Promise<void> {
    this.memoryCache.set(key, value);
    await this.redisClient.setex(key, ttl, JSON.stringify(value));
  }
}
```

### 2. 连接池管理

```typescript
// lib/db/pool.ts
import { Pool } from 'pg';

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 20, // 最大连接数
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }
  return pool;
}
```

### 3. 批量处理

```typescript
// functions/batch-process/index.ts
export async function processBatch(requests: Request[]): Promise<Result[]> {
  // 批量查询（减少数据库往返）
  const userIds = requests.map(r => r.userId);
  const users = await batchGetUsers(userIds);

  // 并发处理（利用多核）
  const results = await Promise.all(
    requests.map(req => processRequest(req, users[req.userId]))
  );

  return results;
}
```

## 错误处理

### 1. 全局错误处理

```typescript
// lib/errors/handler.ts
import * as Sentry from '@sentry/node';

export class ErrorHandler {
  static async handle(error: Error, context: Context): Promise<void> {
    // 1. 记录日志
    context.log.error('Unhandled error', {
      error: error.message,
      stack: error.stack,
    });

    // 2. 发送到 Sentry
    Sentry.captureException(error);

    // 3. 用户友好的错误消息
    const userMessage = this.getUserFriendlyMessage(error);

    // 4. 返回错误响应
    context.res = {
      status: this.getStatusCode(error),
      body: {
        success: false,
        error: userMessage,
        requestId: context.invocationId,
      },
    };
  }

  private static getUserFriendlyMessage(error: Error): string {
    if (error instanceof ValidationError) {
      return '请求参数验证失败';
    }
    if (error instanceof UnauthorizedError) {
      return '未授权访问';
    }
    return '服务暂时不可用，请稍后重试';
  }

  private static getStatusCode(error: Error): number {
    if (error instanceof ValidationError) return 400;
    if (error instanceof UnauthorizedError) return 401;
    if (error instanceof NotFoundError) return 404;
    return 500;
  }
}
```

### 2. 重试机制

```typescript
// lib/utils/retry.ts
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      // 指数退避
      const waitTime = delay * Math.pow(2, i);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
  throw new Error('Max retries exceeded');
}
```

## 监控与日志

### 1. Application Insights

```typescript
// lib/monitoring/insights.ts
import { TelemetryClient } from 'applicationinsights';

const client = new TelemetryClient(process.env.APPINSIGHTS_KEY);

export function trackMetric(name: string, value: number, properties?: any): void {
  client.trackMetric({
    name,
    value,
    properties,
  });
}

export function trackEvent(name: string, properties?: any): void {
  client.trackEvent({
    name,
    properties,
  });
}

// 使用示例
trackMetric('ai_response_time', 1234, { model: 'gpt-4' });
trackEvent('bazi_calculated', { userId: '123', success: true });
```

### 2. 结构化日志

```typescript
// lib/logging/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

export function logInfo(message: string, meta?: any): void {
  logger.info(message, {
    timestamp: new Date().toISOString(),
    ...meta,
  });
}
```

## 安全措施

### 1. 请求验证

```typescript
// lib/validation/schemas.ts
import Joi from 'joi';

export const baziRequestSchema = Joi.object({
  birthDate: Joi.date().required(),
  birthTime: Joi.string().pattern(/^\d{2}:\d{2}$/).required(),
  timezone: Joi.string().default('Asia/Shanghai'),
  gender: Joi.string().valid('male', 'female').required(),
});
```

### 2. 限流控制

```typescript
// lib/ratelimit/limiter.ts
import { RateLimiterRedis } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: 'ratelimit',
  points: 100, // 100 请求
  duration: 60, // 每 60 秒
});

export async function checkRateLimit(userId: string): Promise<boolean> {
  try {
    await rateLimiter.consume(userId);
    return true;
  } catch {
    return false; // 超过限制
  }
}
```

## 部署配置

### Azure Functions 配置

```json
// host.json
{
  "version": "2.0",
  "logging": {
    "applicationInsights": {
      "samplingSettings": {
        "isEnabled": true,
        "maxTelemetryItemsPerSecond": 20
      }
    }
  },
  "extensions": {
    "http": {
      "routePrefix": "api",
      "maxOutstandingRequests": 200,
      "maxConcurrentRequests": 100
    }
  },
  "functionTimeout": "00:05:00"
}
```

### 环境变量

```bash
# .env
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
OPENAI_API_KEY=sk-...
JWT_SECRET=...
SERVICE_BUS_CONNECTION=...
APPINSIGHTS_KEY=...
```

## 性能指标

| 指标 | 目标 | 当前 |
|------|------|------|
| API 响应时间 (P50) | < 200ms | 180ms |
| API 响应时间 (P95) | < 500ms | 450ms |
| 冷启动时间 | < 2s | 1.5s |
| 并发处理能力 | > 1000 req/s | 1200 req/s |
| 错误率 | < 0.1% | 0.05% |
| 可用性 | > 99.9% | 99.95% |

## 扩展性设计

- **水平扩展**：Azure Functions 自动扩展（最多 200 实例）
- **垂直扩展**：Premium Plan 提供更大内存
- **数据库扩展**：读写分离、分片
- **缓存扩展**：Redis Cluster

## 下一步

- [前端架构](/architecture/frontend)
- [AI 引擎设计](/architecture/ai-engine)
- [数据库设计](/architecture/database)

---

::: tip 💡 想了解更多？
查看 [Azure Functions 文档](https://docs.microsoft.com/azure/azure-functions/) 或 [技术博客](/blog/)。
:::
