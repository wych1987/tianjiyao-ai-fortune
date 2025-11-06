# AI 引擎设计

天机爻的核心竞争力在于其智能化的 AI 解读系统，深度集成 **OpenAI GPT-4** 模型，结合传统命理知识图谱，提供专业、温暖、个性化的命理分析。

## AI 架构总览

```
用户输入（生辰八字）
    ↓
命理算法计算（排盘）
    ↓
结构化数据提取
    ↓
知识图谱查询
    ↓
Prompt 工程（上下文构建）
    ↓
OpenAI GPT-4 模型
    ↓
结果后处理与优化
    ↓
多语言输出
```

## 核心技术栈

| 技术 | 用途 |
|------|------|
| OpenAI GPT-4 Turbo | 核心解读模型 |
| Azure OpenAI Service | 企业级 API 服务 |
| Pinecone | 向量数据库（知识检索）|
| LangChain | AI 工作流编排 |
| Azure Cognitive Services | 语音合成、翻译 |

## AI 解读流程

### 1. 数据预处理

```typescript
// lib/ai/preprocessor.ts
interface BirthData {
  year: number;
  month: number;
  day: number;
  hour: number;
  gender: 'male' | 'female';
}

export function preprocessBirthData(data: BirthData) {
  // 计算天干地支
  const chart = calculateBaziChart(data);
  
  // 提取五行分布
  const elements = analyzeElements(chart);
  
  // 识别格局
  const pattern = identifyPattern(chart);
  
  return {
    chart,
    elements,
    pattern,
    metadata: {
      season: getSeason(data.month),
      dayMaster: chart.dayPillar.heavenlyStem,
    }
  };
}
```

### 2. 知识图谱检索

```typescript
// lib/ai/knowledge-retrieval.ts
import { PineconeClient } from '@pinecone-database/pinecone';

export async function retrieveKnowledge(query: string) {
  const pinecone = new PineconeClient();
  await pinecone.init({
    environment: 'us-west1-gcp',
    apiKey: process.env.PINECONE_API_KEY,
  });

  const index = pinecone.Index('bazi-knowledge');
  
  // 向量化查询
  const embedding = await getEmbedding(query);
  
  // 相似度搜索
  const results = await index.query({
    vector: embedding,
    topK: 5,
    includeMetadata: true,
  });
  
  return results.matches.map(m => m.metadata);
}
```

### 3. Prompt 工程

```typescript
// lib/ai/prompt-builder.ts
export function buildBaziPrompt(data: ProcessedData) {
  const systemPrompt = `
你是一位精通中国传统命理学的 AI 大师，专业于八字分析。
你的解读应该：
1. 基于传统命理理论，但用现代化的语言表达
2. 准确、专业，但温暖、富有同理心
3. 避免过度负面或绝对化的表述
4. 提供具体的、可操作的建议

当前分析的命盘信息：
- 日主：${data.dayMaster}
- 五行分布：${JSON.stringify(data.elements)}
- 格局：${data.pattern}
- 季节：${data.metadata.season}
`;

  const userPrompt = `
请分析以下八字命盘，从这些维度提供解读：

1. **性格特点**（200字）
   - 基于日主和五行分布分析性格优势
   - 指出潜在的性格盲点

2. **事业发展**（200字）
   - 适合的职业方向
   - 事业运势的周期性变化

3. **感情婚姻**（200字）
   - 感情模式与偏好
   - 理想伴侣类型

4. **健康建议**（150字）
   - 需要注意的健康问题
   - 养生建议

5. **行动建议**（150字）
   - 3条具体的、可执行的建议

命盘数据：
${JSON.stringify(data.chart, null, 2)}

请用温暖、专业的语气进行解读。
`;

  return { systemPrompt, userPrompt };
}
```

### 4. OpenAI API 调用

```typescript
// lib/ai/openai-client.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateInterpretation(
  systemPrompt: string,
  userPrompt: string,
  options = {}
) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 2000,
      top_p: 0.9,
      frequency_penalty: 0.3,
      presence_penalty: 0.3,
      ...options,
    });

    return {
      content: completion.choices[0].message.content,
      usage: completion.usage,
      model: completion.model,
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('AI 解读服务暂时不可用');
  }
}
```

### 5. 流式输出（实时响应）

```typescript
// lib/ai/streaming.ts
export async function streamInterpretation(
  systemPrompt: string,
  userPrompt: string
) {
  const stream = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    stream: true,
    temperature: 0.7,
  });

  return new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        controller.enqueue(new TextEncoder().encode(content));
      }
      controller.close();
    },
  });
}
```

## Prompt 优化策略

### Few-shot Learning

```typescript
const fewShotExamples = `
【示例 1】
命盘：甲木日主，生于春季，木旺
解读：你的性格如春天的树木，充满生机与活力。你天生具有向上生长的动力...

【示例 2】
命盘：庚金日主，生于秋季，金旺
解读：你的性格如秋天的金属，坚韧而锋利。你具有强大的执行力和决断力...
`;
```

### 上下文压缩

```typescript
// 减少 token 消耗
function compressContext(data: ChartData) {
  return {
    dm: data.dayMaster,        // 日主
    el: data.elements,         // 五行
    pt: data.pattern,          // 格局
    // ... 只保留关键信息
  };
}
```

### 温度控制

```typescript
const temperatureMap = {
  personality: 0.8,    // 性格分析：较高创造性
  career: 0.6,         // 事业：平衡
  health: 0.4,         // 健康：较低创造性（更严谨）
};
```

## AI 安全与伦理

### 内容过滤

```typescript
// lib/ai/content-filter.ts
const bannedKeywords = [
  '死亡', '绝症', '破产', '离婚',
  // ... 更多负面词汇
];

export function filterContent(text: string) {
  let filtered = text;
  
  // 替换负面词汇
  bannedKeywords.forEach(keyword => {
    filtered = filtered.replace(
      new RegExp(keyword, 'g'),
      '需要注意'
    );
  });
  
  return filtered;
}
```

### 免责声明

```typescript
const disclaimer = `
【重要提示】
本分析由 AI 基于传统命理理论生成，仅供参考和娱乐。
命理分析不能替代专业咨询（心理、医疗、法律等）。
您的命运由自己创造，请理性看待分析结果。
`;
```

## 性能优化

### 1. 缓存策略

```typescript
// lib/ai/cache.ts
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export async function getCachedInterpretation(
  key: string
): Promise<string | null> {
  const cached = await redis.get(`ai:${key}`);
  if (cached) {
    console.log('Cache hit');
    return cached;
  }
  return null;
}

export async function setCachedInterpretation(
  key: string,
  value: string,
  ttl = 3600
) {
  await redis.setex(`ai:${key}`, ttl, value);
}
```

### 2. 批量处理

```typescript
// 批量生成解读（节省 API 调用）
export async function batchInterpretation(
  requests: InterpretationRequest[]
) {
  const prompts = requests.map(buildBaziPrompt);
  
  // 并发调用（限制并发数）
  const results = await pMap(
    prompts,
    async (prompt) => await generateInterpretation(prompt),
    { concurrency: 5 }
  );
  
  return results;
}
```

### 3. Token 优化

```typescript
// 估算 token 数量
function estimateTokens(text: string): number {
  // 中文：1 字符 ≈ 2 tokens
  // 英文：1 单词 ≈ 1.3 tokens
  const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWords = (text.match(/[a-zA-Z]+/g) || []).length;
  
  return chineseChars * 2 + englishWords * 1.3;
}
```

## 多语言支持

```typescript
// lib/ai/translation.ts
export async function translateInterpretation(
  text: string,
  targetLang: 'en' | 'zh'
) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `Translate the following fortune-telling analysis to ${targetLang}. Keep the professional and empathetic tone.`
      },
      { role: 'user', content: text }
    ],
    temperature: 0.3, // 低温度保证翻译准确性
  });
  
  return response.choices[0].message.content;
}
```

## 监控与分析

```typescript
// lib/ai/monitoring.ts
export function logAIMetrics(data: {
  model: string;
  tokens: number;
  latency: number;
  cost: number;
}) {
  // 发送到 Application Insights
  appInsights.trackMetric({
    name: 'AI_Token_Usage',
    value: data.tokens,
  });
  
  appInsights.trackMetric({
    name: 'AI_Latency',
    value: data.latency,
  });
  
  // 计算成本
  const costPerToken = 0.00003; // GPT-4 价格
  const totalCost = data.tokens * costPerToken;
  
  console.log(`AI 调用: ${data.model}, 耗时 ${data.latency}ms, 成本 $${totalCost.toFixed(4)}`);
}
```

## 成本控制

| 模型 | 输入价格 | 输出价格 | 平均成本/次 |
|------|---------|---------|------------|
| GPT-4 Turbo | $0.01/1K | $0.03/1K | $0.08 |
| GPT-3.5 Turbo | $0.0005/1K | $0.0015/1K | $0.004 |

**优化策略：**
- 普通用户：GPT-3.5 Turbo
- 付费用户：GPT-4 Turbo
- 缓存热点数据（相同命盘）
- 压缩 Prompt（减少 token）

## 下一步

- [后端架构](/architecture/backend)
- [数据库设计](/architecture/database)
- [OpenAI 集成详解](/tech-stack/openai)

---

::: tip 💡 想了解实现细节？
查看博客文章 [AI 占卜技术实现](/blog/ai-fortune-telling) 了解更多。
:::
