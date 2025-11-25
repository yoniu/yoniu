---
title: EdgeOne：使用 TinaCMS 管理静态博客
cuid: tinacms-edgeone-oss
permalink: /tinacms-edgeone-oss/index.html
cover: >-
  https://blog.oss.200011.net/11ty/202511/6afd93ca-4264-4475-83af-b61b677ff461.png
tags:
  - edgeone
  - tinacms
  - oss
datePublished: 2025-11-25T00:00:00.000Z
---

## 前言

在此之前，我的博客是使用 11ty 开发的静态博客，无任何后端程序支撑，文章全部都放在 Github，这会导致我只能在有 Git 的环境下才能更新文章。而且我上传图片的程序也是用 Node 开发的，所以上传图片我也需要使用电脑，无法做到随时随地的使用我这套程序。

我尝试过用 Obsidian 来解决这个问题，但是还是用不习惯，很多东西无法自定义，听说是要安装各种插件才能用的爽。

今天在 SUUS 博客看到《[使用 TinaCMS 更优雅的管理 Hugo 网站](https://suus.me/202511142353/)》这篇文章，我了解了一番，因为使用 EdgeOne 的缘故，我可以直接将它作为一个 “插件”，这样我就有了在线文章管理功能，因为它可以通过 Github 连接 / Git 推送来达到文章更新。

## 关于 TinaCMS

TinaCMS 是一个开源的内容管理系统（CMS），可以无缝集成到你的 Markdown 工作流程中。使用 TinaCMS，开发者可以在他们喜欢的地方托管网站，使用他们选择的任何框架。

> 个人理解：它可以依赖 Git 作为 Markdown 管理工具，并且有很多自定义功能，比如图片、文章组件等。重点它是不依赖后端的，除非你要自定义资源上传（下面讲）。

## 使用

### 一、安装并初始化 TinaCMS

执行 init 命令后就会自动安装 TinaCMS 所需的依赖，并创建所需文件。

```bash
 npx @tinacms/cli@latest init
```

### 二、修改 dev 和 build 脚本

在启动 11ty 之前我们要启动 TinaCMS，它会自动创建 admin 目录在我们的 public 文件夹里：

```json

  "scripts": {
    "build": "tinacms build && npm run build:css && npx @11ty/eleventy",
    "dev": "tinacms dev -c \"npx @11ty/eleventy --watch --serve\"",
  }
```

当运行后，TinaCMS 会自动索引设置的内容集合（schema.collections），就是我们的文章列表。

### 三、TinaCloud

完成以上步骤并顺利 dev 之后，下一步我们可以考虑 TinaCloud 的免费上云服务。

直接使用 Github 登录之后选择仓库创建项目即可，创建项目完成后绑定域名，之后保留 ClientId 和 Token 进入下一步。

关于TinaCloud：[https://tina.io/zh/docs/tinacloud](https://tina.io/zh/docs/tinacloud)

### 四、tina/config.{js,ts,jsx,tsx}

在执行初始化之后，TinaCMS 会自动创建配置文件，查看并修改之后 tina-lock.json 文件会自动更新（dev 模式下）。

> 谨记每次更新配置文件后都要更新这个文件，否则构建时会报错。

在其中修改内容集合、构建信息等，之后进入下一步。

### 五、使用阿里云 OSS 作为 MediaStore

这里涉及一个冷知识：阿里云 OSS 和 S3 是兼容的。通过这个特性，我们可以直接使用 S3 的方式来[自定义后端媒体处理器](https://tina.io/zh/docs/reference/media/external/authentication)。

> 这里阿里云要 数据安全→跨域设置→创建规则 确保我们可以上传文件，配置参考：[https://tina.io/zh/docs/reference/media/external/s3#4-cors](https://tina.io/zh/docs/reference/media/external/s3#4-cors)。

因为我们使用的是 EdgeOne ，最大的优势是自带函数功能：[https://edgeone.cloud.tencent.com/pages/document/184787642236784640#c6b152c4-06d7-4bdf-809b-d759fc2a4724](https://edgeone.cloud.tencent.com/pages/document/184787642236784640#c6b152c4-06d7-4bdf-809b-d759fc2a4724)。

通过自定义 Node Functions 来创建自定义媒体处理器，在根目录创建 node-functions/api/\[\[default]].js 文件：

```javascript
import express, { Router } from "express";
import { isAuthorized } from '@tinacms/auth'
import { createMediaHandler } from 'next-tinacms-s3/dist/handlers'
import bodyParser from 'body-parser'

const app = express();

const router = Router()

app.use(bodyParser.json());

const mediaHandler = createMediaHandler({
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY || '',
      secretAccessKey: process.env.S3_SECRET_KEY || '',
    },
    region: process.env.S3_REGION || '',
    endpoint: process.env.S3_ENDPOINT || '',
  },
  bucket: process.env.S3_BUCKET || '',
  authorized: async (req, _res) => {
    try {
      if (process.env.NODE_ENV == 'development') {
        return true
      }

      const user = await isAuthorized(req)

      return user && user.verified
    } catch (e) {
      console.error(e)
      return false
    }
  },
},
{
  cdnUrl: process.env.S3_CDN || ''
})

router.use('/s3/media', (req, res) => {
  req.url = req.originalUrl
  return mediaHandler(req, res)
})

router.get('/s3/media', mediaHandler)

router.post('/s3/media', mediaHandler)

router.delete('/s3/media/:media', (req, res) => {
  req.query.media = ['media', req.params.media]
  return mediaHandler(req, res)
})

app.use('/', router)

// 导出处理函数
export default app;

```

### 六、修改配置文件

将 config.ts 中的 media 改为：

```javascript

  media: {
    loadCustomStore: async () => {
      const pack = await import('next-tinacms-s3')
      return pack.TinaCloudS3MediaStore
    },
  },
```

第五第六步的作用，当我们在 TinaCMS 上传、查看文件的时候，它会自动按照 https\://我们的域名/api/s3/media 这个 url 作为媒体 API 连接，所以只要路由正确，handler 与 media 配置能配对上，就可以使用媒体功能。

### 七、推送部署

确保我们在 EdgeOne 中把所有环境变量都填写完毕后，将代码推送自动部署即可。

## 总结

使用 TinaCMS 之后，我随时随地，在只要有网络的环境我就可以直接对编写文章，缺点还需要摸索，目前用起来没啥缺点，唯一缺点可能就是。
