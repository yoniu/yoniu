# Yoniu

## 网站

- [个人主页](https://200011.net)
- [博客](https://blog.200011.net)

## 博客技术栈

- 11ty
- React
- UnoCSS
- Node

## 项目脚本

### 开发

```bash
# 11ty
pnpm dev
# UnoCSS
pnpm dev:css
```

### 变量

```js
// ./env.config.js

// 阿里云 oss
export const alioss = {
  accessKeyId: "",
  accessKeySecret: '',
  region: '',
  authorizationV4: true,
  bucket: '',
  endpoint: '',
  folder: '', // 上传到指定文件夹
  domain: '' // 外网访问域名
}

// AI 功能配置
export const ai = {
  apiKey: '',
  baseURL: 'https://api.deepseek.com',
  model: "deepseek-chat",
}
```

### 创建文章

```bash
pnpm new
```

### AI 文章总结 

```bash
pnpm ai:summary 文章ID
```
