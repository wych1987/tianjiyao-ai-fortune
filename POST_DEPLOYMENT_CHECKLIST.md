# 📋 部署后验证清单

> 更新时间：2025-11-06

## 🚀 第一步：验证部署（5分钟内）

### 1. 检查 GitHub Actions 状态
- [ ] 访问：https://github.com/wych1987/tianjiyao-ai-fortune/actions
- [ ] 确认最新的 workflow 运行成功（绿色✓）
- [ ] 检查部署时间（应该在最近几分钟内）

### 2. 验证网站可访问
- [ ] 访问主页：https://docs.tianjiyao.com
- [ ] 检查所有导航链接是否正常
- [ ] 测试搜索功能

### 3. 验证新增页面
- [ ] https://docs.tianjiyao.com/architecture/backend
- [ ] https://docs.tianjiyao.com/architecture/database
- [ ] https://docs.tianjiyao.com/tech-stack/
- [ ] https://docs.tianjiyao.com/api/ziwei
- [ ] https://docs.tianjiyao.com/api/compatibility
- [ ] https://docs.tianjiyao.com/blog/bazi-algorithm
- [ ] https://docs.tianjiyao.com/blog/seo-strategy

### 4. 检查 SEO 元素
- [ ] 查看页面源代码，确认 meta 标签存在
- [ ] 访问：https://docs.tianjiyao.com/sitemap.xml
- [ ] 访问：https://docs.tianjiyao.com/robots.txt

---

## 📊 第二步：提交到搜索引擎（今天完成）

### 1. Google Search Console
- [ ] 访问：https://search.google.com/search-console
- [ ] 添加资源：docs.tianjiyao.com
- [ ] 验证所有权（推荐使用 DNS 验证）
  - 添加 TXT 记录：`google-site-verification=xxxxxxx`
- [ ] 提交 Sitemap：https://docs.tianjiyao.com/sitemap.xml
- [ ] 请求 Google 索引主要页面（URL 检查工具）

### 2. 百度站长平台
- [ ] 访问：https://ziyuan.baidu.com
- [ ] 添加站点：docs.tianjiyao.com
- [ ] 验证网站（文件验证或 HTML 标签）
- [ ] 提交 Sitemap：https://docs.tianjiyao.com/sitemap.xml
- [ ] 使用"抓取诊断"检查网站

### 3. 必应站长工具
- [ ] 访问：https://www.bing.com/webmasters
- [ ] 添加站点（可从 Google Search Console 导入）
- [ ] 提交 Sitemap

### 4. 其他搜索引擎（可选）
- [ ] 360搜索站长平台：http://zhanzhang.so.com
- [ ] 搜狗站长平台：http://zhanzhang.sogou.com

---

## 📝 第三步：内容发布（本周完成）

### 1. 技术社区推广
**掘金（juejin.cn）：**
- [ ] 发布文章：《八字算法详解：从天干地支到命盘生成》
  - 正文：复制 `/docs/blog/bazi-algorithm.md` 内容
  - 标签：算法、JavaScript、传统文化
  - 文末附：完整文档链接 https://docs.tianjiyao.com/blog/bazi-algorithm

- [ ] 发布文章：《Next.js + Azure Functions 打造 AI 算命平台》
  - 基于 `/docs/architecture/` 内容整合
  - 标签：Next.js、Azure、AI
  - 文末附：架构文档 https://docs.tianjiyao.com/architecture/

**思否（SegmentFault）：**
- [ ] 同步发布上述两篇文章

**CSDN：**
- [ ] 同步发布（如果不介意广告）

### 2. 知乎推广
- [ ] 回答问题：《八字算命准吗？》
  - 提及技术实现：https://docs.tianjiyao.com
  
- [ ] 回答问题：《如何用 AI 做算命产品？》
  - 分享架构设计和 API 文档

### 3. GitHub 曝光
- [ ] 在 README.md 中添加技术文档链接
- [ ] 添加 Topics 标签：`fortune-telling` `ai` `nextjs` `vitepress`
- [ ] 提交到 Awesome 列表（搜索相关主题）

---

## 🔗 第四步：内链和外链建设（本月完成）

### 1. 主站集成
**如果你有 www.tianjiyao.com：**
- [ ] 在主站 Footer 添加"技术文档"链接
- [ ] 在"关于我们"页面介绍技术栈，链接到 docs
- [ ] 在博客文章底部添加"技术实现详解"链接

**如果有 wiki.tianjiyao.com：**
- [ ] 在 Wiki 首页添加"开发者文档"入口
- [ ] 在技术相关教程中引用 API 文档

### 2. 社交媒体
- [ ] 微信公众号发布文章（带阅读原文链接）
- [ ] 小红书分享技术实现（图文）
- [ ] B站/抖音制作视频（代码讲解）

### 3. 开发者社区
- [ ] V2EX 发帖：《开源分享：AI 算命平台技术架构》
- [ ] Ruby China / Laravel China 等相关社区（如果适用）
- [ ] 参与 GitHub Discussions 讨论相关主题

---

## 📈 第五步：监控和优化（持续）

### 1. Google Analytics 配置
**在 `/docs/.vitepress/config.js` 中添加：**

```javascript
export default {
  head: [
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX' }
    ],
    [
      'script',
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-XXXXXXXXXX');"
    ]
  ]
}
```

- [ ] 替换 `G-XXXXXXXXXX` 为你的 GA4 ID
- [ ] 提交更新到 GitHub
- [ ] 验证数据收集

### 2. 百度统计
- [ ] 注册百度统计账号
- [ ] 添加统计代码到 config.js
- [ ] 验证数据

### 3. 每周检查（设置日历提醒）
- [ ] **每周一：** 查看 Google Search Console
  - 展现次数、点击次数、平均排名
  - 找出高展现低点击的页面，优化 title/description
  
- [ ] **每周三：** 查看 Google Analytics
  - 访问量、用户来源、热门页面
  - 跳出率、平均停留时间
  
- [ ] **每周五：** 内容更新
  - 至少新增 1 篇博客文章
  - 优化 1-2 篇现有文档

---

## 🎨 第六步：网站优化（可选，下周进行）

### 1. 视觉优化
- [ ] 设计 Logo（放到 `/docs/public/logo.svg`）
- [ ] 设计 OG 图片（1200x630px）
- [ ] 添加 Favicon（多尺寸）

### 2. 性能优化
- [ ] 使用 Lighthouse 测试性能
- [ ] 优化图片（WebP 格式、懒加载）
- [ ] 启用 PWA（可选）

### 3. 用户体验
- [ ] 添加"快速开始"引导页
- [ ] 添加代码复制按钮
- [ ] 添加"返回顶部"按钮
- [ ] 添加评论系统（Giscus/Utterances）

---

## 📊 第七步：数据追踪（30天后）

### 目标指标
| 指标 | 第1周目标 | 第1月目标 | 第3月目标 |
|------|-----------|-----------|-----------|
| Google 索引页面 | 5+ | 12+ | 12 |
| 日均UV | 10+ | 100+ | 500+ |
| 平均停留时长 | 1分钟 | 2分钟 | 3分钟 |
| 跳出率 | <70% | <60% | <50% |
| 自然搜索流量占比 | 20% | 40% | 60% |

### 数据分析
- [ ] **7天后：** 首次数据回顾会议
  - 哪些页面被索引？
  - 哪些关键词开始有排名？
  - 需要调整什么？

- [ ] **30天后：** 月度复盘
  - ROI 计算
  - 流量来源分析
  - 内容效果评估
  - 制定下月计划

---

## 🚀 快速命令参考

### 本地开发
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev

# 构建
npm run docs:build

# 预览构建结果
npm run docs:preview
```

### Git 操作
```bash
# 拉取最新代码
git pull origin main

# 创建新分支
git checkout -b feature/new-article

# 提交更新
git add .
git commit -m "docs: 添加新文章"
git push origin main
```

### 紧急回滚
```bash
# 查看提交历史
git log --oneline

# 回滚到上一个版本
git revert HEAD

# 强制推送（谨慎使用）
git push origin main --force
```

---

## 📞 问题排查

### 网站无法访问
1. 检查 GitHub Actions 是否成功
2. 检查 CNAME 文件是否存在
3. 检查域名 DNS 解析
4. 等待 10 分钟（CDN 缓存）

### 页面 404
1. 检查文件路径是否正确
2. 检查 `.vitepress/config.js` 路由配置
3. 清除浏览器缓存
4. 使用无痕模式测试

### 搜索引擎未收录
1. 确认已提交 sitemap（7天后再检查）
2. 检查 robots.txt 是否允许抓取
3. 使用 Google Search Console "URL 检查"
4. 增加外链和内链

---

## ✨ 成功标志

当你完成以下目标时，项目即算成功上线：

- ✅ 网站稳定访问，无 404 错误
- ✅ Google 索引了至少 5 个核心页面
- ✅ 百度索引了至少 3 个核心页面
- ✅ 日均 UV 超过 50（30天内）
- ✅ 至少发布了 3 篇外部文章
- ✅ 获得了 5+ 个有效外链
- ✅ 平均停留时长 > 2 分钟

---

## 📚 学习资源

- **SEO：** [Google SEO 入门指南](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- **VitePress：** [官方文档](https://vitepress.dev/)
- **技术写作：** [Google 技术写作课程](https://developers.google.com/tech-writing)
- **性能优化：** [Web.dev](https://web.dev/)

---

**记住：SEO 是一场马拉松，不是短跑。保持耐心，持续优化！** 🚀
