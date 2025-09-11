---
title: "重写博客系统，举家搬迁 EdgeOne"
datePublished: 1757554815359
cuid: C4V6rA8WHmeoQuK0NQc0Z
permalink: /2025-09-11/index.html
cover: 
tags: []
---

## EdgeOne Pages

前段时间在试用 [CodeBuddy](https://copilot.tencent.com/ide/) 的时候发现了 [EdgeOne](https://edgeone.ai) Pages 服务和 CDN 服务。于是我在 Pages 上把个人主页的代码挂上去，发现用 EdgeOne 的速度很快，而且它**免费**。

挂了几天发现挺稳定，大致跟 Cloudflare Pages 没什么区别，我推送代码会帮我部署更新。所以我花了点时间把域名解析改到 EdgeOne 上去。

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=2114419825&auto=1&height=66"></iframe>

但是，问题来了，我在 EdgeOne 绑定 `@` 一直失败，后续我发工单了解了大致情况。我第一次知道 `CNAME 展平`。由于之前是 Cloudflare 全家桶，我没有太多关注这一方面。

大概是由于 Cloudflare 的 `@` CNAME 解析用到了 `CNAME 展平` 技术，所以导致 EdgeOne 的域名验证一直失败，只需要取消 `CNAME 展平` 即可。

由于找不到 Cloudflare 关闭 `CNAME 展平` 的入口，我索性直接把解析服务搬到腾讯云的 `权威解析`（这得多权威才能想出这个名字）。一开始我还担心会不会因为这样，我的域名邮箱会收不到邮件，后面发现还是可以正常收发邮件的，当初就是因为要这个功能我才转到 Cloudflare 上去。

搬到 `权威解析` 后也是可以正常使用 EdgeOne Pages 服务了。

> 但是毕竟 EdgeOne 是腾讯的产品，而且国内我所知道的 Coding 和 Gitee 都搞过 Pages 服务，一个挂了，一个长期关闭。我觉得按照流程，后续应该会加强内容审核和实名认证，再到后面只开放给企业用户。但是不要紧，先用了再说。

## EdgeOne CDN

最近逛博客发现早在 7 月初就有很多博友发表过 EdgeOne CDN 相关内容，我干脆一股脑把 Hashnode 博客用上 EdgeOne CDN 来加快加载速度。刚开始几小时内发现速度还挺快，可以正常使用。回到家发现所有文章链接从 <blog.200011.net> 域名跳到 <yoniu.hashnode.dev> 上去。顿感大事不妙的我，登录一下 Hashnode 后台，发现域名解析状态变成 `失败`。

## 重写博客系统

用了两年多的 Hashnode，本来是想继续用下去，但是用下来发现限制还是太多。思索了一番，我是想换成 Typecho 还是 WordPress？还是要自己从后端开始重新着手写一套。

自己写一套博客系统出来，这个事情我做了 N 次，每次都是懒得继续搞，索性放弃。

我看了一下我的关于页面，看自己一路下来建站都用了哪些技术。看到 11ty，我已经很久没有用过这套系统，上一次使用是去年给公司临时做一个官网，大概三个小时就能出一版。

所以我花了点时间看一遍 11ty 官网，**它支持 JSX**？看到 JSX 的瞬间我就决定用它来重写，因为它是真的方便。

于是花了大概十个小时的时间，从空文档，到现在一整个完整的项目，主要用到 UnoCSS、React。

文章管理，由于 Git 的特性，我可以使用它天然的特性，版本管理。这样可以很有效的管理我的文章。我顺带写了一个脚本用来创建文件，只需要执行 `pnpm new` 就可以创建新文章。

![](https://blog.oss.200011.net/11ty/20259/wechat_2025-09-11_095332_999.png)

问题来了，那我的图片怎么办，如果都放在一个项目中，那日积月累，我的文件大小恐怕要把资源占尽。一直在用阿里云 OSS 服务，于是我花了点时间写了个上传文件的脚本，只需要执行 `pnpm upload` 就可以把文件上传到 OSS。

思路是把待上传的文件放到某个文件夹，程序读取文件列表，逐个上传。上传后会把该文件夹里上传成功的文件删除。为了拓展性我直接把阿里云 OSS 功能封装成 Hook，后续如果要使用其他云存储服务，只需要用相同的方式写一个 Hook 替换掉即可。

![](https://blog.oss.200011.net/11ty/20259/wechat_2025-09-11_095434_686.png)

以上，后续工作应该是继续把样式完善好。
