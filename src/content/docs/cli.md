---
title: 命令参考
description: zspace-cli 的全部命令与参数。
---

## 连接与状态

| 命令 | 说明 |
|---|---|
| `zs check` | 检查桌面客户端登录态 |
| `zs login` | 手动触发登录（一般不需要） |
| `zs version` | 版本信息 |

## 文件操作

| 命令 | 说明 | 示例 |
|---|---|---|
| `zs ls [PATH]` | 列目录 | `zs ls /sata11/my/data` |
| `zs tree [PATH] -d N` | 树形浏览（深度 N） | `zs tree /sata11 -d 2` |
| `zs find <KEYWORD>` | 全文搜索（跨目录） | `zs find "权力的游戏"` |
| `zs up <本地> <远端>` | 上传（分片，支持大文件） | `zs up ./a.mkv /sata11/x` |
| `zs down <远端> [本地]` | 下载 | `zs down /sata11/x/a.mkv ./` |
| `zs mv <源> <目标>` | 移动 / 重命名 | `zs mv '/a/*.mkv' /b/` |
| `zs cp <源> <目标>` | 复制 | `zs cp ./a.mkv /sata11/x` |
| `zs rm <路径>` | 删除（进回收站） | `zs rm /sata11/x/a.mkv` |
| `zs mkdir <路径>` | 建目录 | `zs mkdir /sata11/x/new` |

### 通配符

`zs mv` / `zs cp` / `zs rm` / `zs down` 的源路径支持 `*` `?`：

```bash
zs mv '/sata11/my/data/下载/*.mkv' /sata11/my/data/剧集/
```

> 通配符**必须加引号**，否则会被 shell 先展开。

### 上传校验

```bash
zs up ./电影.mkv /sata11/x --verify
```

上传完成后回读文件并比较 MD5。**默认关闭**，因为会增加一次完整下载传输。

### 大文件分片

超过阈值的文件自动走分片上传（1.4GB 实测稳定），无需手动指定。

## 技能管理

| 命令 | 说明 |
|---|---|
| `zs skill --list` | 列出全部技能 |
| `zs skill <目标目录>` | 全装到目标目录 |
| `zs skill <目标目录> --only a,b` | 只装指定技能 |

## Python SDK

```python
from zspace_cli import ZSpaceClient

with ZSpaceClient() as zs:
    for f in zs.ls("/sata11/my/data"):
        print(f"{'📁' if f.is_dir else '📄'} {f.name}")
```

## MCP

装了 `zspace-cli[mcp]` 之后，在 MCP 客户端里加：

```json
{
  "mcpServers": {
    "zspace": {
      "command": "zs-mcp"
    }
  }
}
```

发布名：`io.github.skyzhao1223/zspace-cli`
