---
title: '第一篇随笔：从手写与文档到 Markdown'
publishDate: 2026-11-07 12:00:00
description: '把 tetraacc.me 收拾出来，作为存放随笔、代码切片和常听音乐的个人空间。'
tags:
  - 随笔
  - 建站
language: '中文'
---

这是 `tetraacc.me`（`tetraacc.github.io`）上的第一篇测试随笔。以后写新文章，只需要在 `src/content/blog/` 目录下新建一个 `.md` 文件，复制最上面的这几行头部信息（Frontmatter），改一下 `title` 和 `publishDate` 就可以直接动笔。

## 常用写法速查

平时写随笔几乎只需要用到下面这几种格式：

1. **分段**：段落之间空一行即可；
2. **强调**：用两个星号包裹 `**加粗文字**`，或者用一个星号包裹 *斜体文字*；
3. **引用一段话或歌词**：在行首加一个 `>` 号：

> 好的工具应当像空气和纸张，只有在你需要落笔的时候才显现存在感。

## 贴代码片段

想顺手存一段脚本或配置时，用三个反引号加上语言名字（比如 `python` 或 `ssh-config`）：

```python title="example.py"
def greet(site: str = "tetraacc.me") -> str:
    return f"Hello from {site}!"
```

需要更多排版组件（比如折叠框、提示块、图片排版）时，随时可以参考同目录下的《Markdown 语法支持》那篇自带指南。
