# AGENTS.md

## Project introduce

这是一个基于 11ty 的个人博客项目，使用 React 作为前端框架，UnoCSS 作为 CSS 框架。

## 文件结构

1. public 文件夹用于存放静态资源，如图片、字体等。
2. src 文件夹用于存放项目源代码，包括 React 组件、CSS 样式、11ty 模板等。
   - articles 文件夹用于存放博客文章，每个文章都是一个 Markdown 文件。
   - includes 用于存放 11ty 文件
     - layout 用于存放 11ty 模板布局文件。
     - components 用于存放 React 组件文件。
     - config 用于存放模板配置文件。
     - utils 用于存放 11ty 模板中使用的工具函数文件。
   - pages 文件夹用于存放 11ty 页面文件，每个页面都是一个 Markdown 文件。
3. eleventy.config.js 用于配置 11ty 项目，包括插件、布局、数据等。

## Setup commands

- 安装依赖: `npm install`
- 启动 dev 服务: `npm run dev`
- 启动 dev unocss 监听服务: `npm run dev:css`

## Working agreements

- 所有代码都必须符合 eslint 规范
- 所有代码都必须符合 prettier 规范
- 请使用中文回答我的问题
- 启动 dev 服务的同时要启动 dev unocss 服务确保 css 样式实时更新
- 尽量使用 unocss 提供的类名来编写 css 样式
- 尽量使用 npm 来启动项目，不要使用 pnpm 来启动项目

## 文章编写规范

- 每篇文章都必须包含标题、日期、标签等元数据。
  - title: 文章标题
  - datePublished: 文章发布日期
  - tags: 文章标签，是数组类型，例如 `["前端", "React"]`
  - cover: 文章封面图片，是字符串类型，例如 `"/images/cover.jpg"`
  - cuid: 文章唯一标识符，是字符串类型，例如 `"123456"`
  - aiSummary: 文章 AI 摘要，是字符串类型，例如 `"这是一篇关于 React 的文章"`
  - permalink: 文章永久链接，是字符串类型，例如 `"/articles/123456"`
- 文章内容必须使用 Markdown 格式编写。
