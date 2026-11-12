import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

/**
 * 部署到子路径时设 DOCS_BASE（例如 GitHub Pages 项目站：/zspace-docs）。
 * 本地开发保持 '/'。
 */
const base = process.env.DOCS_BASE ?? '/';


export default defineConfig({
  site: process.env.DOCS_SITE ?? 'https://skyzhao1223.github.io',
  base,
  integrations: [
    starlight({
      title: 'zspace-cli',
      description:
        '用命令行或 AI Agent 管理极空间 NAS —— 不填密码、不开 SSH、不配 DDNS。',
      social: [
        {
          icon: 'github',
          href: 'https://github.com/skyzhao1223/zspace-cli',
          label: 'GitHub',
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/skyzhao1223/zspace-cli/edit/main/',
      },
      sidebar: [
        {
          label: '开始',
          items: [
            { label: '快速开始', slug: 'quickstart' },
            { label: '新手指南（零代码）', slug: 'beginner-guide' },
          ],
        },
        {
          label: '使用',
          items: [
            { label: '命令参考', slug: 'cli' },
            { label: 'Skills（AI 工作流）', slug: 'skills' },
            { label: '集成指南', slug: 'integrations' },
          ],
        },
        {
          label: '商业',
          items: [
            { label: '定价', slug: 'pricing' },
            { label: '许可与商业授权', slug: 'license' },
          ],
        },
      ],
      head: [
        { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
        {
          tag: 'meta',
          attrs: { property: 'og:title', content: 'zspace-cli — 极空间 NAS 的命令行与 AI 接口' },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:description',
            content: '不填密码、不开 SSH、不配 DDNS。9 个开箱即用的 AI 整理技能。',
          },
        },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        {
          tag: 'meta',
          attrs: {
            name: 'keywords',
            content:
              '极空间,zspace,NAS,CLI,MCP,AI Agent,照片整理,家谱,命令行',
          },
        },
      ],
    }),
  ],
});
