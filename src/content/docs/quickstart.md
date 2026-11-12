---
title: 快速开始
description: 5 分钟装好 zspace-cli 并跑通第一条命令。
---

## 前提

1. **macOS**（目前只支持 macOS）
2. **极空间桌面客户端已安装并登录**
3. **Python ≥ 3.9**

> 其他品牌 NAS（群晖 / 威联通 / 绿联）也可以用它的 9 个整理技能，
> 走 SMB 挂载即可 —— 见[集成指南](/integrations/)。

## 安装

```bash
pip install zspace-cli          # 底座
pip install "zspace-cli[mcp]"   # 可选：MCP 支持（给 AI 助手用）
```

## 验证

```bash
zs check
```

**✅ 成功长这样：**

```
✓ 已连接极空间客户端
  用户: your@email.com
  设备: ZSpace-Z4-Pro
```

**❌ 失败：**

| 报错 | 原因 | 解法 |
|---|---|---|
| `未找到登录态` | 桌面客户端没开 | 打开极空间客户端并登录 |
| `token 过期` | 登录失效 | 在客户端里重新登录一次 |

## 第一条命令

```bash
zs ls /
```

看到你的存储池列表（`/sata11`、`/sata12`…）就说明通了。

## 常用命令

```bash
zs ls /sata11/my/data/影视                  # 列目录
zs tree /sata11/my/data -d 3               # 树形浏览
zs find "权力的游戏"                         # 全文搜索
zs up ./电影.mkv /sata11/my/data/影视        # 上传
zs up ./电影.mkv /sata11/my/data/影视 --verify   # 上传 + MD5 回读校验
zs down /sata11/my/data/影视/电影.mkv ./     # 下载
zs mv '/sata11/my/data/下载/*.mkv' /sata11/my/data/剧集/   # 支持通配符
```

## 装 AI 技能

```bash
zs skill --list                      # 看有哪些技能
zs skill ~/your-project/skills/      # 全装
zs skill ~/your-project/skills/ --only photo-organizer,file-sorter   # 只装两个
```

装完在 AI 助手里说：

> 「帮我把 `/sata11/my/data/照片` 按拍摄日期整理好，先给我看计划。」

## 下一步

- [新手指南](/beginner-guide/) —— 零代码基础，一步步配好 AI 助手
- [Skills 说明](/skills/) —— 9 个技能各自干什么
- [集成指南](/integrations/) —— 和 Jellyfin / MoviePilot 配合
