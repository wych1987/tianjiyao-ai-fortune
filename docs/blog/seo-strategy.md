---
description: SEO 优化策略复盘，梳理主站、wiki 与 docs 的内容分工、URL 规范、结构化数据与收录优化实践。
---

# SEO 优化策略：三站联动打造流量生态

::: info 📖 阅读信息
**发布时间：** 2025-11-10  
**阅读时长：** 约 10 分钟  
**难度级别：** 🔥 初级  
**标签：** SEO · 流量增长 · 内容策略 · Google Search Console
:::

## 引言

天机爻采用"三站联动"SEO策略，通过**主站（www）+ 用户文档（wiki）+ 技术文档（docs）**形成完整的流量生态。本文详细讲解我们的 SEO 实践方案。

---

## 三站架构

### 1. 主站（www.tianjiyao.com）

**定位：** 产品核心页面  
**目标用户：** C端用户  
**关键词策略：** 商业关键词

**页面结构：**
```
/                     -> 首页（品牌词）
/bazi                 -> 八字排盘（核心功能词）
/ziwei                -> 紫微斗数（长尾词）
/compatibility        -> 合婚配对（长尾词）
/blog                 -> 内容营销
/about                -> 关于我们（品牌词）
```

**SEO 配置：**
```html
<!-- pages/index.tsx -->
<Head>
  <title>天机爻 - AI智能命理分析平台</title>
  <meta name="description" content="融合传统命理与人工智能，提供精准的八字排盘、紫微斗数、合婚配对服务。" />
  <meta name="keywords" content="八字,紫微斗数,命理,算命,合婚" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="天机爻 - AI智能命理分析平台" />
  <meta property="og:description" content="融合传统命理与人工智能" />
  <meta property="og:image" content="https://www.tianjiyao.com/og-image.jpg" />
  
  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "天机爻",
    "url": "https://www.tianjiyao.com",
    "applicationCategory": "LifestyleApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "CNY"
    }
  }
  </script>
</Head>
```

---

### 2. 用户文档站（wiki.tianjiyao.com）

**定位：** 用户帮助中心  
**目标用户：** 新手用户、教程搜索者  
**关键词策略：** 问题型关键词

**页面结构：**
```
/getting-started      -> 新手入门（"如何使用八字排盘"）
/bazi-guide           -> 八字指南（"八字怎么看"）
/ziwei-guide          -> 紫微指南（"紫微斗数入门"）
/faq                  -> 常见问题（"八字准不准"）
/glossary             -> 术语表（"天干地支是什么"）
```

**内容策略：**
- ✅ 回答用户搜索的问题
- ✅ 详细的图文教程
- ✅ 视频嵌入（YouTube/Bilibili）
- ✅ 内链到主站功能页

**示例页面：**
```markdown
# 如何看懂八字命盘？

## 1. 什么是八字？

八字，又称"四柱八字"，由出生年月日时的天干地支组成...

## 2. 如何排盘？

访问 [天机爻八字排盘](https://www.tianjiyao.com/bazi)，输入生日信息...

## 3. 命盘解读

### 日主（日柱天干）
日主代表自己，是八字的核心...

[立即体验 →](https://www.tianjiyao.com/bazi)
```

---

### 3. 技术文档站（docs.tianjiyao.com）

**定位：** 开发者文档  
**目标用户：** 开发者、技术博主、求职者  
**关键词策略：** 技术关键词

**页面结构：**
```
/architecture         -> 架构设计（"Next.js 架构"）
/api                  -> API 文档（"八字 API"）
/blog                 -> 技术博客（"AI 算法实现"）
```

**SEO 优势：**
- ✅ GitHub Pages 天然高权重
- ✅ 代码片段适合搜索引擎
- ✅ 技术博客吸引外链
- ✅ 开发者社区分享

---

## 关键词策略

### 1. 核心关键词（主站）

**品牌词：**
- 天机爻
- tianjiyao

**核心功能词：**
- 八字排盘
- 紫微斗数
- 在线算命
- AI 算命

**搜索量分析：**
```
关键词          月搜索量    竞争度    优先级
------------------------------------------------
八字排盘        12,000     中等      P0（首页）
紫微斗数        8,500      中等      P0（专题页）
在线算命        45,000     高        P1（博客）
八字合婚        6,700      低        P0（功能页）
```

---

### 2. 长尾关键词（wiki站）

**问题型：**
- 如何看八字
- 八字怎么算
- 紫微斗数准吗
- 什么是命宫

**教程型：**
- 八字入门教程
- 紫微斗数学习
- 天干地支对照表

**对比型：**
- 八字和紫微的区别
- 算命哪个准

---

### 3. 技术关键词（docs站）

- Next.js SEO 优化
- AI 命理算法
- OpenAI GPT-4 应用
- Azure Functions 实践
- React 性能优化

---

## 内容策略

### 1. 主站内容

**博客频率：** 每周 2-3 篇

**主题分布：**
- 40% 命理知识（八字、紫微、风水）
- 30% 案例分析（名人八字解读）
- 20% 用户故事（合婚案例）
- 10% 活动公告

**示例文章：**
```
《揭秘：为什么马云的八字适合创业？》
《2025年十二生肖运势完整版》
《如何通过八字选择适合的职业？》
```

---

### 2. Wiki 内容

**更新频率：** 初期每日 1 篇，后期每周 2 篇

**内容结构：**
```
入门指南（10 篇）
  ├─ 什么是八字？
  ├─ 如何排盘？
  ├─ 基础术语
  └─ ...
  
进阶教程（20 篇）
  ├─ 十神详解
  ├─ 格局分析
  ├─ 大运流年
  └─ ...
  
FAQ（30 个问题）
  ├─ 八字准不准？
  ├─ 可以改命吗？
  └─ ...
```

**SEO 优化：**
```markdown
---
title: 如何看八字？完整入门指南【2025版】
description: 详细讲解八字排盘、十神、格局等基础知识，适合零基础小白。
keywords: 八字, 八字入门, 如何看八字, 八字教程
---

# 如何看八字？完整入门指南

> 📅 更新时间：2025-01-15  
> ⏱️ 阅读时长：8分钟

## 目录
[[toc]]

## 什么是八字？

八字，又称"四柱"，是中国传统命理学...

## 快速上手

想快速体验？访问 [天机爻八字排盘](https://www.tianjiyao.com/bazi)...
```

---

### 3. Docs 技术内容

**文章类型：**
- 架构设计文档
- API 使用教程
- 算法实现详解
- 性能优化案例

**示例：**
```markdown
# 如何用 OpenAI GPT-4 实现 AI 算命？

## 系统架构

[架构图]

## Prompt 设计

我们使用以下 prompt 结构：

\`\`\`typescript
const prompt = `
你是一位精通中国传统命理的大师。

用户信息：
- 八字：${bazi}
- 性别：${gender}

请分析用户的：
1. 性格特点
2. 事业运势
3. 感情运势

分析时要：
- 基于传统命理知识
- 结合现代心理学
- 语气温和，给出建议
`;
\`\`\`

## 完整代码

查看 [GitHub 仓库](https://github.com/tianjiyao/ai-fortune)
```

---

## 技术实现

### 1. Sitemap 生成

```typescript
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://www.tianjiyao.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/admin/*', '/api/*'],
  
  // 动态路由
  additionalPaths: async (config) => {
    const posts = await getAllBlogPosts();
    return posts.map(post => ({
      loc: `/blog/${post.slug}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: post.updatedAt,
    }));
  },
};
```

---

### 2. Robots.txt

```txt
# www.tianjiyao.com/robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://www.tianjiyao.com/sitemap.xml
```

```txt
# wiki.tianjiyao.com/robots.txt
User-agent: *
Allow: /

Sitemap: https://wiki.tianjiyao.com/sitemap.xml
```

```txt
# docs.tianjiyao.com/robots.txt
User-agent: *
Allow: /

Sitemap: https://docs.tianjiyao.com/sitemap.xml
```

---

### 3. 结构化数据

**主站（产品）：**
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "天机爻",
  "url": "https://www.tianjiyao.com",
  "description": "AI智能命理分析平台",
  "applicationCategory": "LifestyleApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "CNY"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "1250"
  }
}
```

**Wiki（文章）：**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "如何看懂八字命盘？",
  "author": {
    "@type": "Organization",
    "name": "天机爻"
  },
  "datePublished": "2025-01-15",
  "dateModified": "2025-01-15",
  "image": "https://wiki.tianjiyao.com/images/bazi-guide.jpg"
}
```

**Docs（技术文档）：**
```json
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "八字算法详解",
  "author": {
    "@type": "Person",
    "name": "技术团队"
  },
  "proficiencyLevel": "Expert"
}
```

---

### 4. 内链策略

**主站 → Wiki：**
```html
<a href="https://wiki.tianjiyao.com/bazi-guide">
  不知道如何看八字？查看新手教程 →
</a>
```

**Wiki → 主站：**
```html
<a href="https://www.tianjiyao.com/bazi">
  立即体验免费八字排盘 →
</a>
```

**Docs → 主站：**
```html
<a href="https://www.tianjiyao.com">
  访问天机爻主站
</a>
```

**权重传递：**
- 主站（DA 最高）→ 分发权重到 wiki 和 docs
- Wiki 和 docs 的流量 → 引导到主站转化

---

## 外链建设

### 1. 技术社区

**发布平台：**
- ✅ 掘金（juejin.cn）
- ✅ 思否（segmentfault.com）
- ✅ CSDN（csdn.net）
- ✅ 知乎（zhihu.com）
- ✅ V2EX（v2ex.com）

**策略：**
- 发布技术文章，附带 docs 链接
- 参与讨论，自然提及项目
- 开源项目展示

---

### 2. 内容平台

**小红书：**
- 案例分享："我用 AI 算命后..."
- 教程："八字入门 3 分钟学会"

**抖音/B站：**
- 短视频："AI 如何解读八字？"
- 直播："手把手教你看八字"

**公众号：**
- 每周发布命理文章
- 底部附带"阅读原文"链接到主站

---

### 3. 问答平台

**知乎：**
- 回答"八字准吗？"类问题
- 附带案例和产品链接

**百度知道：**
- 回答命理相关问题
- 引导到 wiki 教程

---

## 数据监控

### 1. Google Search Console

**监控指标：**
- 展现次数
- 点击次数
- 平均排名
- CTR（点击率）

**优化方向：**
- CTR < 2%：优化 title 和 description
- 排名 11-20：增加内链和外链
- 排名 4-10：优化内容质量

---

### 2. Google Analytics

**关键指标：**
```
流量来源分析：
- Organic Search: 60%
- Direct: 20%
- Referral: 15%
- Social: 5%

用户行为：
- 跳出率 < 50%
- 平均会话时长 > 3 分钟
- 页面/会话 > 3
```

**转化漏斗：**
```
访问首页 (100%)
  ↓ 70%
点击功能页 (70%)
  ↓ 40%
开始排盘 (28%)
  ↓ 50%
查看结果 (14%)
  ↓ 20%
注册账号 (2.8%)
```

---

### 3. 站长工具

**百度站长平台：**
- 提交 sitemap
- 监控索引量
- 查看关键词排名

**必应站长工具：**
- 同样配置

---

## 成本与 ROI

### 投入成本

| 项目 | 月成本 |
|------|--------|
| 域名（3个） | ¥30 |
| 服务器（主站） | ¥300 |
| GitHub Pages（免费） | ¥0 |
| 内容外包（可选） | ¥1000 |
| **总计** | **¥1330** |

### 预期收益

**3个月目标：**
- Organic 流量：5000 UV/day
- 注册用户：300/day
- 付费转化：10/day（假设客单价 ¥50）
- 月收入：¥15,000

**ROI：**
```
(15000 - 1330) / 1330 = 1028%
```

---

## 实施时间表

### 第 1 周
- ✅ 完成三站搭建
- ✅ 配置域名和 SSL
- ✅ 提交 sitemap

### 第 2-4 周
- ⏳ Wiki 撰写 30 篇基础文章
- ⏳ Docs 补充核心文档
- ⏳ 主站发布 10 篇博客

### 第 2-3 月
- ⏳ 外链建设（50+ 高质量外链）
- ⏳ 社交媒体推广
- ⏳ 持续内容更新

### 第 3 月+
- ⏳ 数据分析优化
- ⏳ A/B 测试转化
- ⏳ 扩展新关键词

---

## 最佳实践

### ✅ DO

1. **内容为王**
   - 原创高质量内容
   - 解决用户真实问题
   - 定期更新

2. **技术优化**
   - 页面加载速度 < 2s
   - 移动端适配
   - HTTPS 全站

3. **用户体验**
   - 清晰的导航
   - 合理的内链
   - 无侵入式广告

4. **数据驱动**
   - 定期查看 GSC
   - A/B 测试 title
   - 优化低 CTR 页面

---

### ❌ DON'T

1. **黑帽 SEO**
   - ❌ 关键词堆砌
   - ❌ 购买链接
   - ❌ 隐藏文字

2. **低质内容**
   - ❌ 采集文章
   - ❌ AI 生成未编辑
   - ❌ 标题党

3. **技术问题**
   - ❌ 重复内容
   - ❌ 404 错误
   - ❌ 慢速加载

---

## 总结

天机爻的三站 SEO 策略核心：

1. **www** = 转化（商业词）
2. **wiki** = 流量（教程词）
3. **docs** = 权重（技术词）

**成功要素：**
- ✅ 持续的高质量内容产出
- ✅ 合理的内链和外链布局
- ✅ 数据驱动的优化迭代
- ✅ 用户体验第一

**下一步行动：**
1. 提交 sitemap 到 Google/百度
2. 撰写 wiki 首批 10 篇文章
3. 发布 docs 技术博客到掘金
4. 监控 GSC 数据并优化

---

## 💫 访问天机爻

SEO 的最终目的是为产品带来流量，来看看我们优化的成果吧！

::: tip 🎯 体验产品
👉 **[访问天机爻主站](https://www.tianjiyao.com)** 

🌐 三站生态系统：
- 🏠 **[主站 www](https://www.tianjiyao.com)** - 产品体验
- 📖 **[用户文档 wiki](https://wiki.tianjiyao.com)** - 使用教程
- 💻 **[技术文档 docs](https://docs.tianjiyao.com)** - 开发者资源
:::

---

## 相关链接

- [架构设计](/architecture/)
- [技术栈选择](/tech-stack/)
- [API 文档](/api/)
- [更多技术博客](/blog/)

---

::: tip 💡 SEO 工具推荐
- **Google Search Console**：监控搜索表现
- **Ahrefs**：竞品分析和外链挖掘
- **Semrush**：关键词研究
- **Screaming Frog**：技术 SEO 审计
:::
