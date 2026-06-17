# Astro Content Site Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert the current FF9AI single-page React/Vite site into an Astro content-driven website with SEO-friendly solution pages, blog, and knowledge base while preserving the current visual identity.

**Architecture:** Astro will become the top-level site framework and routing layer. Existing React sections will be reused as client islands where animation/interactivity is needed, while static SEO pages and articles will be rendered from Astro pages and Markdown/MDX content collections.

**Tech Stack:** Astro, React, TypeScript, Tailwind CSS, MDX/Markdown content collections, `@astrojs/react`, `@astrojs/sitemap`, existing GSAP/Lenis animations where needed.

---

## Migration Principles

1. Preserve the current homepage visual quality and motion style.
2. Prefer static HTML for SEO pages and articles.
3. Use React only for interactive/animated islands.
4. Keep article publishing simple: add a Markdown file, fill frontmatter, run build.
5. Keep URLs clean, stable, and keyword-oriented.
6. Build and inspect every public page before final delivery.
7. Commit a rollback point before large migration work and another after validation.

---

## Target URL Structure

### Brand and Conversion Pages

- `/` — homepage, current visual homepage migrated into Astro.
- `/solutions/` — solution overview page.
- `/solutions/risk-review/` — online gaming risk review automation.
- `/solutions/settlement-reconciliation/` — settlement reconciliation automation.
- `/solutions/operation-signals/` — user behavior and operation signal automation.
- `/cases/` — case overview page.
- `/faq/` — standalone FAQ page.
- `/contact/` — contact and Telegram CTA page.

### Content Pages

- `/blog/` — blog listing page.
- `/blog/[slug]/` — individual blog article.
- `/knowledge/` — knowledge base listing page.
- `/knowledge/[slug]/` — individual knowledge base article.

---

## Target Directory Structure

```txt
src/
  pages/
    index.astro
    solutions/
      index.astro
      risk-review.astro
      settlement-reconciliation.astro
      operation-signals.astro
    blog/
      index.astro
      [slug].astro
    knowledge/
      index.astro
      [slug].astro
    cases/
      index.astro
    faq.astro
    contact.astro
  content/
    config.ts
    blog/
      online-game-risk-review-automation.md
      settlement-reconciliation-for-online-games.md
      private-ai-automation-for-operations.md
    knowledge/
      what-is-private-ai-automation.md
      how-to-evaluate-ai-process.md
      ai-automation-data-security.md
  components/
    layout/
      BaseLayout.astro
      Header.astro
      Footer.astro
      SEO.astro
      ArticleLayout.astro
      ContentCard.astro
    islands/
      Homepage.tsx
      FullscreenMenu.tsx
      Hero.tsx
      ClientCases.tsx
      ProcessGrid.tsx
      SystemMetrics.tsx
      FAQ.tsx
  data/
    site.ts
    navigation.ts
    solutions.ts
    faqs.ts
```

---

## Task 1: Save Current State and Prepare Astro Dependencies

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `astro.config.mjs`
- Modify: `tsconfig.json`

**Steps:**
1. Confirm current git state is clean with `git status --short`.
2. Commit a safety checkpoint if any uncommitted files exist.
3. Install Astro dependencies:
   - `astro`
   - `@astrojs/react`
   - `@astrojs/sitemap`
   - `@astrojs/mdx`
4. Replace scripts:
   - `dev`: `astro dev --host 127.0.0.1 --port 8080`
   - `build`: `astro check && astro build`
   - `preview`: `astro preview --host 127.0.0.1 --port 8080`
   - `lint`: keep ESLint for `src/**/*.{ts,tsx}`
5. Create `astro.config.mjs` with React, MDX, and sitemap integrations.
6. Set the site URL placeholder in config, e.g. `https://ff9.ai` or temporary GitHub Pages URL until final domain is known.

**Validation:**
- Run `npm run build`.
- Expected: Astro build completes and creates `dist/`.

---

## Task 2: Move Current Homepage Into an Astro Island

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/components/islands/Homepage.tsx`
- Move/Modify: current `src/pages/Home.tsx`
- Move/Modify: current `src/components/Header.tsx`
- Move/Modify: current `src/components/FullscreenMenu.tsx`
- Move/Modify: current `src/sections/*.tsx`
- Modify: `src/index.css`
- Remove or ignore: `src/main.tsx`, `src/App.tsx`, `vite.config.ts` after Astro is stable

**Steps:**
1. Create `Homepage.tsx` that renders the existing homepage sections.
2. Import `Homepage` in `index.astro` using `client:load` or `client:visible`.
3. Keep animation-heavy sections as React islands to avoid visual regression.
4. Move global CSS import into Astro layout or `index.astro`.
5. Keep assets in `public/` unchanged.
6. Verify homepage still shows:
   - hero video
   - header/menu
   - process grid
   - metrics
   - case cards
   - FAQ
   - footer

**Validation:**
- Open `http://127.0.0.1:8080/`.
- Check menu open/close.
- Check video loads.
- Check no black screen after closing menu.
- Check browser console for runtime errors.

---

## Task 3: Create Shared Layout and SEO Components

**Files:**
- Create: `src/components/layout/BaseLayout.astro`
- Create: `src/components/layout/SEO.astro`
- Create: `src/components/layout/Header.astro`
- Create: `src/components/layout/Footer.astro`
- Create: `src/data/site.ts`
- Create: `src/data/navigation.ts`

**Steps:**
1. Define site metadata in `src/data/site.ts`:
   - name: `FF9 AI`
   - description
   - default title
   - default OG image
   - contact URL
2. Create `SEO.astro` props:
   - `title`
   - `description`
   - `canonical`
   - `ogImage`
   - `type`
3. Generate:
   - `<title>`
   - meta description
   - canonical link
   - Open Graph tags
   - Twitter card tags
4. Create `BaseLayout.astro` that wraps every static page.
5. Keep visual style black/white/minimal to match current homepage.

**Validation:**
- Inspect generated HTML for each static page.
- Confirm every page has unique title and meta description.

---

## Task 4: Add Content Collections

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/blog/*.md`
- Create: `src/content/knowledge/*.md`

**Blog Frontmatter Schema:**

```yaml
---
title: "文章标题"
description: "搜索结果里显示的 120-160 字摘要"
date: 2026-06-17
updated: 2026-06-17
category: "线上游戏运营"
tags:
  - AI 自动化
  - 风险复核
  - 结算对账
draft: false
---
```

**Knowledge Frontmatter Schema:**

```yaml
---
title: "知识库标题"
description: "这篇内容解决什么问题"
order: 1
category: "AI 自动化基础"
updated: 2026-06-17
---
```

**Seed Blog Articles:**
1. `online-game-risk-review-automation.md`
2. `settlement-reconciliation-for-online-games.md`
3. `private-ai-automation-for-operations.md`

**Seed Knowledge Articles:**
1. `what-is-private-ai-automation.md`
2. `how-to-evaluate-ai-process.md`
3. `ai-automation-data-security.md`

**Validation:**
- Run `npm run build`.
- Confirm Astro generates all article routes.

---

## Task 5: Build Blog and Knowledge Pages

**Files:**
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/[slug].astro`
- Create: `src/pages/knowledge/index.astro`
- Create: `src/pages/knowledge/[slug].astro`
- Create: `src/components/layout/ArticleLayout.astro`
- Create: `src/components/layout/ContentCard.astro`

**Steps:**
1. Blog index lists published posts sorted by `date` descending.
2. Knowledge index lists entries sorted by `order`.
3. Article pages render Markdown content with:
   - title
   - description
   - date/updated date
   - tags/categories
   - body content
   - CTA block at bottom
4. Exclude `draft: true` blog posts from production listings.
5. Add internal links:
   - blog to solution pages
   - knowledge to contact page
   - solution pages to related articles

**Validation:**
- Visit `/blog/`.
- Visit every seeded blog article.
- Visit `/knowledge/`.
- Visit every seeded knowledge article.
- Confirm pages are readable on desktop and mobile width.

---

## Task 6: Create SEO Solution Pages

**Files:**
- Create: `src/data/solutions.ts`
- Create: `src/pages/solutions/index.astro`
- Create: `src/pages/solutions/risk-review.astro`
- Create: `src/pages/solutions/settlement-reconciliation.astro`
- Create: `src/pages/solutions/operation-signals.astro`

**Page Template Sections:**
1. Hero:
   - clear H1
   - one-line value proposition
   - CTA
2. Problem:
   - manual pain points
   - operational risk
3. What FF9 AI does:
   - input data
   - AI processing
   - human review
4. Output:
   - exception list
   - evidence chain
   - report
5. Deployment:
   - private deployment
   - sample data evaluation
6. FAQ:
   - 3-5 page-specific questions
7. CTA:
   - ask user to send one process for evaluation

**Validation:**
- Each solution page has exactly one H1.
- Each page has unique title and meta description.
- Each page links back to `/solutions/`, `/knowledge/`, and `/contact/`.

---

## Task 7: Split Cases, FAQ, and Contact Pages

**Files:**
- Create: `src/pages/cases/index.astro`
- Create: `src/pages/faq.astro`
- Create: `src/pages/contact.astro`
- Create: `src/data/faqs.ts`

**Steps:**
1. Reuse current case text but expand each case into a static content block.
2. Move current FAQ data into `src/data/faqs.ts`.
3. Render FAQ as static HTML with FAQ schema JSON-LD.
4. Contact page includes:
   - Telegram CTA
   - what to prepare
   - privacy note
   - sample workflow checklist

**Validation:**
- Visit `/cases/`, `/faq/`, `/contact/`.
- Confirm links from homepage menu point to valid pages or anchors.

---

## Task 8: Add Technical SEO Files

**Files:**
- Create: `src/pages/robots.txt.ts`
- Create: `src/pages/rss.xml.ts`
- Modify: `astro.config.mjs`
- Modify: `src/components/layout/SEO.astro`

**Steps:**
1. Configure `@astrojs/sitemap`.
2. Generate `robots.txt` with sitemap URL.
3. Generate RSS feed from blog posts.
4. Add JSON-LD:
   - Organization on homepage
   - WebSite on homepage
   - Article on blog posts
   - FAQPage on FAQ page
   - BreadcrumbList on solution/article pages

**Validation:**
- Build and confirm:
   - `/sitemap-index.xml` or `/sitemap-0.xml`
   - `/robots.txt`
   - `/rss.xml`
- Inspect generated JSON-LD for valid JSON.

---

## Task 9: Final Verification

**Commands:**
- `npm run lint`
- `npm run build`
- `npm run preview`

**Browser Checks:**
1. `/`
2. `/solutions/`
3. `/solutions/risk-review/`
4. `/solutions/settlement-reconciliation/`
5. `/solutions/operation-signals/`
6. `/blog/`
7. every seeded blog article
8. `/knowledge/`
9. every seeded knowledge article
10. `/cases/`
11. `/faq/`
12. `/contact/`
13. `/robots.txt`
14. sitemap URL
15. `/rss.xml`

**Automated Checks:**
- Confirm no route returns 404.
- Confirm every page has a non-empty `<title>`.
- Confirm every page has a meta description.
- Confirm no sensitive terms remain:
  - `东南亚博彩`
  - `博彩`
  - `投注`
  - `赛果`
  - `派奖`
  - `玩家`
  - `盘口`
  - `casino`
  - `gambling`
  - `bet`
  - `wager`

**Final Git Steps:**
1. Commit migration.
2. Push to GitHub `main`.
3. Report:
   - commit hash
   - validation commands
   - tested URLs
   - article publishing instructions

---

## How to Publish New Articles After Migration

### Blog Article

1. Create a file:

```txt
src/content/blog/your-article-slug.md
```

2. Add frontmatter:

```yaml
---
title: "线上游戏后台哪些流程适合先做 AI 自动化？"
description: "本文说明线上游戏后台中适合优先自动化的流程，包括风险复核、结算对账、运营信号整理和客服质检。"
date: 2026-06-17
updated: 2026-06-17
category: "线上游戏运营"
tags:
  - AI 自动化
  - 线上游戏
  - 私有化部署
draft: false
---
```

3. Write the article in Markdown:

```md
## 为什么先从高频流程开始

正文内容……

## 哪些流程适合

- 风险复核
- 结算对账
- 运营信号整理
```

4. Run:

```bash
npm run build
```

5. Commit and push:

```bash
git add src/content/blog/your-article-slug.md
git commit -m "content: add article about AI automation workflows"
git push
```

### Knowledge Base Article

1. Create:

```txt
src/content/knowledge/your-knowledge-slug.md
```

2. Add frontmatter:

```yaml
---
title: "什么是私有化 AI 自动化？"
description: "解释私有化 AI 自动化的基本概念、适合场景、数据安全边界和上线方式。"
order: 4
category: "AI 自动化基础"
updated: 2026-06-17
---
```

3. Write content and run build.

### Draft Workflow

Use `draft: true` for unfinished blog posts. Draft posts will not appear in listing or production routes until changed to `draft: false`.

---

## Recommended First Batch of Content

1. `线上游戏后台哪些流程适合先做 AI 自动化？`
2. `风险复核为什么不能完全交给黑箱 AI？`
3. `结算对账自动化如何减少人工逐笔核对？`
4. `私有化部署 AI 自动化要准备哪些数据？`
5. `如何用脱敏样本评估一条流程能不能自动化？`
6. `多语言、多币种运营团队如何统一后台复核流程？`
