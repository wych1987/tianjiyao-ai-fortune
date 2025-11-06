<div align="center">

# 天机爻 · Tianjiyao

**🔮 AI 驱动的智能命理分析平台**

[![GitHub Stars](https://img.shields.io/github/stars/wych1987/tianjiyao-ai-fortune?style=social)](https://github.com/wych1987/tianjiyao-ai-fortune)
[![GitHub Forks](https://img.shields.io/github/forks/wych1987/tianjiyao-ai-fortune?style=social)](https://github.com/wych1987/tianjiyao-ai-fortune/fork)
[![Documentation](https://img.shields.io/badge/docs-online-blue)](https://docs.tianjiyao.com)
[![License](https://img.shields.io/badge/license-MIT-green)](https://github.com/wych1987/tianjiyao-ai-fortune/blob/main/LICENSE)

[🌐 官网](https://www.tianjiyao.com) · [📚 技术文档](https://docs.tianjiyao.com) · [� 用户指南](https://wiki.tianjiyao.com) · [🐛 问题反馈](https://github.com/wych1987/tianjiyao-ai-fortune/issues)

[中文版本 🇨🇳](./README.md) | [English Version 🌍](./README.en.md)

</div>

---

## 📖 目录 | Table of Contents

- [项目简介](#-项目简介--overview)
- [核心功能](#-核心功能--key-features)
- [技术架构](#️-技术架构--tech-architecture)
- [快速开始](#-快速开始--quick-start)
- [文档资源](#-文档资源--documentation)
- [项目结构](#-项目结构--project-structure)
- [开发指南](#-开发指南--development-guide)
- [部署说明](#-部署说明--deployment)
- [贡献指南](#-贡献指南--contributing)
- [许可证](#-许可证--license)

---

## 🌟 项目简介 | Overview

**天机爻（Tianjiyao）** 是一个融合了 **传统命理学与现代人工智能** 的创新平台，通过 GPT-4 等先进 AI 技术，为用户提供专业、个性化的命理分析服务。

### ✨ 项目亮点

- 🎯 **技术驱动**：基于 Next.js 14、Azure Functions 和 OpenAI GPT-4 构建
- 🔮 **专业准确**：精确的八字、紫微斗数算法实现
- 🤖 **AI 增强**：智能化的命理解读和个性化建议
- 📊 **数据可视化**：直观的命盘图表和运势展示
- 🌐 **多端适配**：完美支持桌面端和移动端
- ⚡ **高性能**：SSR/SSG 优化，响应时间 < 200ms

> **Tianjiyao** is an AI-powered platform that combines traditional Chinese metaphysics with modern artificial intelligence.  
> It provides professional Bazi (Four Pillars), Ziwei Doushu (Purple Star Astrology), and relationship compatibility readings —  
> all interpreted by advanced GPT-4 models trained on traditional metaphysics knowledge.

---

## 💫 核心功能 | Key Features

### 🔮 八字排盘与分析
- **精准计算**：基于天文算法的节气计算
- **完整命盘**：年柱、月柱、日柱、时柱自动生成
- **深度解析**：十神、格局、大运、流年分析
- **AI 解读**：GPT-4 驱动的个性化命理解读

### 🌟 紫微斗数
- **多派系支持**：三合派、飞星派、四化派
- **星曜解析**：14 主星 + 108 辅星完整数据
- **宫位分析**：十二宫位详细解读
- **运势预测**：大限、流年、流月运势

### 💕 合婚配对
- **多维度匹配**：性格、价值观、生活方式
- **智能评分**：AI 算法计算匹配度
- **关系建议**：个性化的相处建议
- **兼容性分析**：事业、感情、友谊三类关系

### 🤖 AI 智能增强
- **自然语言解读**：易懂的命理分析
- **流式输出**：实时生成，体验流畅
- **上下文理解**：支持多轮对话
- **个性化建议**：基于命盘的行动指南

---

## ⚙️ 技术架构 | Tech Architecture

### 核心技术栈

| 分类 | 技术选型 | 说明 |
|------|---------|------|
| **前端框架** | Next.js 14 + React 18 | App Router, SSR/SSG |
| **样式方案** | Tailwind CSS 3.x | 原子化 CSS，响应式设计 |
| **后端服务** | Azure Functions v4 | 无服务器架构，按需计费 |
| **AI 引擎** | OpenAI GPT-4 Turbo | 智能命理解读 |
| **数据库** | Supabase (PostgreSQL) | 用户数据、订单管理 |
| **文档存储** | MongoDB Atlas 7.x | 命盘记录、历史数据 |
| **缓存层** | Redis 7.x | 高频查询缓存 |
| **部署平台** | Vercel + GitHub Pages | CDN 加速，自动部署 |

### 架构特点

- ✅ **微服务架构**：前后端分离，服务独立部署
- ✅ **无服务器计算**：Azure Functions 按需扩展
- ✅ **智能缓存**：多层缓存策略，响应时间 < 200ms
- ✅ **AI 驱动**：GPT-4 + 知识图谱增强
- ✅ **高可用性**：99.9% SLA，自动故障转移

### 📊 系统架构图

```
┌─────────────┐
│   用户端    │
│ (Browser)   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│        Next.js 14 Frontend          │
│  (SSR/SSG + App Router)             │
└──────┬──────────────────────────┬───┘
       │                          │
       ▼                          ▼
┌──────────────┐          ┌──────────────┐
│ Azure        │          │ OpenAI       │
│ Functions    │◄─────────┤ GPT-4 API    │
│ (API Layer)  │          │              │
└──────┬───────┘          └──────────────┘
       │
       ├──────┬──────┬──────┐
       ▼      ▼      ▼      ▼
  ┌────────┐ ┌────┐ ┌────┐ ┌────────┐
  │Supabase│ │Mongo│ │Redis│ │Pinecone│
  │(PostgreSQL)│ │DB│ │Cache│ │Vector DB│
  └────────┘ └────┘ └────┘ └────────┘
```

🔗 **详细架构文档**：[docs.tianjiyao.com/architecture](https://docs.tianjiyao.com/architecture/)

---

## 🚀 快速开始 | Quick Start

### 前置要求

- Node.js 18+ 
- npm 或 yarn
- Git

### 本地开发

```bash
# 1. 克隆仓库
git clone https://github.com/wych1987/tianjiyao-ai-fortune.git
cd tianjiyao-ai-fortune

# 2. 安装依赖
npm install

# 3. 配置环境变量（复制并修改）
cp .env.example .env.local

# 4. 启动开发服务器
npm run dev

# 5. 访问 http://localhost:3000
```

### 环境变量配置

```env
# OpenAI API
OPENAI_API_KEY=your_openai_api_key
OPENAI_API_BASE=https://api.openai.com/v1

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Redis
REDIS_URL=your_redis_url
```

🔗 **完整开发指南**：[docs.tianjiyao.com/getting-started](https://docs.tianjiyao.com)

---

## 📚 文档资源 | Documentation

我们提供了完整的三站文档生态系统：

### 🏠 主站（产品体验）
- **地址**：[www.tianjiyao.com](https://www.tianjiyao.com)
- **内容**：产品介绍、在线体验、用户案例

### 📖 用户文档（使用指南）
- **地址**：[wiki.tianjiyao.com](https://wiki.tianjiyao.com)
- **内容**：
  - [新手入门指南](https://wiki.tianjiyao.com/getting-started)
  - [八字排盘教程](https://wiki.tianjiyao.com/bazi-guide)
  - [紫微斗数教程](https://wiki.tianjiyao.com/ziwei-guide)
  - [常见问题 FAQ](https://wiki.tianjiyao.com/faq)

### 💻 技术文档（开发者资源）
- **地址**：[docs.tianjiyao.com](https://docs.tianjiyao.com)
- **内容**：
  - [系统架构设计](https://docs.tianjiyao.com/architecture/)
  - [前端架构](https://docs.tianjiyao.com/architecture/frontend)
  - [后端架构](https://docs.tianjiyao.com/architecture/backend)
  - [AI 引擎实现](https://docs.tianjiyao.com/architecture/ai-engine)
  - [数据库设计](https://docs.tianjiyao.com/architecture/database)
  - [API 文档](https://docs.tianjiyao.com/api/)
  - [技术博客](https://docs.tianjiyao.com/blog/)

### 📝 技术博客文章

- [AI 占卜技术实现深度解析](https://docs.tianjiyao.com/blog/ai-fortune-telling)
- [八字算法详解：从天干地支到命盘生成](https://docs.tianjiyao.com/blog/bazi-algorithm)
- [SEO 优化策略：三站联动打造流量生态](https://docs.tianjiyao.com/blog/seo-strategy)

---

## 📁 项目结构 | Project Structure

```
tianjiyao-ai-fortune/
├── docs/                      # 技术文档站（VitePress）
│   ├── .vitepress/           # VitePress 配置
│   │   └── config.js         # 站点配置、导航、SEO
│   ├── architecture/         # 架构文档
│   │   ├── index.md          # 系统架构概览
│   │   ├── frontend.md       # 前端架构
│   │   ├── backend.md        # 后端架构
│   │   ├── ai-engine.md      # AI 引擎设计
│   │   └── database.md       # 数据库设计
│   ├── api/                  # API 文档
│   │   ├── index.md          # API 概览
│   │   ├── bazi.md           # 八字 API
│   │   ├── ziwei.md          # 紫微 API
│   │   └── compatibility.md  # 合婚 API
│   ├── tech-stack/           # 技术栈文档
│   │   └── index.md          # 技术选型说明
│   ├── blog/                 # 技术博客
│   │   ├── index.md          # 博客首页
│   │   ├── ai-fortune-telling.md
│   │   ├── bazi-algorithm.md
│   │   └── seo-strategy.md
│   └── index.md              # 文档首页
├── .github/                  # GitHub 配置
│   ├── workflows/            # GitHub Actions
│   │   └── deploy.yml        # 自动部署工作流
│   └── metadata.json         # 项目元数据
├── public/                   # 静态资源
│   ├── logo.svg              # Logo
│   ├── og-image.jpg          # Open Graph 图片
│   └── favicon.ico           # 网站图标
├── CNAME                     # 自定义域名配置
├── robots.txt                # 搜索引擎爬虫规则
├── sitemap.xml               # 站点地图
├── package.json              # 项目依赖
├── README.md                 # 项目说明（本文件）
├── README.en.md              # 英文说明
├── LICENSE                   # 开源许可证
├── BLOG_CTA_TEMPLATE.md      # 博客 CTA 模板
└── POST_DEPLOYMENT_CHECKLIST.md  # 部署后清单
```

---

## 🛠️ 开发指南 | Development Guide

### 本地开发文档站

```bash
# 启动文档开发服务器
npm run docs:dev

# 构建文档
npm run docs:build

# 预览构建结果
npm run docs:preview
```

### 代码规范

- **TypeScript**：使用严格模式
- **ESLint**：遵循 Airbnb 规范
- **Prettier**：自动格式化代码
- **Commit**：遵循 Conventional Commits

### 提交信息规范

```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
perf: 性能优化
test: 测试相关
chore: 构建/工具链更新
```

### 分支策略

- `main`：生产环境分支
- `develop`：开发分支
- `feature/*`：功能开发分支
- `hotfix/*`：紧急修复分支

---

## 🚢 部署说明 | Deployment

### 文档站自动部署

文档站使用 **GitHub Pages + GitHub Actions** 实现自动部署：

1. 推送代码到 `main` 分支
2. GitHub Actions 自动触发构建
3. 构建完成后部署到 GitHub Pages
4. 通过 `docs.tianjiyao.com` 访问

### 部署流程

```mermaid
graph LR
    A[本地开发] --> B[git push]
    B --> C[GitHub Actions]
    C --> D[VitePress Build]
    D --> E[Deploy to GitHub Pages]
    E --> F[docs.tianjiyao.com]
```

### CI/CD 配置

查看 [.github/workflows/deploy.yml](./.github/workflows/deploy.yml) 了解详细配置。

---

## 🤝 贡献指南 | Contributing

我们欢迎所有形式的贡献！

### 如何贡献

1. **Fork 本仓库**
2. **创建功能分支** (`git checkout -b feature/AmazingFeature`)
3. **提交更改** (`git commit -m 'feat: Add some AmazingFeature'`)
4. **推送到分支** (`git push origin feature/AmazingFeature`)
5. **提交 Pull Request**

### 贡献类型

- 🐛 **Bug 修复**：发现并修复问题
- ✨ **新功能**：添加新的功能特性
- 📝 **文档改进**：完善文档和教程
- 🎨 **UI/UX 优化**：改进用户界面
- ⚡ **性能优化**：提升系统性能
- 🌐 **国际化**：添加多语言支持

### 行为准则

请遵循我们的 [行为准则](./CODE_OF_CONDUCT.md)，营造友好的社区环境。

---

## 📊 项目状态 | Project Status

- ✅ **核心功能**：八字排盘、紫微斗数、合婚配对
- ✅ **AI 集成**：GPT-4 智能解读
- ✅ **技术文档**：完整的架构和 API 文档
- ✅ **SEO 优化**：三站联动策略
- 🚧 **移动应用**：iOS/Android App（规划中）
- 🚧 **API 开放**：第三方开发者 API（规划中）

---

## 📈 性能指标 | Performance

- ⚡ **首屏加载**：< 1.5s
- 🚀 **API 响应**：< 200ms
- 📱 **移动适配**：100% 响应式
- 🎯 **Lighthouse**：性能评分 90+
- ♿ **可访问性**：WCAG 2.1 AA 标准

---

## 🔒 安全性 | Security

- ✅ HTTPS 全站加密
- ✅ JWT 身份认证
- ✅ API 限流保护
- ✅ SQL 注入防护
- ✅ XSS 攻击防护
- ✅ CSRF 令牌验证

发现安全问题？请发送邮件至 security@tianjiyao.com

---

## 📞 联系我们 | Contact

- 📧 **邮箱**：contact@tianjiyao.com
- 💬 **讨论区**：[GitHub Discussions](https://github.com/wych1987/tianjiyao-ai-fortune/discussions)
- 🐛 **问题反馈**：[GitHub Issues](https://github.com/wych1987/tianjiyao-ai-fortune/issues)
- 🐦 **Twitter**：[@tianjiyao_ai](https://x.com/tianjiyao_ai)

---

## 📄 许可证 | License

本项目采用 [MIT License](https://github.com/wych1987/tianjiyao-ai-fortune/blob/main/LICENSE) 开源协议。

```
MIT License

Copyright (c) 2025 Tianjiyao Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 🙏 致谢 | Acknowledgments

感谢以下开源项目和服务：

- [Next.js](https://nextjs.org/) - React 框架
- [VitePress](https://vitepress.dev/) - 文档站生成器
- [OpenAI](https://openai.com/) - AI 模型服务
- [Vercel](https://vercel.com/) - 部署平台
- [Supabase](https://supabase.com/) - 后端服务
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=wych1987/tianjiyao-ai-fortune&type=Date)](https://star-history.com/#wych1987/tianjiyao-ai-fortune&Date)

---

<div align="center">

**如果这个项目对你有帮助，请给我们一个 ⭐ Star！**

Made with ❤️ by [Tianjiyao Team](https://www.tianjiyao.com)

[⬆ 回到顶部](#天机爻--tianjiyao)

</div>

---

## 🔍 SEO 关键词与说明 | SEO Keywords

> **关键词 (Chinese Keywords)**  
> AI占卜、在线命理、八字分析、紫微斗数、AI合盘、命理AI、AI算命、AI情感匹配、命盘生成器、在线占卜平台  

> **Keywords (English)**  
> AI fortune telling, online divination, Bazi analysis, Ziwei astrology, Chinese metaphysics, AI relationship compatibility, destiny reading, AI-powered horoscope, Tianjiyao

---

## 🧭 结构化数据 | Schema JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Tianjiyao",
  "alternateName": "天机爻",
  "url": "https://www.tianjiyao.com",
  "applicationCategory": "Fortune-telling, AI, Metaphysics",
  "operatingSystem": "Web",
  "description": "Tianjiyao is an AI-powered online fortune-telling platform combining Chinese metaphysics and modern NLP technology. It offers Bazi analysis, Ziwei Doushu astrology, and AI relationship compatibility readings.",
  "author": {
    "@type": "Organization",
    "name": "Tianjiyao Team"
  },
  "inLanguage": ["zh-CN", "en"],
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

[metadata.json](./.github/metadata.json) · AI Search Knowledge Card


### 💡 品牌愿景 | Vision

我们希望让“命理”不再是神秘的符号，而是人人可理解、可连接的智慧系统。
天机爻以 AI 技术为桥梁，让每个人都能在数据与命运之间，找到属于自己的“天机”。

Our vision is to make Chinese metaphysics accessible and meaningful to everyone —
bridging ancient wisdom with modern AI, helping people understand themselves and their life path more clearly.


开源介绍仓库：[https://github.com/yourname/tianjiyao-ai-fortune](https://github.com/yourname/tianjiyao-ai-fortune)
