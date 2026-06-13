# FF9 AI 官网 Mac 迁移说明

## 当前状态

- 当前版本是 A 方案文案版：更直白地表达“把重复的人工工作交给 AI 自动处理”。
- 旧版文案已备份在：`.codex-backups/copy-a-before-20260609-195611`
- 本地预览地址：`http://127.0.0.1:8080/`
- 当前构建产物在：`dist/`

## Mac 上启动

```bash
npm install
npm run build
npm run preview -- --host 127.0.0.1 --port 8080
```

然后打开：

```text
http://127.0.0.1:8080/
```

## 开发模式

```bash
npm run dev -- --host 127.0.0.1 --port 5173
```

## 恢复旧版文案

如果 A 方案不满意，可以把备份目录里的文件复制回项目根目录对应位置：

```text
.codex-backups/copy-a-before-20260609-195611/
```

恢复后重新执行：

```bash
npm run build
```

## 主要文件

- `src/sections/Hero.tsx`：首屏文案和视频
- `src/sections/ProcessGrid.tsx`：适合自动化的场景
- `src/sections/SystemMetrics.tsx`：企业适配和接入流程
- `src/sections/ClientCases.tsx`：案例区
- `src/sections/FAQ.tsx`：常见问题
- `src/sections/Footer.tsx`：底部联系区
- `index.html`：SEO 标题、描述和结构化数据
