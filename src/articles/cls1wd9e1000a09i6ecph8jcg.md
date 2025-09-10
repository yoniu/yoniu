---
title: "Flutter 入门：猜数字项目总结"
datePublished: Wed Jan 31 2024 14:43:04 GMT+0000 (Coordinated Universal Time)
cuid: cls1wd9e1000a09i6ecph8jcg
permalink: /flutter-startup-summary-guessing/index.html
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/iOF6Vy0C8lE/upload/ef028f317c02d04f95071d7a70ee4682.jpeg
tags: flutter

---

## Stateless 或 Stateful 的选择

如果对组件的封装不需要使用动画等，可以直接使用 `StatelessWidget`，也可以通过构造函数传递各种控制器；另外 `StatelessWidget` 只有一个 `build` 生命周期函数。

如果想在自身维护控制器，就需要使用 `StatefulWidget`。

## 组件值传递（父子）

子组件通过接收一个 `TextEditingController` 变量来实现值传递给父组件。这个变量通过子组件的构造函数接收。在 `Text` 组件通过 `controller` 参数传入。

父组件可以通过 `TextEditingController.text` 方法获取键入的值。

## 动画效果实现

动画效果通过 `AnimationController` 实现，需要组件 `with SingleTickerProviderStateMixin`。

`SingleTickerProviderStateMixin` 是 Flutter 中的一个 `mixin`，用于管理动画控制器的提供者，即它允许小部件扮演“提供单个刻度”的角色，使它们能够管理动画并在每帧中触发动画的更新。

在 `initState` 中需要对动画控制器进行绑定，设置 `vsync: this`，并设置动画持续时间 `duration`，最后需要对控制器执行 `controller.forward()` 方法。

在其他组件中可以通过 `controller.value` 获取动画当前经过的数值。例如设置字体大小：

```dart
TextStyle(
  fontSize: 54 * controller.value,
  color: Colors.white,
  fontWeight: FontWeight.bold
)
```

### build、dispose、initState 与 didUpdateWidget

这是目前阶段接触到的四个生命周期函数。

**`StatelessWidget` 生命周期只有一个 `build`** 

Flutter StatefulWidget 生命周期大体上可以分为三个阶段：初始化、状态变化、销毁。

### 初始化阶段：

构造函数 > createState > initState > didChangeDependencies > build

### 状态变化阶段：

didChangeDependencies > build > didUpdateWidget

当组件的 `buildContext` 被赋值并且该节点已经在节点树上的时候，组件的 `mounted` 值会一直处于 `true`，直到 `dispose` 方法被调用后才变成 `false`。

当需要执行每帧回调时，可以使用 `addPostFrameCallback` 方法，此方法需要在 `initState` 中调用：

```dart
@override
void initState() {
  super.initState();
  SchedulerBinding.instance.addPostFrameCallback((_) => {});
}
```

### 销毁阶段：

deactivate > dispose

### Appbar 布局结构

```dart
AppBar(
  leading: 左侧,
  actions: [右侧列表],
  title: 中间部分,
)
```
