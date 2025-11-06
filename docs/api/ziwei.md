# 紫微斗数 API

紫微斗数 API 提供传统紫微斗数命盘计算与 AI 智能解读服务。

## 端点

```
POST /api/ziwei/calculate
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
  "calendar": "gregorian",
  "options": {
    "includeAI": true,
    "includeLuck": true,
    "language": "zh",
    "school": "sanzhe"
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
| `calendar` | string | ❌ | 历法：gregorian（公历）/ lunar（农历），默认 gregorian |
| `options.includeAI` | boolean | ❌ | 是否包含 AI 解读，默认 true |
| `options.includeLuck` | boolean | ❌ | 是否包含大限流年，默认 true |
| `options.language` | string | ❌ | 语言：zh / en，默认 zh |
| `options.school` | string | ❌ | 派系：sanzhe（三合）/ feixing（飞星）/ sishihua（四化），默认 sanzhe |

## 响应数据

### 成功响应

```json
{
  "success": true,
  "data": {
    "chart": {
      "命宫": {
        "palace": "命宫",
        "heavenlyStem": "甲",
        "earthlyBranch": "寅",
        "majorStars": ["紫微", "天府"],
        "minorStars": ["左辅", "右弼", "文昌"],
        "brightness": {
          "紫微": "庙",
          "天府": "旺"
        },
        "fourTransformations": {
          "化禄": "紫微",
          "化权": null,
          "化科": null,
          "化忌": null
        }
      },
      "兄弟宫": {
        "palace": "兄弟宫",
        "heavenlyStem": "乙",
        "earthlyBranch": "卯",
        "majorStars": ["太阳", "太阴"],
        "minorStars": ["天魁", "天钺"],
        "brightness": {
          "太阳": "旺",
          "太阴": "庙"
        }
      },
      "夫妻宫": {
        "palace": "夫妻宫",
        "heavenlyStem": "丙",
        "earthlyBranch": "辰",
        "majorStars": ["廉贞", "天相"],
        "minorStars": ["文曲", "禄存"]
      },
      "子女宫": {
        "palace": "子女宫",
        "heavenlyStem": "丁",
        "earthlyBranch": "巳",
        "majorStars": ["天机", "巨门"],
        "minorStars": ["天马"]
      },
      "财帛宫": {
        "palace": "财帛宫",
        "heavenlyStem": "戊",
        "earthlyBranch": "午",
        "majorStars": ["武曲", "破军"],
        "minorStars": ["陀罗"]
      },
      "疾厄宫": {
        "palace": "疾厄宫",
        "heavenlyStem": "己",
        "earthlyBranch": "未",
        "majorStars": ["天同", "天梁"],
        "minorStars": ["火星"]
      },
      "迁移宫": {
        "palace": "迁移宫",
        "heavenlyStem": "庚",
        "earthlyBranch": "申",
        "majorStars": ["七杀"],
        "minorStars": ["铃星"]
      },
      "奴仆宫": {
        "palace": "奴仆宫",
        "heavenlyStem": "辛",
        "earthlyBranch": "酉",
        "majorStars": ["贪狼"],
        "minorStars": ["地空", "地劫"]
      },
      "官禄宫": {
        "palace": "官禄宫",
        "heavenlyStem": "壬",
        "earthlyBranch": "戌",
        "majorStars": [],
        "minorStars": ["擎羊"]
      },
      "田宅宫": {
        "palace": "田宅宫",
        "heavenlyStem": "癸",
        "earthlyBranch": "亥",
        "majorStars": [],
        "minorStars": []
      },
      "福德宫": {
        "palace": "福德宫",
        "heavenlyStem": "甲",
        "earthlyBranch": "子",
        "majorStars": [],
        "minorStars": []
      },
      "父母宫": {
        "palace": "父母宫",
        "heavenlyStem": "乙",
        "earthlyBranch": "丑",
        "majorStars": [],
        "minorStars": []
      }
    },
    "analysis": {
      "lifePattern": "紫府同宫",
      "bodyPalace": "兄弟宫",
      "majorStarsCount": 14,
      "positiveStarsCount": 8,
      "negativeStarsCount": 6,
      "strength": "strong",
      "personality": "领导型"
    },
    "luck": {
      "current": {
        "type": "大限",
        "age": "34-43",
        "palace": "财帛宫",
        "heavenlyStem": "戊",
        "earthlyBranch": "午",
        "majorStars": ["武曲", "破军"],
        "interpretation": "财运旺盛，但需注意理财风险"
      },
      "annual": {
        "year": 2025,
        "palace": "官禄宫",
        "heavenlyStem": "乙",
        "earthlyBranch": "巳",
        "interpretation": "事业运势良好，适合进取"
      }
    },
    "aiInterpretation": {
      "overall": "你的命盘格局为紫府同宫，属于帝王格局...",
      "personality": "性格稳重大气，具有领导气质...",
      "career": "适合从事管理、政府、金融等领域...",
      "wealth": "财运稳健，正财为主，偏财次之...",
      "relationship": "感情细腻，重视承诺与责任...",
      "health": "注意心脑血管、肝胆健康...",
      "advice": [
        "发挥领导才能，承担更大责任",
        "保持稳健理财，避免高风险投资",
        "注重家庭和谐，平衡事业与生活"
      ]
    }
  },
  "meta": {
    "requestId": "req_xyz789",
    "timestamp": "2025-11-06T10:30:00Z",
    "processingTime": 1856
  }
}
```

### 错误响应

```json
{
  "success": false,
  "error": {
    "code": "INVALID_BIRTHTIME",
    "message": "出生时间格式不正确",
    "details": {
      "field": "birthTime",
      "value": "25:00",
      "expected": "HH:mm 格式，如 14:30"
    }
  }
}
```

## 紫微斗数星曜列表

### 主星（14 颗）

| 星曜 | 五行 | 属性 | 特质 |
|------|------|------|------|
| 紫微 | 土 | 帝星 | 领导、尊贵、权威 |
| 天机 | 木 | 善星 | 智慧、变动、机敏 |
| 太阳 | 火 | 中性 | 光明、权贵、父亲 |
| 武曲 | 金 | 财星 | 刚毅、财富、武职 |
| 天同 | 水 | 福星 | 温和、享福、懒散 |
| 廉贞 | 火 | 次桃花 | 感情、才艺、变动 |
| 天府 | 土 | 令星 | 稳重、保守、守财 |
| 太阴 | 水 | 财星 | 温柔、财富、母亲 |
| 贪狼 | 木/水 | 桃花星 | 欲望、才艺、多变 |
| 巨门 | 水 | 暗星 | 口才、是非、疑虑 |
| 天相 | 水 | 印星 | 助力、随和、依赖 |
| 天梁 | 土 | 荫星 | 长者、贵人、保守 |
| 七杀 | 金 | 杀星 | 果断、孤独、武职 |
| 破军 | 水 | 耗星 | 开创、破坏、变动 |

### 辅星与煞星

**六吉星：**
- 左辅、右弼：助力、合作
- 文昌、文曲：文采、考运
- 天魁、天钺：贵人、提携

**六煞星：**
- 擎羊、陀罗：阻碍、纠缠
- 火星、铃星：冲动、暴躁
- 地空、地劫：破财、幻想

## 示例代码

### cURL

```bash
curl -X POST https://api.tianjiyao.com/v1/api/ziwei/calculate \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "birthDate": "1990-01-15",
    "birthTime": "14:30",
    "gender": "male",
    "options": {
      "includeAI": true,
      "school": "sanzhe"
    }
  }'
```

### JavaScript / TypeScript

```typescript
import { TianjiyaoClient } from '@tianjiyao/api-client';

const client = new TianjiyaoClient({
  apiKey: 'YOUR_API_KEY',
});

async function calculateZiwei() {
  try {
    const result = await client.ziwei.calculate({
      birthDate: '1990-01-15',
      birthTime: '14:30',
      gender: 'male',
      options: {
        includeAI: true,
        school: 'sanzhe',
        language: 'zh',
      },
    });
    
    console.log('命盘:', result.data.chart);
    console.log('AI 解读:', result.data.aiInterpretation);
  } catch (error) {
    console.error('错误:', error.message);
  }
}

calculateZiwei();
```

### Python

```python
from tianjiyao import TianjiyaoClient

client = TianjiyaoClient(api_key='YOUR_API_KEY')

try:
    result = client.ziwei.calculate(
        birth_date='1990-01-15',
        birth_time='14:30',
        gender='male',
        options={
            'include_ai': True,
            'school': 'sanzhe',
            'language': 'zh'
        }
    )
    
    print('命盘:', result['data']['chart'])
    print('AI 解读:', result['data']['ai_interpretation'])
    
except Exception as e:
    print('错误:', str(e))
```

## 派系说明

### 三合派（sanzhe）

- **特点**：注重星曜庙旺，三方四正
- **优势**：理论成熟，应用广泛
- **适合**：性格分析、大运流年

### 飞星派（feixing）

- **特点**：注重星曜飞化，动态变化
- **优势**：细节丰富，预测精准
- **适合**：具体事件、流年流月

### 四化派（sishihua）

- **特点**：注重四化（禄权科忌）
- **优势**：简洁明了，重点突出
- **适合**：财运分析、事业预测

## 性能指标

| 指标 | 平均值 | P95 | P99 |
|------|--------|-----|-----|
| 响应时间 | 1.8s | 3.2s | 4.5s |
| AI 解读时间 | 1.2s | 2.0s | 2.8s |
| 成功率 | 99.7% | - | - |

## 费用

| 套餐 | 价格 | 包含 AI 解读 | 速率限制 |
|------|------|-------------|----------|
| 免费 | $0 | ❌ | 5 次/天 |
| 基础 | $9.9/月 | ✅ | 50 次/月 |
| 专业 | $29.9/月 | ✅ | 500 次/月 |
| 企业 | 联系我们 | ✅ | 无限制 |

## 注意事项

1. **时辰处理**：子时需注意早晚子时的区别
2. **农历转换**：农历日期需提供年月日
3. **星曜亮度**：不同出生时间，星曜亮度不同
4. **派系差异**：不同派系解读可能有差异

## 相关链接

- [八字排盘 API](/api/bazi)
- [AI 合盘 API](/api/compatibility)
- [API 总览](/api/)

---

::: tip 💡 算法详解
想了解紫微斗数算法？查看我们的技术博客（即将推出）。
:::
