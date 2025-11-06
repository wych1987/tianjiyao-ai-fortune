# 部署指南

## 🚀 部署到 GitHub Pages

### 步骤 1: 配置 GitHub Pages

1. 进入你的 GitHub 仓库：`https://github.com/wych1987/tianjiyao-ai-fortune`
2. 点击 **Settings** > **Pages**
3. **Source** 选择：**GitHub Actions**

### 步骤 2: 推送代码

```bash
git add .
git commit -m "feat: 初始化 VitePress 文档站"
git push origin main
```

### 步骤 3: 自动部署

GitHub Actions 会自动：
1. 检测到 `main` 分支的推送
2. 安装依赖
3. 构建文档站点
4. 部署到 GitHub Pages

**部署 URL**: `https://docs.tianjiyao.com`（自定义域名已在 CNAME 配置）

### 步骤 4: DNS 配置（如果尚未配置）

在你的域名 DNS 管理处添加以下记录：

| 类型 | 名称 | 值 |
|------|------|-----|
| CNAME | docs | wych1987.github.io |

或者使用 A 记录（推荐）：

| 类型 | 名称 | 值 |
|------|------|-----|
| A | docs | 185.199.108.153 |
| A | docs | 185.199.109.153 |
| A | docs | 185.199.110.153 |
| A | docs | 185.199.111.153 |

---

## 🧪 本地预览

### 开发模式（热重载）

```bash
npm run docs:dev
```

访问: `http://localhost:5173`

### 生产预览

```bash
npm run docs:build
npm run docs:preview
```

访问: `http://localhost:4173`

---

## 📝 更新文档

### 1. 编辑现有文档

直接编辑 `docs/` 目录下的 `.md` 文件：

```bash
# 编辑架构文档
vim docs/architecture/frontend.md

# 提交更改
git add docs/architecture/frontend.md
git commit -m "docs: 更新前端架构文档"
git push
```

### 2. 添加新文档

```bash
# 创建新文档
touch docs/architecture/backend.md

# 在 .vitepress/config.js 中添加侧边栏配置
# 然后推送
git add .
git commit -m "docs: 添加后端架构文档"
git push
```

---

## 🔍 SEO 优化清单

### ✅ 已完成

- [x] Sitemap 自动生成
- [x] robots.txt 配置
- [x] Meta 标签优化
- [x] Open Graph 标签
- [x] Twitter Card
- [x] 结构化数据（JSON-LD）
- [x] Canonical URL
- [x] 自定义域名

### 📋 下一步

- [ ] 提交 Sitemap 到 Google Search Console
- [ ] 提交 Sitemap 到 Bing Webmaster
- [ ] 添加 Google Analytics
- [ ] 设置 Google Tag Manager
- [ ] 创建更多长尾关键词页面
- [ ] 内链优化（确保所有页面互相链接）
- [ ] 添加 Logo 和 OG 图片

---

## 🔗 内链策略

### 主站 → Docs 站

在 `www.tianjiyao.com` 添加：

```html
<!-- 页脚 -->
<footer>
  <a href="https://docs.tianjiyao.com">技术文档</a>
  <a href="https://wiki.tianjiyao.com">用户指南</a>
</footer>

<!-- 博客文章 -->
<article>
  <p>了解更多技术细节，请访问 
    <a href="https://docs.tianjiyao.com/architecture/ai-engine">AI 引擎设计文档</a>
  </p>
</article>
```

### Docs 站 → 主站

已在配置文件中添加：

- 导航栏"相关链接"
- 页脚链接
- 首页 CTA 按钮
- 每篇文章底部推广

### Wiki 站 ↔ Docs 站

相互引用：
- Wiki 中的技术问题链接到 Docs
- Docs 中的使用指南链接到 Wiki

---

## 📊 监控与分析

### Google Search Console

1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 添加资源：`https://docs.tianjiyao.com`
3. 验证所有权（使用 DNS TXT 记录）
4. 提交 Sitemap：`https://docs.tianjiyao.com/sitemap.xml`

### 监控指标

- 索引页面数量
- 点击次数
- 展示次数
- 平均排名
- Core Web Vitals

---

## 🐛 故障排查

### 部署失败

检查 GitHub Actions 日志：
```
仓库 > Actions > 最新工作流 > 查看日志
```

常见问题：
- Node.js 版本不匹配 → 检查 `.github/workflows/deploy.yml`
- 构建错误 → 本地运行 `npm run docs:build` 排查
- 权限问题 → 检查仓库 Settings > Actions > General > Workflow permissions

### 自定义域名不生效

1. 检查 `CNAME` 文件是否存在
2. 检查 DNS 记录是否正确
3. 等待 DNS 传播（最多 48 小时）
4. 在 GitHub Settings > Pages 中重新设置自定义域名

### 页面 404

1. 检查文件路径是否正确
2. 检查 `.vitepress/config.js` 中的 `base` 配置
3. 清除浏览器缓存
4. 重新部署

---

## 💡 最佳实践

### 文档编写

- 使用清晰的标题层级（H1 > H2 > H3）
- 每页至少 800 字
- 添加代码示例
- 使用图片和图表
- 内部链接 3-5 个/页

### Git 提交

```bash
# 使用语义化提交信息
git commit -m "docs: 添加 API 文档"
git commit -m "feat: 新增博客功能"
git commit -m "fix: 修复链接错误"
git commit -m "style: 优化页面样式"
```

### 性能优化

- 图片使用 WebP 格式
- 压缩图片（< 200KB）
- 懒加载非首屏内容
- 使用 CDN 加速静态资源

---

## 📞 需要帮助？

- 📧 邮箱: tech-support@tianjiyao.com
- 🐙 GitHub Issues: [提交问题](https://github.com/wych1987/tianjiyao-ai-fortune/issues)
- 💬 Discussions: [参与讨论](https://github.com/wych1987/tianjiyao-ai-fortune/discussions)
