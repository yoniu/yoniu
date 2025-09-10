---
title: "Vue3 重新渲染单一组件"
datePublished: Sun Mar 17 2024 16:31:01 GMT+0000 (Coordinated Universal Time)
cuid: cltvqha2900020ak074x32wok
slug: vue3-auto-update-component
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/mZRCMPbJSPc/upload/f4bb5e19a077c86f87158437a83e9af7.jpeg
tags: ['vuejs', 'vue3']

---

最近有一个需求需要对一个 Modal 弹窗的子组件进行重新渲染。

**解决办法就是每次更新 `:key` 的值来实现组件更新**。

## 回顾

首先我们来回顾一下 `:key` 的作用：

在 `v-for` 中每一个节点都必须添加`:key` ，而这个 `:key` 是一个特殊属性，用来标识节点的唯一性。

在 Vue2 中，`:key` 主要用于 **Vue 的虚拟 DOM 算法中的优化策略**。当使用 `v-for` 渲染列表时，算法会根据 `:key` 的值去对比新旧节点，然后对 `DOM` 进行更新。由于使用了这一优化策略，使 Vue 可以有效地避免 `DOM` 回流和重绘，提高了渲染性能、避免出现错误的数据更新。

在 Vue3 中，`:key` 的作用与 Vue2 不同，它主要用于**跟踪节点的身份**。在 `v-for` 指令渲染列表时，Vue 会根据 `:key` 的值来判断哪些节点是新增的、哪些节点是删除的，然后对 `DOM` 进行更新。

## 实战

这里我使用 `getTime` 的方法来保证每次都有一个新的 `:key`，使算法可以对子组件进行重新渲染。

```html
<template>
  <ChildComponent :key="new Date().getTime()" />
</template>
```
