# 天机爻技术文档

这是天机爻 AI 命理平台的技术文档仓库，由 [VitePress](https://vitepress.dev/) 构建。

## 📚 在线访问

- **文档站点**: [https://docs.tianjiyao.com](https://docs.tianjiyao.com)
- **主站**: [https://www.tianjiyao.com](https://www.tianjiyao.com)
- **用户文档**: [https://wiki.tianjiyao.com](https://wiki.tianjiyao.com)

## 🚀 本地开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run docs:dev
```

访问 `http://localhost:5173` 查看文档。

### 构建生产版本

```bash
npm run docs:build
```

### 预览构建结果

```bash
npm run docs:preview
```

## 📖 文档结构

```
docs/
├── .vitepress/          # VitePress 配置
│   └── config.js        # 站点配置
├── index.md             # 首页
├── architecture/        # 架构文档
│   ├── index.md        # 架构总览
│   ├── frontend.md     # 前端架构
│   ├── backend.md      # 后端架构
│   ├── ai-engine.md    # AI 引擎
│   └── database.md     # 数据库设计
├── tech-stack/          # 技术栈详解
│   └── ...
├── api/                 # API 文档
│   ├── index.md        # API 总览
│   ├── bazi.md         # 八字 API
│   └── ...
└── blog/                # 技术博客
    ├── index.md        # 博客首页
    └── ...
```

## 🤝 贡献指南

我们欢迎社区贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

### 文档规范

- 使用 Markdown 格式
- 中文使用中文标点，英文使用英文标点
- 代码块注明语言类型
- 添加适当的示例代码

## 📝 许可证

本项目基于 [MIT License](LICENSE) 开源。

## 🔗 相关链接

- [主站](https://www.tianjiyao.com)
- [用户文档](https://wiki.tianjiyao.com)
- [GitHub](https://github.com/wych1987/tianjiyao-ai-fortune)
- [Twitter / X](https://x.com/tianjiyao_ai)

## 📧 联系我们

- 邮箱: contact@tianjiyao.com
- 技术支持: tech-support@tianjiyao.com

---

© 2025 Tianjiyao Team. All Rights Reserved.
