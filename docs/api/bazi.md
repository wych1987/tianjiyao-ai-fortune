# 八字排盘 API

八字排盘 API 提供传统命理学中的四柱八字计算与 AI 智能解读服务。

## 端点

```
POST /api/bazi/calculate
```

## 请求参数

### Headers

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
```

### Body

```json
{
  "birthDate": "1990-01-15",
  "birthTime": "14:30",
  "timezone": "Asia/Shanghai",
  "gender": "male",
  "name": "张三",
  "options": {
    "includeAI": true,
    "includeLuck": true,
    "language": "zh"
  }
}
```

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `birthDate` | string | ✅ | 出生日期，格式：YYYY-MM-DD |
| `birthTime` | string | ✅ | 出生时间，格式：HH:mm |
| `timezone` | string | ❌ | 时区，默认 Asia/Shanghai |
| `gender` | string | ✅ | 性别：male / female |
| `name` | string | ❌ | 姓名（用于个性化解读）|
| `options.includeAI` | boolean | ❌ | 是否包含 AI 解读，默认 true |
| `options.includeLuck` | boolean | ❌ | 是否包含大运流年，默认 true |
| `options.language` | string | ❌ | 语言：zh / en，默认 zh |

## 响应数据

### 成功响应

```json
{
  "success": true,
  "data": {
    "chart": {
      "yearPillar": {
        "heavenlyStem": "庚",
        "earthlyBranch": "午",
        "hideStems": ["丁", "己"],
        "element": "金"
      },
      "monthPillar": {
        "heavenlyStem": "己",
        "earthlyBranch": "丑",
        "hideStems": ["己", "癸", "辛"],
        "element": "土"
      },
      "dayPillar": {
        "heavenlyStem": "甲",
        "earthlyBranch": "寅",
        "hideStems": ["甲", "丙", "戊"],
        "element": "木"
      },
      "hourPillar": {
        "heavenlyStem": "辛",
        "earthlyBranch": "未",
        "hideStems": ["己", "丁", "乙"],
        "element": "金"
      }
    },
    "analysis": {
      "dayMaster": "甲",
      "dayMasterElement": "木",
      "elements": {
        "metal": 3,
        "wood": 2,
        "water": 1,
        "fire": 1,
        "earth": 3
      },
      "pattern": "身弱格",
      "usefulGod": "水",
      "avoidGod": "金"
    },
    "luck": {
      "current": {
        "age": 34,
        "stem": "戊",
        "branch": "戌",
        "startYear": 2023,
        "endYear": 2033
      },
      "future": [
        {
          "age": 44,
          "stem": "丁",
          "branch": "酉",
          "startYear": 2033,
          "endYear": 2043
        }
      ]
    },
    "aiInterpretation": {
      "personality": "你的性格如春天的树木...",
      "career": "适合从事创意、教育类工作...",
      "relationship": "感情细腻，重视精神交流...",
      "health": "注意肝胆、筋骨健康...",
      "advice": [
        "多接触水元素相关事物（北方、黑色）",
        "避免过度劳累，保持规律作息",
        "发挥创造力，从事喜欢的工作"
      ]
    }
  },
  "meta": {
    "requestId": "req_abc123",
    "timestamp": "2025-11-06T10:30:00Z",
    "processingTime": 1245
  }
}
```

### 错误响应

```json
{
  "success": false,
  "error": {
    "code": "INVALID_DATE",
    "message": "出生日期不在有效范围内",
    "details": {
      "field": "birthDate",
      "value": "1800-01-01",
      "validRange": "1900-01-01 至 2100-12-31"
    }
  }
}
```

## 示例代码

### cURL

```bash
curl -X POST https://api.tianjiyao.com/v1/api/bazi/calculate \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "birthDate": "1990-01-15",
    "birthTime": "14:30",
    "gender": "male",
    "options": {
      "includeAI": true,
      "language": "zh"
    }
  }'
```

### JavaScript / TypeScript

```typescript
import { TianjiyaoClient } from '@tianjiyao/api-client';

const client = new TianjiyaoClient({
  apiKey: 'YOUR_API_KEY',
});

async function calculateBazi() {
  try {
    const result = await client.bazi.calculate({
      birthDate: '1990-01-15',
      birthTime: '14:30',
      gender: 'male',
      options: {
        includeAI: true,
        language: 'zh',
      },
    });
    
    console.log('八字命盘:', result.data.chart);
    console.log('AI 解读:', result.data.aiInterpretation);
  } catch (error) {
    console.error('错误:', error.message);
  }
}

calculateBazi();
```

### Python

```python
from tianjiyao import TianjiyaoClient

client = TianjiyaoClient(api_key='YOUR_API_KEY')

try:
    result = client.bazi.calculate(
        birth_date='1990-01-15',
        birth_time='14:30',
        gender='male',
        options={
            'include_ai': True,
            'language': 'zh'
        }
    )
    
    print('八字命盘:', result['data']['chart'])
    print('AI 解读:', result['data']['ai_interpretation'])
    
except Exception as e:
    print('错误:', str(e))
```

## 性能指标

| 指标 | 平均值 | P95 | P99 |
|------|--------|-----|-----|
| 响应时间 | 1.2s | 2.5s | 3.8s |
| AI 解读时间 | 800ms | 1.5s | 2.2s |
| 成功率 | 99.8% | - | - |

## 费用

| 套餐 | 价格 | 包含 AI 解读 | 速率限制 |
|------|------|-------------|----------|
| 免费 | $0 | ❌ | 10 次/天 |
| 基础 | $9.9/月 | ✅ | 100 次/月 |
| 专业 | $29.9/月 | ✅ | 1000 次/月 |
| 企业 | 联系我们 | ✅ | 无限制 |

## 注意事项

1. **时间处理**：所有时间应转换为真太阳时进行排盘
2. **时辰边界**：子时（23:00-01:00）需特别处理日期
3. **闰月处理**：农历闰月按实际月份计算
4. **AI 响应**：AI 解读为异步生成，可能需要 1-3 秒

## 相关链接

- [紫微斗数 API](/api/ziwei)
- [AI 合盘 API](/api/compatibility)
- [API 总览](/api/)

---

::: tip 💡 算法详解
想了解八字算法实现？阅读 [八字算法详解](/blog/bazi-algorithm)
:::
