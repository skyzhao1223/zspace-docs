---
title: 集成指南
description: 和 Jellyfin / Emby / MoviePilot / 自动化管线怎么配合。
---

## 定位先说清

`zspace-cli` **不刮削元数据、不做媒体库管理**。它只做一件事：
**把文件放在正确的名字和位置上**。

刮削交给 Jellyfin / Emby / MoviePilot —— 它们做得比你好。

## Jellyfin / Emby

**顺序：先 zspace-cli 改名归位，再让媒体库扫描。**

```bash
# 1. 看库目录
zs ls /sata11/my/data/影视

# 2. 一条命令改名 + 归位
zs up ./Movie.2024.1080p.mkv /sata11/my/data/影视 --name "Movie (2024).mkv"

# 3. 批量：把下载区所有 mkv 挪进剧集目录
zs mv '/sata11/my/data/下载/*.mkv' /sata11/my/data/剧集/Series/Season\ 01
```

之后触发 Jellyfin/Emby 的库扫描（或等它的文件监听）。

## MoviePilot / nas-tools / AutoFilm

这些刮削器会监听下载目录、自己改名。**问题是它们经常被下载残留卡住**
（`.bt.td`、`!qB`、part 文件）。

用 `download-cleaner` 技能先做一遍分诊：

```bash
# 列出下载残留
zs find ".bt.td"

# 让 AI 出分诊计划
# 「用 download-cleaner 扫一下 /sata11/my/data/下载」
```

处理干净之后，刮削器就不会卡了。

## 定时任务

配合 `cron` / `launchd`：

```bash
# 每天凌晨 3 点把下载区整理到归档区
0 3 * * * zs mv '/sata11/my/data/下载/*.mkv' /sata11/my/data/归档/$(date +\%Y-\%m)/
```

## AI 助手

装了 `zspace-cli[mcp]` 之后，Claude Code / Cursor / Trae 都能直接操作 NAS：

```json
{
  "mcpServers": {
    "zspace": { "command": "zs-mcp" }
  }
}
```

然后你就可以说：

> 「帮我看一下 `/sata11/my/data/影视` 里哪些文件命名不符合 Jellyfin 规范，
> 给我一份改名计划，先别动手。」

## 和其他项目的关系

| 项目 | 关系 |
|---|---|
| **media-naming** | 影视库命名规范（zspace-cli 只执行，不定规范） |
| **file-sorter** | 任意类型混合目录按类型分类（skill 内） |
| **dedup-finder** | 内容级重复文件（skill 内） |

## 不适用

- ❌ 影视库命名规范本身 → 走 `media-naming`
- ❌ 任意类型混合目录分类 → 走 `file-sorter`
- ❌ 内容级去重 → 走 `dedup-finder`
- ❌ NAS 连接与通用文件操作 → 走 `zspace-nas`
