---
title: "文章短代码在 Vue 中如何实现？"
seoTitle: "Vue 中实现文章短代码教程"
seoDescription: "Learn how to implement article shortcodes in Vue, transforming Markdown to HTML, and creating Vue components for dynamic content insertion"
datePublished: Tue Aug 12 2025 02:17:18 GMT+0000 (Coordinated Universal Time)
cuid: cme7wve8v000102ldce5uf3e7
permalink: /shortcode-how-to-work-in-vue/index.html
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/glmeeU0zabw/upload/c7956719f79c723875508826bf5527ba.jpeg
tags: ['markdown', 'vuejs', 'mdx']

---

之前我在使用 Gridea 的时候由于没有 “文章短代码” 功能，但我又想在文章中添加音乐播放器、添加视频等等。考虑到 `Markdown` 的特性是支持插入 `HTML` ，我将 `<div class="功能" data-*="字段"></div>` 作为短代码，这样的好处是即使页面渲染时没有执行 JS 代码，也可以保证我的文章内容不会凭空多出一段莫名的 `短代码`。

所以自己就在 “自定义 JS” 里写了一段，大概就是**当页面加载完成时，遍历所有 div.class，相应功能做相应处理即可。**

<iframe width="100%" height="86" src="//music.163.com/outchain/player?type=2&amp;id=2715051255&amp;auto=1&amp;height=66"></iframe>

在去年我和[苏米乐](https://sumiler.com)聊过这个话题，当时他是要做在博客上的，我给他提供了这个思路。后面我们找到另外一种解决方式：[MDX](https://mdxjs.com/)。MDX 是 Markdown 的超集，可以在写 Markdown 的同时，导入 React 组件，后面苏米乐同学就用这个思路开发了一版。

因为最近一直在做主题，而 MDX 并不满足能在 Typecho 的场景下使用，而且我是在 Vue3 环境下开发的，所以我需要另寻方式。

**一般在获取 Markdown 之后，我们会先解析成 html 代码，再用 v-html 将代码输出**。

在这个思路下，其实用我最上面说的 `div.class` 方式写一段页面加载完成后的代码即可。但是这样会失去使用 Vue 的便利。于是我想到可以**使用文本模板的方式，创建一个 Vue 组件**。

这样的话，我们只需要**在 Markdown 解析后，将 html 代码定义为 Vue 组件即可**，示例如下：

```xml
<template>
  <div>
    <Cpt :key="renderTime" />
    <br />
    <a-button @click="handleChange">切换内容</a-button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@arco-design/web-vue';
import { computed, defineComponent, ref } from 'vue';
import Test from './Test.vue';

// html 代码
const html = ref(`
<a-button>html 按钮</a-button>
<br>
<Test msg="哈哈哈" />
`)
// 渲染时间
const renderTime = ref(new Date().getTime())

// 定义组件
const Cpt = computed(() => defineComponent({
  name: 'Cpt',
  template: html.value,
  components: {
    AButton: Button,
    Test: Test,
  },
}))

// 切换组件内容
const handleChange = () => {
  html.value = `
<Test msg="不是" />
<br>
<a-button>html 按钮</a-button>
  `
  renderTime.value = new Date().getTime()
}

</script>
```

在上述代码中，定义一个 `html` 变量作为 Markdown 解析后的代码，再定义一个渲染时间作为自定义组件的 `key`（关于为什么要使用 key，请查看[这篇文章](https://blog.200011.net/vue3-auto-update-component)），最后使用计算属性来定义组件（保证切换组件内容功能）。

通过这个方式，我们可以在 `defineComponent` 时，将预定义的组件在 `components` 字段中传入，就可以实现我们想要的功能。

另外**这个方式需要将 Vue 全量打包**，通常打包时只会打包 runtime，是**不带模板编译器的**。