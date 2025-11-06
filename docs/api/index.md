# API 文档总览

天机爻提供 RESTful API 接口,支持第三方应用集成命理分析功能。

## 基础信息

- **Base URL**: `https://api.tianjiyao.com/v1`
- **认证方式**: Bearer Token (JWT)
- **请求格式**: JSON
- **响应格式**: JSON
- **速率限制**: 100 请求/分钟（免费），1000 请求/分钟（付费）

## 认证

所有 API 请求需要在 Header 中携带 JWT Token：

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### 获取 Token

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your_password"
}
```

**响应：**

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 3600
  }
}
```

## API 端点

### 八字排盘 API

详见 [八字排盘 API 文档](/api/bazi)

```http
POST /api/bazi/calculate
```

### 紫微斗数 API

详见 [紫微斗数 API 文档](/api/ziwei)

```http
POST /api/ziwei/calculate
```

### AI 合盘 API

详见 [AI 合盘 API 文档](/api/compatibility)

```http
POST /api/compatibility/analyze
```

## 通用响应格式

### 成功响应

```json
{
  "success": true,
  "data": {
    // ... 业务数据
  },
  "message": "操作成功"
}
```

### 错误响应

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "参数验证失败",
    "details": [
      {
        "field": "birthDate",
        "message": "出生日期格式不正确"
      }
    ]
  }
}
```

## 错误码

| 错误码 | HTTP 状态 | 说明 |
|--------|-----------|------|
| `VALIDATION_ERROR` | 400 | 请求参数验证失败 |
| `UNAUTHORIZED` | 401 | 未授权（Token 无效或过期）|
| `FORBIDDEN` | 403 | 无权限访问 |
| `NOT_FOUND` | 404 | 资源不存在 |
| `RATE_LIMIT_EXCEEDED` | 429 | 超过速率限制 |
| `INTERNAL_ERROR` | 500 | 服务器内部错误 |
| `AI_SERVICE_ERROR` | 503 | AI 服务暂时不可用 |

## 速率限制

API 速率限制通过 HTTP Header 返回：

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1704067200
```

## SDK 支持

### JavaScript / TypeScript

```bash
npm install @tianjiyao/api-client
```

```typescript
import { TianjiyaoClient } from '@tianjiyao/api-client';

const client = new TianjiyaoClient({
  apiKey: 'YOUR_API_KEY',
});

const result = await client.bazi.calculate({
  birthDate: '1990-01-01',
  birthTime: '12:00',
  gender: 'male',
});
```

### Python

```bash
pip install tianjiyao-sdk
```

```python
from tianjiyao import TianjiyaoClient

client = TianjiyaoClient(api_key='YOUR_API_KEY')

result = client.bazi.calculate(
    birth_date='1990-01-01',
    birth_time='12:00',
    gender='male'
)
```

## Webhooks

支持 Webhook 通知异步任务结果：

```http
POST /api/webhooks/register
Content-Type: application/json

{
  "url": "https://your-domain.com/webhook",
  "events": ["bazi.completed", "compatibility.completed"],
  "secret": "your_webhook_secret"
}
```

## API 变更日志

### v1.2.0 (2025-11-01)
- 新增紫微斗数 API
- 优化 AI 解读速度

### v1.1.0 (2025-10-01)
- 新增合盘匹配 API
- 支持批量请求

### v1.0.0 (2025-09-01)
- 初始版本发布
- 支持八字排盘 API

## 下一步

- [八字排盘 API](/api/bazi)
- [紫微斗数 API](/api/ziwei)
- [AI 合盘 API](/api/compatibility)

---

::: tip 需要帮助？
联系我们：api-support@tianjiyao.com
:::
