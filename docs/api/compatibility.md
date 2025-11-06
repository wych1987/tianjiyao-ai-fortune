# AI 合盘匹配 API

AI 合盘匹配 API 提供两人命理数据的智能分析与匹配度评分，支持情感、事业、友谊等多维度合盘。

## 端点

```
POST /api/compatibility/analyze
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
  "person1": {
    "name": "张三",
    "birthDate": "1990-01-15",
    "birthTime": "14:30",
    "timezone": "Asia/Shanghai",
    "gender": "male"
  },
  "person2": {
    "name": "李四",
    "birthDate": "1992-05-20",
    "birthTime": "09:45",
    "timezone": "Asia/Shanghai",
    "gender": "female"
  },
  "compatibilityType": "romantic",
  "options": {
    "includeAI": true,
    "includeBazi": true,
    "includeZiwei": true,
    "language": "zh"
  }
}
```

#### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `person1` | object | ✅ | 第一个人的信息 |
| `person1.name` | string | ❌ | 姓名（用于报告） |
| `person1.birthDate` | string | ✅ | 出生日期 YYYY-MM-DD |
| `person1.birthTime` | string | ✅ | 出生时间 HH:mm |
| `person1.timezone` | string | ❌ | 时区，默认 Asia/Shanghai |
| `person1.gender` | string | ✅ | 性别：male / female |
| `person2` | object | ✅ | 第二个人的信息（同上） |
| `compatibilityType` | string | ✅ | 合盘类型：romantic（情感）/ career（事业）/ friendship（友谊）|
| `options.includeAI` | boolean | ❌ | 是否包含 AI 解读，默认 true |
| `options.includeBazi` | boolean | ❌ | 是否包含八字合盘，默认 true |
| `options.includeZiwei` | boolean | ❌ | 是否包含紫微合盘，默认 false |
| `options.language` | string | ❌ | 语言：zh / en，默认 zh |

## 响应数据

### 成功响应

```json
{
  "success": true,
  "data": {
    "compatibility": {
      "overall": {
        "score": 85,
        "level": "excellent",
        "summary": "你们的匹配度非常高，在多个维度都表现出良好的互补性..."
      },
      "dimensions": {
        "personality": {
          "score": 82,
          "description": "性格互补",
          "details": "一方外向活泼，一方内敛沉稳，形成良好平衡"
        },
        "values": {
          "score": 88,
          "description": "价值观一致",
          "details": "对家庭、事业、生活的看法高度一致"
        },
        "communication": {
          "score": 79,
          "description": "沟通顺畅",
          "details": "能够理解对方想法，表达清晰"
        },
        "emotion": {
          "score": 90,
          "description": "情感共鸣",
          "details": "情感需求高度契合，容易产生共鸣"
        },
        "lifestyle": {
          "score": 84,
          "description": "生活习惯相近",
          "details": "作息、兴趣爱好较为一致"
        }
      }
    },
    "baziAnalysis": {
      "elementCompatibility": {
        "person1Elements": { "metal": 2, "wood": 3, "water": 1, "fire": 2, "earth": 2 },
        "person2Elements": { "metal": 3, "wood": 2, "water": 2, "fire": 1, "earth": 2 },
        "harmony": "good",
        "description": "五行互补，水木金形成良性循环"
      },
      "dayMasterCompatibility": {
        "person1DayMaster": "甲木",
        "person2DayMaster": "癸水",
        "relationship": "生助",
        "score": 90,
        "description": "水生木，形成生助关系，非常有利"
      },
      "patternCompatibility": {
        "person1Pattern": "身弱格",
        "person2Pattern": "身强格",
        "compatibility": "complementary",
        "description": "强弱互补，能够相互支持"
      }
    },
    "ziweiAnalysis": {
      "mainStarCompatibility": {
        "person1MainStar": "紫微",
        "person2MainStar": "天府",
        "compatibility": "excellent",
        "description": "紫府同宫，形成帝王格局，配合默契"
      },
      "palaceCompatibility": {
        "person1Spouse": ["廉贞", "天相"],
        "person2Life": ["天府", "太阴"],
        "harmony": "good",
        "description": "配偶宫与命宫星曜和谐"
      }
    },
    "aiInterpretation": {
      "strengths": [
        "性格互补，一动一静，相得益彰",
        "价值观高度一致，对生活有共同追求",
        "情感共鸣强，容易理解对方内心",
        "五行互补，能够相互滋养",
        "星曜配置和谐，长期相处融洽"
      ],
      "challenges": [
        "沟通方式需要磨合，避免误解",
        "生活节奏可能需要调整",
        "决策时需要多商量，避免独断"
      ],
      "suggestions": [
        "保持开放沟通，及时表达内心想法",
        "尊重彼此差异，欣赏对方优点",
        "共同规划未来，建立共同目标",
        "定期约会，保持新鲜感",
        "遇到问题冷静处理，避免情绪化"
      ],
      "futureOutlook": "你们的关系发展前景非常乐观。虽然可能会经历一些小波折，但只要保持良好沟通，互相理解支持，就能建立稳固的关系。建议在2025年下半年考虑进一步发展关系。"
    },
    "matchingIndex": {
      "romantic": 85,
      "career": 78,
      "friendship": 90,
      "family": 82
    }
  },
  "meta": {
    "requestId": "req_comp123",
    "timestamp": "2025-11-06T10:30:00Z",
    "processingTime": 3245
  }
}
```

### 错误响应

```json
{
  "success": false,
  "error": {
    "code": "SAME_PERSON",
    "message": "两人信息相同，无法进行合盘分析",
    "details": {
      "field": "person2",
      "reason": "出生日期时间与 person1 完全相同"
    }
  }
}
```

## 匹配度等级说明

| 分数范围 | 等级 | 中文 | 说明 |
|---------|------|------|------|
| 90-100 | excellent | 绝配 | 极高匹配度，天作之合 |
| 80-89 | very_good | 很好 | 高匹配度，关系和谐 |
| 70-79 | good | 良好 | 中上匹配度，需适当磨合 |
| 60-69 | fair | 一般 | 中等匹配度，需努力经营 |
| 50-59 | below_average | 较差 | 中下匹配度，挑战较多 |
| 0-49 | poor | 不佳 | 低匹配度，需谨慎考虑 |

## 合盘类型说明

### 1. 情感合盘 (romantic)

**分析维度：**
- 性格互补性
- 情感共鸣度
- 价值观一致性
- 生活习惯契合度
- 夫妻宫分析

**适用场景：**
- 恋爱关系
- 婚姻评估
- 配偶选择

### 2. 事业合盘 (career)

**分析维度：**
- 能力互补性
- 合作默契度
- 事业观一致性
- 决策风格匹配
- 官禄宫分析

**适用场景：**
- 合伙创业
- 工作搭档
- 团队组建

### 3. 友谊合盘 (friendship)

**分析维度：**
- 性格相近度
- 兴趣共同点
- 交往舒适度
- 价值观契合
- 朋友宫分析

**适用场景：**
- 朋友关系
- 社交评估
- 圈子融入

## 示例代码

### cURL

```bash
curl -X POST https://api.tianjiyao.com/v1/api/compatibility/analyze \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "person1": {
      "name": "张三",
      "birthDate": "1990-01-15",
      "birthTime": "14:30",
      "gender": "male"
    },
    "person2": {
      "name": "李四",
      "birthDate": "1992-05-20",
      "birthTime": "09:45",
      "gender": "female"
    },
    "compatibilityType": "romantic",
    "options": {
      "includeAI": true,
      "includeBazi": true
    }
  }'
```

### JavaScript / TypeScript

```typescript
import { TianjiyaoClient } from '@tianjiyao/api-client';

const client = new TianjiyaoClient({
  apiKey: 'YOUR_API_KEY',
});

async function analyzeCompatibility() {
  try {
    const result = await client.compatibility.analyze({
      person1: {
        name: '张三',
        birthDate: '1990-01-15',
        birthTime: '14:30',
        gender: 'male',
      },
      person2: {
        name: '李四',
        birthDate: '1992-05-20',
        birthTime: '09:45',
        gender: 'female',
      },
      compatibilityType: 'romantic',
      options: {
        includeAI: true,
        includeBazi: true,
      },
    });
    
    console.log('匹配度:', result.data.compatibility.overall.score);
    console.log('优势:', result.data.aiInterpretation.strengths);
    console.log('建议:', result.data.aiInterpretation.suggestions);
  } catch (error) {
    console.error('错误:', error.message);
  }
}

analyzeCompatibility();
```

### Python

```python
from tianjiyao import TianjiyaoClient

client = TianjiyaoClient(api_key='YOUR_API_KEY')

try:
    result = client.compatibility.analyze(
        person1={
            'name': '张三',
            'birth_date': '1990-01-15',
            'birth_time': '14:30',
            'gender': 'male'
        },
        person2={
            'name': '李四',
            'birth_date': '1992-05-20',
            'birth_time': '09:45',
            'gender': 'female'
        },
        compatibility_type='romantic',
        options={
            'include_ai': True,
            'include_bazi': True
        }
    )
    
    print('匹配度:', result['data']['compatibility']['overall']['score'])
    print('优势:', result['data']['ai_interpretation']['strengths'])
    print('建议:', result['data']['ai_interpretation']['suggestions'])
    
except Exception as e:
    print('错误:', str(e))
```

## 性能指标

| 指标 | 平均值 | P95 | P99 |
|------|--------|-----|-----|
| 响应时间 | 3.2s | 5.5s | 7.2s |
| AI 解读时间 | 2.5s | 4.0s | 5.5s |
| 成功率 | 99.5% | - | - |

## 费用

| 套餐 | 价格 | 包含 AI 解读 | 速率限制 |
|------|------|-------------|----------|
| 免费 | $0 | ❌ | 3 次/天 |
| 基础 | $9.9/月 | ✅ | 30 次/月 |
| 专业 | $29.9/月 | ✅ | 300 次/月 |
| 企业 | 联系我们 | ✅ | 无限制 |

## 注意事项

1. **隐私保护**：合盘数据不会长期保存，请放心使用
2. **数据准确性**：确保两人的出生信息准确
3. **参考性质**：合盘结果仅供参考，不作为决策唯一依据
4. **伦理考量**：尊重他人隐私，需征得同意后使用

## 算法原理

### 1. 八字合盘算法

```
匹配度 = (五行互补度 × 0.3) + (日主相生度 × 0.4) + (格局互补度 × 0.3)

五行互补度：
- 完全互补：100分
- 部分互补：70-90分
- 五行冲突：30-60分

日主相生：
- 相生：90-100分
- 比肩：70-80分
- 相克：40-60分
```

### 2. 紫微合盘算法

```
匹配度 = (主星配置 × 0.4) + (宫位和谐 × 0.3) + (四化协调 × 0.3)

主星配置：
- 帝王格配合：95-100分
- 吉星互动：80-90分
- 煞星影响：50-70分
```

### 3. AI 综合评分

使用 GPT-4 模型综合所有维度，给出：
- 整体匹配度
- 各维度评分
- 优势与挑战
- 发展建议

## 相关链接

- [八字排盘 API](/api/bazi)
- [紫微斗数 API](/api/ziwei)
- [API 总览](/api/)

---

::: tip 💡 合盘建议
- 高分≠完美关系，需要双方共同经营
- 低分≠无法相处，理解包容最重要
- 合盘是参考，真实相处体验更关键
:::
