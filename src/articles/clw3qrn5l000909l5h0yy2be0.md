---
title: "iTwitter 2 前端开发"
datePublished: Sun May 12 2024 16:20:39 GMT+0000 (Coordinated Universal Time)
cuid: clw3qrn5l000909l5h0yy2be0
slug: itwitter-2-readme
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1715530617972/d0c3ff5a-d251-4b23-a782-75d489e16dd1.png
tags: ['webpack', 'vuejs', 'typescript']

---

iTwitter 2 主题是基于 `Vue3` + `TypeScript` 开发的 `Typecho` 主题，主题功能正在逐步完善中。

## 为什么要使用这种方式开发主题

使用 `Vue` 开发主题必然是未来趋势，在以往使用 `JQuery` 开发中往往需要通过获取元素再对元素进行事件绑定、数值获取，在没有 `TypeScript` 的帮助下更是很容易将代码堆积成屎山导致后续开发难度增加导致无从下手。

在以往我做过很多的尝试，比如使用 `gulp` 流将 `js` 代码打包、将 `less` 代码编译成 `css` 代码后压缩打包。但是这种开发方式始终不如 `Webpack` 打包方式来的高效。

而使用 `Vue` 基于模块化思想、组件化思想开发，可以使代码结构清晰，便于维护。组件复用、数据传递、生命周期钩子等特性使开发更加高效。并且 NodeJS 为开发者提供了大量的第三方库只需要通过 `npm install ***` 即可安装使用，不需要自己重复造轮子，提高了开发效率。

## 编辑器组件代码

```typescript
<template>
  <!-- 分隔符 -->
  <a-divider :margin="12" />
  <a-space class="yoniu-editor" :size="12" fill>
    <!-- 遍历功能组件：基于 IOC -->
    <template v-for="(plugin, _) in plugins" :key="_">
      <component :is="plugin" />
    </template>
  </a-space>
</template>

<script lang="ts" setup>
import Emoji from "@/components/emoji/Emoji.vue";
import Media from "@/components/media/Media.vue";
import InsertIcon from "@/components/icon/InsertIcon.vue";
import Colorful from "@/components/colorful/Index.vue";

const plugins = {
  Emoji,
  Media,
  InsertIcon,
  Colorful,
};
</script>
```

## Webpack 打包功能实现

在主题中有三个比较重要的功能：

* 编辑器拓展功能
    
* 主题设置功能
    
* 主题主要功能
    

在本项目的 `Webpack` 打包入口分了三个包 `editor`、`setting`、`theme` 分别对应以上功能。

以上三个功能包全部打包为 `js` 文件，输出目录为 `主题文件/assets/js`。

在 `optimization` 配置中将 `Webpack runtime` 提取为单独的 `runtime.bundle.js` 另外分离出三个包共用的代码为 `public.bundle.js`。所以在主题引用功能包前，需要引用 `runtime.bundle.js` 和 `public.bundle.js`。

因为使用了 `Arco Design`，所以为了更方便开发主题，使用了组件自动导入。具体查看 `webpack.config.js` 中的 `plugin` 配置。

另外，由于 `Webpack` 打包样式文件时会将样式代码以 `js` 代码输出为页面的 `<style>` 标签，本项目使用了 `MiniCssExtractPlugin` 来将样式代码单独打包为 `css` 文件，输出目录为 `主题文件/assets/css`。

## Webpack 打包速度优化

回看以往 `Webpack` 大都使用 `babel` 做代码转化，对于 `TypeScript` 的支持还需要很多 `babel` 插件的使用，最终造成 `Webpack` 打包缓慢。

所以本项目使用了更先进的 `SWC` 作为 `JS` 与 `TS` 文件的打包工具，使打包速度快了至少 3 倍以上。并在 `watch` 模式下可以保证保存一秒内即可编译完成。