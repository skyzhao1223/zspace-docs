#!/usr/bin/env node
/**
 * 构建后处理：给 markdown 正文里的根路径链接补上 base 前缀。
 *
 * 为什么需要：Astro 7 默认的 Markdown 处理器不会把 `/quickstart/` 改写成
 * `/zspace-docs/quickstart/`，而 GitHub Pages 项目站部署在子路径下，不补就是 404。
 * Starlight 自己的导航链接已经带前缀，这里只处理「还没带前缀的根路径链接」。
 *
 * 用法：
 *   DOCS_BASE=/zspace-docs node scripts/prefix-links.mjs
 *   （build 脚本里已接好，base 为 '/' 时自动跳过）
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const rawBase = process.env.DOCS_BASE ?? '/';
const base = rawBase === '/' ? '' : rawBase.replace(/\/$/, '');
const dist = path.resolve(process.cwd(), 'dist');

if (!base) {
  console.log('[prefix-links] base 为 "/"，跳过');
  process.exit(0);
}

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const files = await walk(dist);
let touched = 0;
let rewritten = 0;

for (const file of files) {
  const html = await fs.readFile(file, 'utf8');
  // 只改 href="/xxx"，且不以 base 开头、也不是 // 协议相对
  const next = html.replace(/href="(\/(?!\/)[^"]*)"/g, (match, href) => {
    if (href.startsWith(`${base}/`) || href === base) return match;
    rewritten += 1;
    return `href="${base}${href}"`;
  });
  if (next !== html) {
    await fs.writeFile(file, next, 'utf8');
    touched += 1;
  }
}

console.log(`[prefix-links] base=${base} · ${touched} 个文件 · 补全 ${rewritten} 个链接`);
