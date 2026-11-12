---
title: Skills（AI 工作流）
description: 9 个开箱即用的 AI 整理技能，跨 NAS 品牌通用。
---

## 什么是 Skill

Skill 是给 AI 助手看的「说明书 + 脚本」。装了它，AI 才知道：

- 这个任务该按什么顺序做
- 哪些操作是只读的、哪些要你确认
- 输出应该长什么样

`zspace-cli` 提供 **1 个底座 + 9 个整理技能**。

## 底座：`zspace-nas`

极空间**零配置底座** —— 读桌面客户端登录态直连 API，无需挂载、无需密码。

```bash
zs ls /sata11/my/data
zs find "关键词"
zs up ./a.mkv /sata11/x
```

## 9 个整理技能

其余 9 个是**跨 NAS 通用**的 —— 扫描脚本纯 stdlib 零依赖，跑在**挂载路径**上
（SMB / NFS），极空间 / 群晖 / 威联通 / 绿联等都能用。

| 技能 | 触发示例 | 做什么 |
|---|---|---|
| **photo-organizer** | 「照片按拍摄日期归档」「截图太多了」 | 找出散图、截图、微信图、相机原图、连拍组、重复副本、垃圾文件；按 `YYYY/YYYY-MM` 出归档计划 |
| **file-sorter** | 「这目录什么都往里丢」「照片视频文档混在一起」 | 按类型分类归档 |
| **download-cleaner** | 「下载目录清理一下」 | 残留包（`.bt.td` / `!qB`）、安装包、压缩包分类处理 |
| **dedup-finder** | 「找出重复文件」 | 内容级去重（不是按文件名） |
| **music-organizer** | 「整理音乐库」「文件名带水印」 | 补曲目号、去水印、按专辑归档 |
| **work-organizer** | 「工作目录太乱」「全是最终版final」 | 按项目 / 日期归档 |
| **backup-auditor** | 「帮我审一下备份」 | 备份完整性审计 |
| **nas-report** | 「空间都被什么占了」 | 存储报告（入口技能，会推荐下一步） |
| **portfolio-organizer** | 「整理项目文件夹」 | 代码项目归档 |

## 装法

```bash
# 全装
zs skill ~/your-project/skills/

# 只装两个
zs skill ~/your-project/skills/ --only photo-organizer,file-sorter

# 先看有哪些
zs skill --list
```

## 非极空间用户

9 个整理技能**不调极空间 API、不需要客户端**，只要路径能访问就行：

```bash
# 1. 挂载 NAS 共享（macOS Finder → 前往 → 连接服务器）
open smb://<NAS_IP>/照片
#    挂载后即 /Volumes/照片

# 2. 装 skill
pip install zspace-cli
zs skill ~/your-project/skills/

# 3. 对 AI 说
#    「帮我整理 /Volumes/照片 里的照片，按日期归档」
```

## 三条安全约定

写在每个 SKILL.md 里，AI 必须遵守：

1. **扫描只读** —— 第一步永远是 `scan`，不写任何东西
2. **确认才动手** —— 出 `old → new` 计划，用户确认后 Agent 才执行 `mv` / `mkdir`
3. **删除先隔离** —— 建议删除的先进隔离目录，不直接 `rm`

## 想加一个技能？

见仓库里的 [skills/README.md](https://github.com/skyzhao1223/zspace-cli/blob/main/skills/README.md)。
