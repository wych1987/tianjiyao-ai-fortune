import { defineConfig } from 'vitepress'

const DOCS_SITE_URL = 'https://docs.tianjiyao.com'
const SITE_DESCRIPTION = '天机爻技术文档，系统整理 AI 命理平台的架构设计、算法实现、API 接入方式与工程实践。'

function buildCanonicalUrl(relativePath) {
  if (!relativePath || relativePath === 'index.md') {
    return DOCS_SITE_URL
  }

  if (relativePath.endsWith('/index.md')) {
    return `${DOCS_SITE_URL}/${relativePath.replace(/\/index\.md$/, '')}/`
  }

  return `${DOCS_SITE_URL}/${relativePath.replace(/\.md$/, '')}`
}

function buildPageSchema({ relativePath, title, description, canonicalUrl }) {
  const isBlogArticle =
    relativePath.startsWith('blog/') && !relativePath.endsWith('/index.md')

  const schema = {
    '@context': 'https://schema.org',
    '@type': isBlogArticle ? 'TechArticle' : 'WebPage',
    name: title,
    description,
    url: canonicalUrl,
    inLanguage: 'zh-CN',
    isPartOf: {
      '@type': 'WebSite',
      name: '天机爻技术文档',
      url: DOCS_SITE_URL,
    },
  }

  if (isBlogArticle) {
    schema.headline = title
    schema.author = {
      '@type': 'Organization',
      'name': 'Tianjiyao Team',
      'url': 'https://www.tianjiyao.com',
    }
    schema.publisher = {
      '@type': 'Organization',
      name: 'Tianjiyao',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.tianjiyao.com/assets/logo.png',
      },
    }
  }

  return schema
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 基础配置
  title: '天机爻技术文档',
  description: SITE_DESCRIPTION,
  lang: 'zh-CN',
  base: '/',
  
  // 清理 URL
  cleanUrls: true,
  
  // 排除文件
  srcExclude: ['**/README.md', '**/README.en.md'],
  
  // 最后更新时间
  lastUpdated: true,
  
  // 开启死链检查（生产环境）
  ignoreDeadLinks: false,
  
  // Head 配置 - SEO 优化
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    
    ['meta', { name: 'og:locale', content: 'zh_CN' }],
    ['meta', { name: 'og:site_name', content: '天机爻技术文档' }],
    ['meta', { name: 'og:image', content: 'https://docs.tianjiyao.com/og-image.png' }],
    
    // 关键词
    ['meta', { name: 'keywords', content: 'AI占卜,八字分析,紫微斗数,命理AI,技术架构,开源项目,Next.js,OpenAI,Azure,天机爻' }],
    
    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@tianjiyao_ai' }],
    
    // 站点级结构化数据
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': '天机爻技术文档',
      'description': SITE_DESCRIPTION,
      'url': DOCS_SITE_URL,
      'inLanguage': 'zh-CN',
      'publisher': {
        '@type': 'Organization',
        'name': 'Tianjiyao',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://www.tianjiyao.com/assets/logo.png'
        }
      },
      'potentialAction': {
        '@type': 'SearchAction',
        'target': `${DOCS_SITE_URL}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    })]
  ],

  transformHead({ pageData, title, description }) {
    const canonicalUrl = buildCanonicalUrl(pageData.relativePath)
    const pageDescription =
      pageData.frontmatter?.description || pageData.description || description

    return [
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:type', content: pageData.relativePath.startsWith('blog/') && !pageData.relativePath.endsWith('/index.md') ? 'article' : 'website' }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: pageDescription }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: pageDescription }],
      ['script', { type: 'application/ld+json' }, JSON.stringify(
        buildPageSchema({
          relativePath: pageData.relativePath,
          title,
          description: pageDescription,
          canonicalUrl,
        })
      )]
    ]
  },
  
  // Sitemap 生成
  sitemap: {
    hostname: DOCS_SITE_URL,
    transformItems(items) {
      return items.map(item => ({
        ...item,
        changefreq: 'weekly',
        priority: item.url === '/' ? 1.0 : 0.8
      }))
    }
  },
  
  // 主题配置
  themeConfig: {
    // Logo 和标题
    logo: '/logo.png',
    siteTitle: '天机爻技术文档',
    
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '架构设计', link: '/architecture/' },
      { text: '技术栈', link: '/tech-stack/' },
      { text: 'API 文档', link: '/api/' },
      { text: '博客', link: '/blog/' },
      { 
        text: '相关链接',
        items: [
          { text: '主站', link: 'https://www.tianjiyao.com' },
          { text: 'Wiki 文档', link: 'https://wiki.tianjiyao.com' },
          { text: 'GitHub', link: 'https://github.com/wych1987/tianjiyao-ai-fortune' }
        ]
      }
    ],
    
    // 侧边栏
    sidebar: {
      '/architecture/': [
        {
          text: '架构设计',
          items: [
            { text: '总览', link: '/architecture/' },
            { text: '前端架构', link: '/architecture/frontend' },
            { text: '后端架构', link: '/architecture/backend' },
            { text: 'AI 引擎', link: '/architecture/ai-engine' },
            { text: '数据库设计', link: '/architecture/database' }
          ]
        }
      ],
      '/tech-stack/': [
        {
          text: '技术栈',
          items: [
            { text: '概览', link: '/tech-stack/' },
            { text: 'Next.js 应用', link: '/tech-stack/nextjs' },
            { text: 'Azure Functions', link: '/tech-stack/azure-functions' },
            { text: 'OpenAI 集成', link: '/tech-stack/openai' },
            { text: 'Supabase 数据库', link: '/tech-stack/supabase' },
            { text: '部署方案', link: '/tech-stack/deployment' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API 文档',
          items: [
            { text: 'API 总览', link: '/api/' },
            { text: '八字排盘 API', link: '/api/bazi' },
            { text: '紫微斗数 API', link: '/api/ziwei' },
            { text: 'AI 合盘 API', link: '/api/compatibility' }
          ]
        }
      ],
      '/blog/': [
        {
          text: '技术博客',
          items: [
            { text: '博客首页', link: '/blog/' },
            { text: 'AI 占卜技术实现', link: '/blog/ai-fortune-telling' },
            { text: '八字算法详解', link: '/blog/bazi-algorithm' },
            { text: 'SEO 优化策略', link: '/blog/seo-strategy' }
          ]
        }
      ]
    },
    
    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wych1987/tianjiyao-ai-fortune' },
      { icon: 'twitter', link: 'https://x.com/tianjiyao_ai' }
    ],
    
    // 页脚
    footer: {
      message: '基于 MIT 许可发布 | 技术文档由 VitePress 驱动',
      copyright: `Copyright © 2025-${new Date().getFullYear()} Tianjiyao Team | <a href="https://www.tianjiyao.com" target="_blank">访问主站</a> | <a href="https://wiki.tianjiyao.com" target="_blank">用户文档</a>`
    },
    
    // 编辑链接
    editLink: {
      pattern: 'https://github.com/wych1987/tianjiyao-ai-fortune/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    
    // 最后更新时间文本
    lastUpdatedText: '最后更新',
    
    // 文档页脚
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    
    // 大纲配置
    outline: {
      level: [2, 3],
      label: '页面导航'
    },
    
    // 搜索
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换'
            }
          }
        }
      }
    }
  }
})
