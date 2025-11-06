---
layout: home

hero:
  name: "天机爻"
  text: "AI 命理平台技术文档"
  tagline: 融合东方智慧与现代 AI 技术的开源命理分析平台
  image:
    src: /logo.png
    alt: 天机爻 Logo
  actions:
    - theme: brand
      text: 开始阅读
      link: /architecture/
    - theme: alt
      text: 访问主站
      link: https://www.tianjiyao.com
    - theme: alt
      text: GitHub
      link: https://github.com/wych1987/tianjiyao-ai-fortune

features:
  - icon: 🏗️
    title: 系统架构
    details: 基于 Next.js + Azure + OpenAI 的现代化微服务架构，支持高并发和弹性扩展
    link: /architecture/
    linkText: 查看架构设计
  
  - icon: 🤖
    title: AI 引擎
    details: 深度集成 OpenAI GPT 模型，结合传统命理知识图谱，提供智能化解读
    link: /architecture/ai-engine
    linkText: AI 引擎详解
  
  - icon: 🧮
    title: 命理算法
    details: 实现八字排盘、紫微斗数、合盘匹配等传统命理算法的现代化重构
    link: /blog/bazi-algorithm
    linkText: 算法详解
  
  - icon: 📊
    title: 数据架构
    details: Supabase + MongoDB 混合数据库方案，支持实时数据同步与分析
    link: /architecture/database
    linkText: 数据库设计
  
  - icon: ⚡
    title: 高性能
    details: Vercel Edge 部署 + Cloudflare CDN，全球访问延迟 < 100ms
    link: /tech-stack/
    linkText: 技术栈
  
  - icon: 🔒
    title: 安全可靠
    details: 多层安全防护、数据加密、用户隐私保护，符合 GDPR 规范
    link: /architecture/
    linkText: 安全设计
  
  - icon: 🌍
    title: 多语言支持
    details: 中英文双语界面，AI 自动翻译解读结果，覆盖全球用户
    link: /tech-stack/
    linkText: 国际化方案
  
  - icon: 📱
    title: 响应式设计
    details: 完美适配桌面端、移动端、平板，提供一致的用户体验
    link: /architecture/frontend
    linkText: 前端设计
  
  - icon: 🔌
    title: API 开放
    details: RESTful API 设计，支持第三方集成与扩展开发
    link: /api/
    linkText: API 文档
---

## 🚀 快速开始

天机爻（Tianjiyao）是一个将**东方命理学**与**现代人工智能**深度融合的在线占卜平台。本文档旨在详细介绍项目的技术架构、实现细节与最佳实践。

### 核心功能

- **八字排盘分析**：基于出生时辰自动生成命盘，AI 智能解读命格与运势
- **紫微斗数解析**：融合传统派系与现代算法的命盘生成与分析
- **AI 合盘匹配**：情感、事业、人际关系三维合盘与匹配度评分
- **心理学融合**：AI 使用心理学语言模型提供情绪安抚与行动建议

### 技术栈概览

| 分类 | 技术 |
|------|------|
| 前端 | Next.js 14, React 18, Tailwind CSS, TypeScript |
| 后端 | Node.js, Azure Functions, Serverless |
| AI 引擎 | OpenAI GPT-4, Azure Cognitive Services |
| 数据存储 | Supabase (PostgreSQL), MongoDB |
| 部署 | Vercel, Cloudflare Pages |
| 监控 | Azure Application Insights, Sentry |

### 文档导航

::: info 📖 推荐阅读路径
1. [架构总览](/architecture/) - 了解系统整体设计
2. [前端架构](/architecture/frontend) - 了解用户界面实现
3. [AI 引擎](/architecture/ai-engine) - 了解 AI 解读原理
4. [API 文档](/api/) - 了解接口设计与使用
5. [技术博客](/blog/) - 阅读深度技术文章
:::

### 相关链接

- 🌐 [天机爻主站](https://www.tianjiyao.com) - 在线使用平台
- 📚 [用户文档](https://wiki.tianjiyao.com) - 使用教程与 FAQ
- 🐙 [GitHub 仓库](https://github.com/wych1987/tianjiyao-ai-fortune) - 源代码与开源协作
- 🐦 [Twitter / X](https://x.com/tianjiyao_ai) - 最新动态

### 贡献指南

我们欢迎社区贡献！如果你有任何建议或发现问题，请：

1. 提交 [GitHub Issue](https://github.com/wych1987/tianjiyao-ai-fortune/issues)
2. 发起 Pull Request
3. 联系我们：contact@tianjiyao.com

### 开源协议

本项目基于 [MIT License](https://opensource.org/licenses/MIT) 开源。

---

<div style="text-align: center; margin-top: 40px; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px;">
  <h3 style="color: white; margin-bottom: 10px;">✨ 立即体验天机爻 AI 占卜</h3>
  <p style="color: white; margin-bottom: 20px;">免费在线使用，无需注册，即刻获得专属命理分析</p>
  <a href="https://www.tianjiyao.com" target="_blank" style="display: inline-block; padding: 12px 30px; background: white; color: #667eea; border-radius: 8px; text-decoration: none; font-weight: bold;">
    开始占卜 →
  </a>
</div>
