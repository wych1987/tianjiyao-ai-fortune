---
description: 数据库设计文档，说明 Supabase、MongoDB 与 Redis 的分工、数据模型与缓存策略，适合理解存储层实现。
---

# 数据库设计

天机爻采用 **混合数据库架构**，结合关系型数据库（PostgreSQL）和文档数据库（MongoDB）的优势，实现灵活高效的数据存储方案。

## 数据库架构

```
┌─────────────────────────────────────────────────────┐
│              应用层 (Application)                    │
└────────────────┬────────────────────────────────────┘
                 │
        ┌────────┼────────┐
        │        │        │
        ▼        ▼        ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Supabase │ │ MongoDB  │ │  Redis   │
│(主数据库) │ │(文档库)  │ │ (缓存)   │
└──────────┘ └──────────┘ └──────────┘
```

## 技术选型

| 数据库 | 用途 | 优势 |
|--------|------|------|
| **Supabase** (PostgreSQL) | 用户、订单、权限 | 强一致性、事务支持、关系查询 |
| **MongoDB Atlas** | 占卜历史、日志 | 灵活 Schema、高吞吐量 |
| **Redis** | 缓存、Session | 极速读写、过期控制 |

---

## 一、Supabase 数据库设计

### 1. 用户表 (users)

```sql
CREATE TABLE users (
  -- 主键
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- 基本信息
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE,
  username VARCHAR(50) UNIQUE,
  avatar_url TEXT,
  
  -- 认证
  password_hash TEXT,
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,
  
  -- 个人资料
  birth_date DATE,
  birth_time TIME,
  timezone VARCHAR(50) DEFAULT 'Asia/Shanghai',
  gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
  
  -- 订阅信息
  subscription_tier VARCHAR(20) DEFAULT 'free' 
    CHECK (subscription_tier IN ('free', 'basic', 'premium', 'vip')),
  subscription_expires_at TIMESTAMP WITH TIME ZONE,
  
  -- 状态
  is_active BOOLEAN DEFAULT TRUE,
  last_login_at TIMESTAMP WITH TIME ZONE,
  
  -- 元数据
  metadata JSONB DEFAULT '{}',
  
  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_subscription ON users(subscription_tier, subscription_expires_at);
CREATE INDEX idx_users_created_at ON users(created_at);
```

### 2. 订单表 (orders)

```sql
CREATE TABLE orders (
  -- 主键
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- 用户关联
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- 订单信息
  order_number VARCHAR(50) UNIQUE NOT NULL,
  product_type VARCHAR(50) NOT NULL 
    CHECK (product_type IN ('bazi_basic', 'bazi_premium', 'ziwei', 'compatibility', 'subscription')),
  
  -- 金额
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'CNY',
  
  -- 支付
  payment_method VARCHAR(20) 
    CHECK (payment_method IN ('alipay', 'wechat', 'stripe', 'paypal')),
  payment_status VARCHAR(20) DEFAULT 'pending'
    CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  paid_at TIMESTAMP WITH TIME ZONE,
  
  -- 交易信息
  transaction_id VARCHAR(100),
  
  -- 状态
  status VARCHAR(20) DEFAULT 'active'
    CHECK (status IN ('active', 'expired', 'cancelled')),
  
  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
```

### 3. API 密钥表 (api_keys)

```sql
CREATE TABLE api_keys (
  -- 主键
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- 用户关联
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- 密钥信息
  key_hash TEXT UNIQUE NOT NULL,
  key_prefix VARCHAR(10) NOT NULL, -- 显示前缀，如 "tj_abc..."
  name VARCHAR(100) NOT NULL,
  
  -- 权限
  scopes JSONB DEFAULT '["read"]', -- ['read', 'write', 'admin']
  
  -- 限流
  rate_limit_per_minute INTEGER DEFAULT 100,
  rate_limit_per_day INTEGER DEFAULT 1000,
  
  -- 使用统计
  usage_count INTEGER DEFAULT 0,
  last_used_at TIMESTAMP WITH TIME ZONE,
  
  -- 状态
  is_active BOOLEAN DEFAULT TRUE,
  expires_at TIMESTAMP WITH TIME ZONE,
  
  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_api_keys_user_id ON api_keys(user_id);
CREATE INDEX idx_api_keys_key_hash ON api_keys(key_hash);
CREATE INDEX idx_api_keys_is_active ON api_keys(is_active);
```

### 4. 用户配额表 (user_quotas)

```sql
CREATE TABLE user_quotas (
  -- 主键
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- 用户关联
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- 配额类型
  quota_type VARCHAR(50) NOT NULL 
    CHECK (quota_type IN ('bazi_calculate', 'ai_interpret', 'api_call')),
  
  -- 配额
  total_quota INTEGER NOT NULL,
  used_quota INTEGER DEFAULT 0,
  
  -- 重置周期
  reset_period VARCHAR(20) DEFAULT 'monthly'
    CHECK (reset_period IN ('daily', 'weekly', 'monthly', 'yearly', 'never')),
  last_reset_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  next_reset_at TIMESTAMP WITH TIME ZONE,
  
  -- 时间戳
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 唯一约束
  UNIQUE(user_id, quota_type)
);

-- 索引
CREATE INDEX idx_user_quotas_user_id ON user_quotas(user_id);
```

---

## 二、MongoDB 数据库设计

### 1. 占卜历史集合 (divinations)

```javascript
{
  _id: ObjectId("..."),
  
  // 用户信息
  userId: "uuid-string",
  
  // 占卜类型
  type: "bazi" | "ziwei" | "compatibility",
  
  // 输入数据
  input: {
    birthDate: "1990-01-15",
    birthTime: "14:30",
    timezone: "Asia/Shanghai",
    gender: "male",
    name: "张三" // 可选
  },
  
  // 计算结果
  chart: {
    yearPillar: { heavenlyStem: "庚", earthlyBranch: "午" },
    monthPillar: { heavenlyStem: "己", earthlyBranch: "丑" },
    dayPillar: { heavenlyStem: "甲", earthlyBranch: "寅" },
    hourPillar: { heavenlyStem: "辛", earthlyBranch: "未" }
  },
  
  // AI 解读
  interpretation: {
    personality: "你的性格如春天的树木...",
    career: "适合从事创意、教育类工作...",
    relationship: "感情细腻，重视精神交流...",
    health: "注意肝胆、筋骨健康...",
    advice: ["多接触水元素", "保持规律作息", "发挥创造力"]
  },
  
  // 元数据
  metadata: {
    aiModel: "gpt-4-turbo",
    processingTime: 2340, // ms
    cacheHit: false,
    language: "zh"
  },
  
  // 用户反馈
  feedback: {
    rating: 5, // 1-5 星
    comment: "很准确！",
    helpful: true
  },
  
  // 状态
  status: "completed" | "processing" | "failed",
  
  // 时间戳
  createdAt: ISODate("2025-11-06T10:30:00Z"),
  updatedAt: ISODate("2025-11-06T10:30:05Z")
}
```

**索引：**
```javascript
db.divinations.createIndex({ userId: 1, createdAt: -1 });
db.divinations.createIndex({ type: 1 });
db.divinations.createIndex({ status: 1 });
db.divinations.createIndex({ "metadata.cacheHit": 1 });
```

### 2. 系统日志集合 (logs)

```javascript
{
  _id: ObjectId("..."),
  
  // 日志级别
  level: "info" | "warn" | "error",
  
  // 日志类型
  category: "api" | "ai" | "database" | "payment",
  
  // 日志内容
  message: "User login successful",
  
  // 上下文
  context: {
    userId: "uuid-string",
    requestId: "req-123",
    ip: "192.168.1.1",
    userAgent: "Mozilla/5.0...",
    endpoint: "/api/bazi/calculate"
  },
  
  // 详细信息
  details: {
    // 任意 JSON 数据
  },
  
  // 错误信息（如果是错误日志）
  error: {
    message: "Database connection timeout",
    stack: "Error: ...\n at ...",
    code: "DB_TIMEOUT"
  },
  
  // 时间戳
  timestamp: ISODate("2025-11-06T10:30:00Z")
}
```

**索引：**
```javascript
db.logs.createIndex({ timestamp: -1 });
db.logs.createIndex({ level: 1, timestamp: -1 });
db.logs.createIndex({ category: 1, timestamp: -1 });
db.logs.createIndex({ "context.userId": 1 });

// TTL 索引：30 天后自动删除日志
db.logs.createIndex({ timestamp: 1 }, { expireAfterSeconds: 2592000 });
```

### 3. 分析统计集合 (analytics)

```javascript
{
  _id: ObjectId("..."),
  
  // 统计维度
  dimension: "daily" | "weekly" | "monthly",
  date: ISODate("2025-11-06"),
  
  // 用户统计
  users: {
    total: 10000,
    new: 234,
    active: 5678,
    premium: 890
  },
  
  // 占卜统计
  divinations: {
    total: 50000,
    byType: {
      bazi: 30000,
      ziwei: 15000,
      compatibility: 5000
    },
    aiInterpreted: 45000
  },
  
  // 收入统计
  revenue: {
    total: 123456.78,
    byCurrency: {
      CNY: 100000,
      USD: 3456.78
    },
    byProduct: {
      subscription: 80000,
      oneTime: 43456.78
    }
  },
  
  // 性能统计
  performance: {
    avgResponseTime: 234, // ms
    p95ResponseTime: 567,
    errorRate: 0.05, // %
    cacheHitRate: 72.3 // %
  },
  
  // 时间戳
  createdAt: ISODate("2025-11-06T00:00:00Z")
}
```

**索引：**
```javascript
db.analytics.createIndex({ dimension: 1, date: -1 });
```

---

## 三、Redis 缓存设计

### 1. 缓存键命名规范

```
格式：<namespace>:<entity>:<id>:<field>

示例：
- tj:user:123:profile           # 用户资料
- tj:bazi:abc123:chart          # 八字命盘
- tj:ai:hash123:interpretation  # AI 解读
- tj:session:xyz789             # 用户会话
- tj:ratelimit:user:123:minute  # 限流计数
```

### 2. 缓存数据结构

```typescript
// 用户资料缓存
redis.setex(
  'tj:user:123:profile',
  3600, // 1 小时
  JSON.stringify({
    id: '123',
    username: 'user123',
    tier: 'premium',
    // ...
  })
);

// 八字命盘缓存（长期缓存）
redis.setex(
  'tj:bazi:abc123:chart',
  86400, // 24 小时
  JSON.stringify({ /* 命盘数据 */ })
);

// 限流计数
redis.incr('tj:ratelimit:user:123:minute');
redis.expire('tj:ratelimit:user:123:minute', 60);

// Session 存储
redis.setex(
  'tj:session:xyz789',
  1800, // 30 分钟
  JSON.stringify({
    userId: '123',
    loginAt: Date.now(),
    // ...
  })
);
```

### 3. 缓存策略

| 数据类型 | TTL | 策略 |
|---------|-----|------|
| 用户资料 | 1 小时 | LRU |
| 命盘数据 | 24 小时 | LRU |
| AI 解读 | 24 小时 | LRU |
| Session | 30 分钟 | TTL |
| 限流计数 | 1 分钟 | TTL |

---

## 数据一致性

### 1. 写入策略

**Cache-Aside Pattern (旁路缓存):**

```typescript
async function getUser(userId: string) {
  // 1. 先查缓存
  const cached = await redis.get(`tj:user:${userId}:profile`);
  if (cached) {
    return JSON.parse(cached);
  }

  // 2. 查数据库
  const user = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  // 3. 写入缓存
  await redis.setex(
    `tj:user:${userId}:profile`,
    3600,
    JSON.stringify(user)
  );

  return user;
}

async function updateUser(userId: string, data: any) {
  // 1. 更新数据库
  await supabase
    .from('users')
    .update(data)
    .eq('id', userId);

  // 2. 删除缓存（下次读取时重新加载）
  await redis.del(`tj:user:${userId}:profile`);
}
```

### 2. 事务处理

```sql
-- PostgreSQL 事务示例
BEGIN;

-- 1. 扣除配额
UPDATE user_quotas
SET used_quota = used_quota + 1
WHERE user_id = 'xxx' AND quota_type = 'ai_interpret'
  AND used_quota < total_quota;

-- 2. 创建订单
INSERT INTO orders (user_id, product_type, amount, status)
VALUES ('xxx', 'ai_interpret', 0.00, 'completed');

-- 3. 检查是否成功
IF NOT FOUND THEN
  ROLLBACK;
ELSE
  COMMIT;
END IF;
```

---

## 数据备份与恢复

### 1. 自动备份

**Supabase (PostgreSQL):**
- 每日自动备份
- 保留 7 天
- Point-in-time Recovery (PITR)

**MongoDB Atlas:**
- 连续备份（Continuous Backup）
- 保留 30 天
- Oplog 增量备份

### 2. 恢复策略

```bash
# PostgreSQL 恢复
pg_restore -d tianjiyao backup_file.dump

# MongoDB 恢复
mongorestore --uri="mongodb+srv://..." /backup/path
```

---

## 性能优化

### 1. 查询优化

```sql
-- 使用索引
EXPLAIN ANALYZE
SELECT * FROM orders
WHERE user_id = 'xxx' AND created_at > NOW() - INTERVAL '30 days';

-- 批量查询
SELECT * FROM users WHERE id IN ('id1', 'id2', 'id3');

-- 分页查询
SELECT * FROM divinations
WHERE user_id = 'xxx'
ORDER BY created_at DESC
LIMIT 20 OFFSET 0;
```

### 2. 连接池配置

```typescript
// Supabase 连接池
const supabase = createClient(url, key, {
  db: {
    poolSize: 20,
  },
});

// MongoDB 连接池
const client = new MongoClient(uri, {
  maxPoolSize: 50,
  minPoolSize: 10,
});
```

---

## 数据迁移

### 示例：添加新字段

```sql
-- 1. 添加字段
ALTER TABLE users ADD COLUMN referral_code VARCHAR(20);

-- 2. 创建索引
CREATE INDEX idx_users_referral_code ON users(referral_code);

-- 3. 回填数据（可选）
UPDATE users SET referral_code = generate_referral_code(id);
```

---

## 监控指标

| 指标 | 目标 | 监控工具 |
|------|------|---------|
| 查询响应时间 | < 50ms | Application Insights |
| 连接池使用率 | < 80% | Supabase Dashboard |
| 缓存命中率 | > 70% | Redis Insights |
| 数据库大小 | 监控增长 | Prometheus |
| 慢查询数量 | < 10/小时 | pg_stat_statements |

---

## 下一步

- [前端架构](/architecture/frontend)
- [后端架构](/architecture/backend)
- [AI 引擎设计](/architecture/ai-engine)

---

::: tip 💡 数据库最佳实践
- 使用索引优化查询
- 定期清理过期数据
- 监控慢查询
- 定期备份数据
:::
