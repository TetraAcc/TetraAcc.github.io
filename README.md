# Tetra · 侯润田

侯润田（Runtian Hou）的个人网站，记录散文随笔、长篇手稿、音乐和开源项目。

[访问 tetraacc.me](https://tetraacc.me/)

- [写作](https://tetraacc.me/blog) · 随笔、编年日记与长篇手稿 [《迷宫地图》](https://tetraacc.me/blog/manuscripts/labyrinth-map)
- [音乐](https://tetraacc.me/music) · 歌单、双极电台、翻唱与现场记录
- [项目](https://tetraacc.me/projects) · AstrBot 插件与其他开源工具
- [关于](https://tetraacc.me/about) · 个人简介与建站记录

## 本地开发

使用 Node.js 22.12 或更新的 22.x 版本。在仓库根目录运行：

```sh
npm ci
npm run dev
```

开发站点默认在 <http://localhost:4321>。运行 `npm run build` 会把静态文件生成到 `dist/`，再用 `npm run preview` 预览。

## 部署与致谢

站点由 Astro 构建。[GitHub Actions](.github/workflows/deploy.yml) 在推送到 `main` 后构建并发布到 GitHub Pages。

主题基于 cworld1 的 [Astro Theme Pure](https://github.com/cworld1/astro-theme-pure)。主题许可证见 [Apache License 2.0](LICENSE)。
