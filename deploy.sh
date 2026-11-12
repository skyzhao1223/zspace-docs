#!/usr/bin/env bash
# 部署到 GitHub Pages（gh-pages 分支，不依赖 GitHub Actions）
#
# 为什么不用 Actions：账号计费锁定，Actions 无法启动。
# Pages 可以直接从分支发布，这条路不消耗 Actions 分钟。
set -euo pipefail

REPO="${REPO:-https://github.com/skyzhao1223/zspace-docs.git}"
BASE="${DOCS_BASE:-/zspace-docs}"

echo "==> 构建 (base=$BASE)"
rm -rf dist
DOCS_BASE="$BASE" DOCS_SITE="https://skyzhao1223.github.io" npm run build

echo "==> 准备 gh-pages 分支"
TMP=$(mktemp -d)
cp -R dist/. "$TMP/"
cd "$TMP"
git init -q
git checkout -q -b gh-pages
git add -A
git -c user.name="skyzhao1223" -c user.email="skyzhao1223@users.noreply.github.com" \
  commit -q -m "deploy: $(date -u +'%Y-%m-%dT%H:%M:%SZ')"
git remote add origin "$REPO"
git push -q -f origin gh-pages
cd - >/dev/null
rm -rf "$TMP"

echo "==> 完成：https://skyzhao1223.github.io/zspace-docs/"
