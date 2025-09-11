---
title: "Flutter 实战项目：一言 - 总结"
datePublished: Sat Feb 03 2024 09:49:19 GMT+0000 (Coordinated Universal Time)
cuid: cls5w72ce000409l5fjvy6pll
permalink: /flutter-yiyan-summary/index.html
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/npxXWgQ33ZQ/upload/6ab92aa8c158611ed0008df9b48487e0.jpeg
tags: flutter

---

因为刚开始接触 Flutter，这个小册是我最近买来想说学习一下 Flutter，我看小册介绍是适合入门的，结果一看课程一整个大傻眼。重点内容不细讲，内容缺斤少两，质量堪忧。但是还是顺着思路自己做了下来。

---

小册链接：[https://s.juejin.cn/ds/iLosUrkS/](https://s.juejin.cn/ds/iLosUrkS/)

![](https://blog.oss.200011.net/11ty/20259/1757579170731-509a5be5-935d-4ac4-9f6d-f225efc39d92.png){align=center}

## 网络图片 CircleAvatar 组件

CircleAvatar 组件可以插入图片，如果 `foregroundImage` 加载失败，则会加载 `backgroundImage`，如果再失败就使用 `backgroundColor`。

其中有两个失败的回调函数可以传参 `onForegroundImageError` 和 `onBackgroundImageError`。

要对其插入网络图片，则上面的参数可以使用 `NetworkImage` 获取图片资源。

## 网络请求

项目中网络请求使用的是 `http` 包。

Flutter 中的包可以从 [pub.dev](https://pub-web.flutter-io.cn/) 中搜索选择。

然后在项目中的 `pubspec.yaml` 文件中添加在 `dependencies` 或 `dev_dependencies`，具体添加在两者哪一个中，需要根据项目情况。

项目大致用法是写一个异步函数，通过异步函数调用 `http.post` 方法来获取一言接口返回的数据，将数据 `setState` 到文字状态变量。这个函数需要在生命周期 `initState` 中调用。

## 动画特效

不同于 Flutter 入门小册猜数字项目的是，这里直接用了 `AnimatedOpacity` 来进行动画过渡，而不是通过 `with SingleTickerProviderStateMixin` 并使用 `AnimationController` 来进行动画过渡。这样就少了对 `AnimationController` 的注册和卸载。

## 资源管理：字体

在 Flutter 中，只需要把字体文件放到开发目录的任一位置，并在 `pubspec.yaml` 的 `flutter->font` 中添加即可。

小册中把资源文件都放在 `assets` 文件中，并做了分类。

每次修改 `pubspec.yaml` 后都需要执行一次 `dart pub get` 命令对资源进行更新。

`pub get` 命令确定当前应用所依赖的包，并将它们保存到中央系统缓存（central system cache）中。如果当前应用依赖了一个公开包，Pub 会从 Pub 站点 该包。对于一个 Git 依赖，Pub 会 Clone 该 Git 仓库。

同样包括包的相关依赖也会被下载。例如，如果 js 包依赖 test 包， Pub 会同时获取 js 包和 test 包。

## 日夜模式切换

实现日夜模式切换，需要在 `MaterialApp` 中设置 `theme` 与 `darkTheme`。

因为项目中添加了按钮来控制日夜模式，所以需要使用 `WidgetsBindingObserver` 来监听系统自带的日夜模式切换。用法跟 `AnimationController` 大致相同，同样是使用 `with` 来 `mixins`。

做法如下：

```dart
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }
```

通过 `didChangePlatformBrightness` 来监听切换。在做这一步的时候，由于小册年份已久，`window` 字段已经不能使用，需要使用 `platformDispatcher` 来获取 `platformBrightness`：

```dart
  @override
  void didChangePlatformBrightness() {
    Brightness brightness = WidgetsBinding.instance.platformDispatcher.platformBrightness;
    if (!customTheme) {
      setState(() {
        if (brightness.name == "light") {
          darken = false;
        } else {
          darken = true;
        }
      });
    }
  }
```