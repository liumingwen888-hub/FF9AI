# FF9AI

FF9AI 官网项目，面向线上游戏与东南亚企业场景，展示私有化定制 AI 自动化流程能力。

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建产物输出到 `dist/`。

## 发布新文章

### 博客文章

在 `src/content/blog/` 下新增一个 Markdown 文件，例如：

```txt
src/content/blog/your-article-slug.md
```

文件开头填写：

```yaml
---
title: "文章标题"
description: "搜索结果里显示的摘要，建议 120-160 字以内"
date: 2026-06-17
updated: 2026-06-17
category: "线上游戏运营"
tags:
  - AI 自动化
  - 风险复核
draft: false
---
```

正文直接用 Markdown 编写。写完后运行：

```bash
npm run build
```

### 知识库文章

在 `src/content/knowledge/` 下新增 Markdown 文件，并填写：

```yaml
---
title: "知识库标题"
description: "这篇内容解决什么问题"
order: 4
category: "AI 自动化基础"
updated: 2026-06-17
---
```

`order` 控制知识库列表排序。
