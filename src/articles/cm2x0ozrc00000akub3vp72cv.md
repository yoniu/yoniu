---
title: "新的个人主页"
seoTitle: "全新个性主页设计"
seoDescription: "文章探讨了使用 React18 重新设计个人主页，并比较了两种部署方式：Coding 和 Cloudflare Pages。"
datePublished: Thu Oct 31 2024 08:02:04 GMT+0000 (Coordinated Universal Time)
cuid: cm2x0ozrc00000akub3vp72cv
permalink: /homepage-2024/index.html
cover: https://blog.oss.200011.net/11ty/20259/1757579172710-97b8bd10-c6bb-4afc-861f-0d19eaf0fc15.png
tags: ['sticky']

---

## 前言

上一次做个人主页已经是 2 年前的事情了，当时只使用 Codepen 做，一个 bug 也挂了 2 年。

刚好最近在学习 React18，好在之前学习的 React 知识够用，TSX 也在 Vue 项目中用的如鱼得水，同时也是想尝试一下 Shadcn UI 和 Rspack。于是便把个人主页重新写一遍。

## 设计

依旧是简单的索引页功能，但是还是引入了 LeanCloud 打算做点新功能。设计上简单的把 Shadcn UI [官方示例](https://ui.shadcn.com/docs/components/separator)直接拿来修改，在侧边加入头像用于音乐播放。图片使用的是 Luther Vandross 同名专辑封面，歌曲选自专辑中的《If I Was The One》。

## 部署方式

开发方式依然是线上直接开发，使用 CloudStudio 云端 IDE 与 Github / Coding。好处是可以随时随地使用同等环境开发。

部署方式有两种：

#### Coding 持续部署

通过 Coding 持续部署，将产物上传到腾讯云 COS。这种方式不仅麻烦，并且构建时间缓慢，最大的缺点是收费。

首先说一下麻烦，由于我使用的是 Rsbuild 做构建工具，所以需要高版本的 NodeJS，而 Coding 自带的 NodeJS 版本只有 12，于是 Coding 部署需要在不同阶段设置 Docker 来确保 NodeJS 环境。虽然它可以设置全局 Docker，但是这会导致腾讯云 COS 无法提交。另外就是腾讯云的密钥等，在确保安全的环境下配置很麻烦，而且多次需要使用手机扫码、获取短信等操作。

再者是构建时间缓慢，上面说到需要使用 Docker 来确保 NodeJS 环境，于是每次构建都需要自动配置一次 Docker，也许是我功能没用全，可能会有缓存功能，但是我没用到。

还有就是腾讯云 COS 无法通过服务自带的域名在浏览器中访问，需要自行绑定域名，还要进行静态网站配置。问了一下客服，这一套操作下来需要买四种资源包，使用国内服务并且在最低配置下，一年应该需要一百来块钱。

最终，通过 Coding 持续部署从 git 代码提交到构建到 COS 总共耗时 1 分 30 多秒。

#### Cloudflare Pages 部署

我之前的网页一直是通过 Cloudflare 部署，所以这套操作还是很熟悉的。

Cloudflare Pages 只需要连接 Github 仓库，就可以实现自动构建与自动部署，并且 NodeJS 版本的选择只需要填写环境变量即可。

另外就是 Cloudflare 域名绑定只需要做 CNAME 指向即可，由于我的域名一直是使用 Cloudflare 做内容分发，所以连这一步都不用操作，直接填写域名，Cloudflare 会自动帮我把 CNAME 加上。

最后，通过 Cloudflare 从 git 代码提交到构建到 COS 总共耗时 31 秒。

我选择 Cloudflare 的原因不言而喻，虽然国内访问速度不及腾讯云 COS，但是他免费。

仓库连接：[https://github.com/yoniu/homepage](https://github.com/yoniu/homepage)

## 更新日志

### 2024-11-01

* 使用 NextJS 重构，优化站点 SEO
    
* 新增 Hashnode 文章获取，给博客引流
    
* 新增友链头像 alt，友链链接添加 ref 属性
    
* 播放器添加加载效果、待播放提示效果
    
* 修复音乐播放后无法暂停问题
    

### 2024-11-18

* 重新设计 Homepage
    
* 新增登录功能、后台管理功能、Moment 编辑器
    
* 新增后端发布功能：支持发布 Text Item
    
* 新增首页列表输出：支持展示 Text Item
    

### 2024-11-19

* 新增发布 Image Item
    
* 新增展示 Image Item（灵感来源：抖音）
    

### 2024-11-21

* 新增 twikoo 评论
    

### 2024-11-25

* 新增浮动文字
    

### 2024-11-26

* 新增圣诞老人浮动文字
    

### 2024-12-24

* 新增发布 Video Item
    

### 2024-12-25

* 新增展示 Video Item（灵感来源：Instagram）
    
* 新增浮动文字圣诞老人坐飞机样式
    

### 2025-02-23

* 分离首页内容列表
    
* 新增首页瀑布流布局
    
* 新增 moment 详情页
    
* 新增瀑布流 Text 样式段落效果
    

### 2025-03-31

* 编辑器新增定位服务
    
* 编辑器 TextItem 新增背景颜色设置
    

### 2025-04-01

* 瀑布流列表 TextItem 颜色展示
    
* TextItem 前台浏览新增背景颜色 && TextItem 图片预览支持切换下一张
    

### 2025-04-02

* 新增 V6 统计代码
    

### 2025-08-19

* 新增 V2 导航
    
* 新增 V2 主页预览
    

### 2025-08-20

* 新增 V2 音乐播放器
    

### 2025-09-08

* 首页改为新版样式
    
* twikoo 样式优化 && cdn 文件改本地
    
* 新增手机端导航收起展开
    
* 隐藏布局切换
    
* 新增鼠标滚轮切换 moment