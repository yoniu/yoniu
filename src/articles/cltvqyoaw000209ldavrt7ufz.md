---
title: "Vue-i18n 踩坑"
datePublished: Sun Mar 17 2024 16:44:33 GMT+0000 (Coordinated Universal Time)
cuid: cltvqyoaw000209ldavrt7ufz
permalink: /vue-i18n-my-false-1/index.html
cover: https://blog.oss.200011.net/11ty/20259/1757579558346-6b159578d4531530d9430e43289c828f.jpeg
tags: ['vuejs', 'i18n']

---

## 踩坑 #1

**更改语言必须在 `setup` 内使用**。

项目需求是用户登录后按照后端传的数据，需要对前端显示的语言进行切换。但是修改语言无法在 `pinia` 中完成。

我的做法是先修改 `store` 中用户设置的值，因为在 `App.vue` 需要对 `locate` 进行判断，所以我在 `App.vue` 中 `watch` 了 `store` 的值，检测到值改变就改变 `currentLocate` 的值，使前端实现语言切换。

## 踩坑 #2

列表组件渲染在 `setup` 中的 `reactive` 数据，其内容使用 `t('***')` 更改语言后不跟着切换。例如我在列表数据中将 `label: t('***')`，等我成英文的时候，列表中的 label 并不会跟着我的切换而变成英文。

我的做法是直接在数据中将 `label: t('***')` 改成 `label: '***'`，在 `template` 中输出的 `{{ label }}` 改成 `{{ $t(label) }}`。