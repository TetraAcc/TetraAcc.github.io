# Tetra · 侯润田 (tetraacc.me)

> 侯润田（Runtian Hou / Tetra）的个人空间，记录散文随笔、长篇手稿、私人歌单与开源项目。

[![Deploy to GitHub Pages](https://github.com/TetraAcc/TetraAcc.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/TetraAcc/TetraAcc.github.io/actions/workflows/deploy.yml)
[![Website](https://img.shields.io/badge/Website-tetraacc.me-659EB9?logo=google-chrome&logoColor=white)](https://tetraacc.me/)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/Content-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![License: Apache-2.0](https://img.shields.io/badge/Code-Apache--2.0-blue.svg)](LICENSE)

---

## 🧭 站点栏目

- **[写作 · Blog](https://tetraacc.me/blog)**：个人散文、日常随笔、编年日记，以及长篇手稿企划 [《迷宫地图》](https://tetraacc.me/blog/manuscripts/labyrinth-map)。
- **[音乐 · Music](https://tetraacc.me/music)**：精选私人歌单、网易云双极电台、吉他与人声翻唱，以及 2023 Summer Sonic 现场记录。
- **[项目 · Projects](https://tetraacc.me/projects)**：个人开源工具与 AstrBot 生态插件（如 API 额度监控看板、DeadBot 等）。
- **[关于 · About](https://tetraacc.me/about)**：个人履历、软硬件开发环境与建站日志。

---

## 💡 建站历程与设计细节

建立这个站点的初衷，是希望把长期分散在备忘录、文档与纸质笔记里的随笔、小说手稿收拢到一个干净、快速、无干扰且完全由自己掌控的数字花园中。

在站点迭代过程中，我们针对个人阅读与内容发布做了许多定制化打磨：

### 1. 长篇手稿「继续阅读」书签（迷宫地图）
对于字数较多、分章节的长篇手稿（如《迷宫地图》），文章内置了无侵入式的主动滚动进度跟踪机制：
- 读者进入后续小节时，浏览器会自动按文章路径在本地安全记录阅读进度；
- 再次打开普通文章链接时，文首会自动浮现「继续阅读 · 小节标题」快捷入口，由读者自主决定是否一键跳转；
- 自动避开首次访问、分享链接直接携带特定 `#锚点` 等边界情况，既不打扰原生分享定位，又省去读者反复翻找进度的麻烦。

### 2. 随笔「🎲 随机读一篇」
很多散文随笔以日期作为标题（如《2023-08-29》），读者在知道关键词时可使用站内全文搜索，而在随便闲逛、随性漫步时，位于博客页分类标签旁的「🎲 随机读一篇」入口能跨越漫长的时间线，瞬间抽取一篇公开随笔开启阅读。

### 3. 动态音乐胶囊与现场见证
- **首页实时胶囊**：桌面端保持极简单行，移动端自适应为封面置左、两行曲名与歌手并排的排版设计，通过 Cloudflare Worker + Spotify Web API 动态呈现最近收听曲目；
- **跨栏目联动**：随笔中记录的 Summer Sonic 感受，文末自然衔接至音乐页对应的双舞台实录（Two Door Cinema Club 与 Fall Out Boy）。

### 4. 双轨内容与后台管理 (Admin)
- **GitOps 与本地写作**：日常主要在本地 VS Code 中使用 Markdown / MDX 编写文章，通过 Git 提交即自动触发 CI/CD 静态打包与部署；
- **Web 端后台管理**：基于 Decap CMS 并在 Cloudflare Workers 配置了轻量级 OAuth 认证服务，在手机或任意浏览器访问 `/admin` 即可随时随地管理手稿与随笔草稿；
- **轻量互动**：集成 Waline 评论系统，基于 Supabase 数据库与 Vercel Serverless 构建，纯净无广告，提供点赞与回复提醒通知。

---

## 🛠 技术栈与基础设施

- **框架基底**：[Astro](https://astro.build/) (v5+) + TypeScript
- **样式方案**：[UnoCSS](https://unocss.dev/) + Tailwind Typography (Prose)
- **字体排印**：Fontshare (Satoshi) + Noto Serif CJK
- **评论系统**：[Waline](https://waline.js.org/) + Supabase PostgreSQL + Vercel
- **后台管理**：[Decap CMS](https://decapcms.org/) + Cloudflare Workers
- **持续集成**：GitHub Actions + GitHub Pages 自动化构建与发布

---

## 💻 本地开发

运行本项目需要 **Node.js 22.12** 或更高版本：

```sh
# 1. 克隆本仓库并进入目录
git clone https://github.com/TetraAcc/TetraAcc.github.io.git
cd TetraAcc.github.io

# 2. 安装项目依赖
npm ci

# 3. 启动本地开发服务器
npm run dev
```

开发服务器默认运行在 <http://localhost:4321>。

```sh
# 构建全静态站点产物
npm run build

# 本地预览构建产物
npm run preview
```

---

## 📜 版权与许可说明

- **文章与原创内容**：站点内所有散文、随笔、长篇小说《迷宫地图》等原创文学作品与摄影图片，均遵循 **[知识共享 署名-非商业性使用-相同方式共享 4.0 国际许可协议 (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/)**。在非商业目的且保留作者署名的前提下允许分享与演绎，演绎作品须以相同许可共享。
- **站点源码与架构**：网站源码与构建配置遵循 **[Apache License 2.0](LICENSE)**。

---

## 🙏 致谢与鸣谢

- 感谢 cworld1 开源的极简主题 **[Astro Theme Pure](https://github.com/cworld1/astro-theme-pure)**，为本站奠定了优秀的架构雏形与视觉底座。
- 特别致谢 **ChatGPT** 与 **Gemini** 两位 AI 协作者：在从零搭站到细节打磨的数个日夜里，从长篇断点续读逻辑的精巧设计、音乐胶囊的移动端响应式排版，到各类边界情况排查与代码重构，提供了源源不断的架构灵感与代码辅助。
