# zspace-docs

`zspace-cli` 的官方文档站与落地页 —— [Astro](https://astro.build) + [Starlight](https://starlight.astro.build)。

## 本地开发

```bash
npm install
npm run dev        # http://localhost:4321
```

## 构建

```bash
npm run build      # 产物在 dist/
npm run preview    # 预览构建结果
```

## 部署

### 方式 A：子域名（推荐）

部署到 `zspace.zhaosky.cn` —— 根路径，链接不用改：

```bash
npm run build
# 把 dist/ 传到服务器，nginx 指向 dist 即可
```

nginx 片段：

```nginx
server {
  server_name zspace.zhaosky.cn;
  root /var/www/zspace-docs/dist;
  index index.html;
  error_page 404 /404.html;
}
```

### 方式 B：GitHub Pages（当前采用）

**线上地址：<https://skyzhao1223.github.io/zspace-docs/>**

一条命令部署：

```bash
./deploy.sh
```

原理：构建 → 把 `dist/` 推到 `gh-pages` 分支 → Pages 从该分支发布。

> ⚠️ **为什么不用 GitHub Actions**：本账号 Actions 被计费锁定
> （`The job was not started because your account is locked due to a billing issue`）。
> 分支发布不消耗 Actions 分钟，所以这条路是通的。
> 计费恢复后，可以换回 Actions（模板见 git 历史）。

**子路径部署的关键**：`scripts/prefix-links.mjs` 会在构建后把正文里的
`/quickstart/` 补成 `/zspace-docs/quickstart/`（Astro 7 默认 Markdown 处理器
不做这件事，不补就是 404）。

## 结构

```
src/
├─ content.config.ts        Starlight 集合定义
├─ content/docs/
│  ├─ index.mdx             首页（splash hero）
│  ├─ quickstart.md         快速开始
│  ├─ beginner-guide.md     新手指南（零代码）
│  ├─ cli.md                命令参考
│  ├─ skills.md             9 个 AI 技能
│  ├─ integrations.md       集成指南
│  ├─ pricing.md            定价（三档）
│  └─ license.md            AGPL + 商业授权
└─ styles/                  （可选）自定义样式
```

## 侧边栏

改 `astro.config.mjs` 里的 `sidebar` 数组。

## 主题色

Starlight 默认紫蓝色。改主题：

```js
starlight({
  customCss: ['./src/styles/theme.css'],
})
```

```css
/* src/styles/theme.css */
:root {
  --sl-color-accent-low: #1e3a5f;
  --sl-color-accent: #3b82f6;
  --sl-color-accent-high: #93c5fd;
}
```

## 内容从哪来

| 页面 | 来源 |
|---|---|
| 首页 / quickstart | 从 `zspace-cli/README.md` 提炼 |
| beginner-guide | 迁移自 `zspace-cli/docs/beginner-guide.zh.md` |
| integrations | 迁移自 `zspace-cli/docs/integrations.md` |
| skills | 迁移自 `zspace-cli/skills/README.md` |
| cli | 从 `zspace-cli` 的命令实现整理 |
| pricing / license | 新增（商业模式说明） |
