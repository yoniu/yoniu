---
title: "React + ThreeJS 实践（二）"
seoTitle: "react + threejs 实时数据显示与更新"
seoDescription: "react + threejs 实现 mqtt / websocket 数据实时渲染与更新，实现方式有 CSS2DRenderer、CSS3DRenderer、CanvasTexture、Text Geometry"
datePublished: Tue Jan 07 2025 02:20:24 GMT+0000 (Coordinated Universal Time)
cuid: cm5lufjbn000a08l07dijd8xz
permalink: /react-threejs2/index.html
cover: https://blog.oss.200011.net/11ty/20259/1757579558877-f5ffc3a62f76ae51367e4e2131c3d80a.jpeg
tags: ['reactjs', 'threejs']
aiSummary: "本文深入探讨了React与ThreeJS结合实现MQTT实时数据展示的技术方案。主要介绍了四种文字展示方式：CSS2DRenderer、CSS3DRenderer、CanvasTexture和Text Geometry，重点分析了各自的优缺点。CSS2DRenderer和CSS3DRenderer虽然样式灵活但缺乏物体遮挡关系，而CanvasTexture通过纹理贴图方式解决了层级关系和物体旋转问题。文章详细展示了MQTT消息订阅的实现机制，包括Context封装、回调函数管理和实时数据更新流程，最终实现了物体上实时数据显示和移入显示的popup效果，为三维场景中的实时数据可视化提供了完整的解决方案。"

---

## 前言

在上一篇《[React + ThreeJS 实践（一）](https://hashnode.com/post/cm4qqpt00000e08l1bnaxgjlm)》中摸索了场景构建和数据存储方式，这一篇来讲述一下 MQTT 实时数据的展示与更新。

在本文中我们要考虑如何在物体上实时显示数据、如何在物体上新增 popup 效果。

在 Threejs 中有很多种文字展示方式：CSS2DRenderer、CSS3DRenderer、Texture 等。

具体说明：[https://threejs.org/docs/index.html?q=text#manual/en/introduction/Creating-text](https://threejs.org/docs/index.html?q=text#manual/en/introduction/Creating-text)

在实际开发中，为了节省时间，我们尽可能选择最方便的一种方式，在此之前我们简单了解其中几个方式。

## CSS2DRenderer / CSS3DRenderer

CSS2DRenderer 是 CSS3DRenderer 的简化版，它们可以直接将 DOM 元素以 2D / 3D 的形式显示在页面中。

这两个方式无疑是最容易实现好看效果的，因为可以直接用 CSS 写样式。

在这种标签渲染器中，需要创建一个 Render，**它与 Three 模型层是分开的，这意味着他不存在物体的前后遮挡关系**。同时，我们在对模型层进行更新的时候也需要更新标签渲染器，比如大小更新、动画更新。

回想开头我们想要实现的 popup 效果，是不是可以根据 CSS2DRenderer 来实现？

参考文档：

[https://threejs.org/docs/index.html?q=css#examples/en/renderers/CSS2DRenderer](https://threejs.org/docs/index.html?q=css#examples/en/renderers/CSS2DRenderer)

[https://threejs.org/docs/index.html?q=css#examples/en/renderers/CSS3DRenderer](https://threejs.org/docs/index.html?q=css#examples/en/renderers/CSS3DRenderer)

## Texture

由于以上的方式，没能实现我们需要**在物体上实时更新数据**，因为它缺少物体的前后遮挡关系。

物体显示的层级关系，还有物体中的旋转角度、位置向量都是我们需要考虑的问题，于是我想到了“纹理贴图”。

纹理的实现方式是使用 CanvasTexture，在 Canvas 中创建文本贴图，再将 Canvas 转为物体材质映射到物体上即可。使用贴图的优势是不需要考虑层级关系、也不需要考虑物体的位置或旋转，只需要将贴图往物体上一贴，便可以轻松实现我们需要的效果。

## MQTT 消息订阅

在 React 代码中，我将 MQTT 封装为一个 Context，提供：SetTopic、AddCallback、RemoveCallback、RemoveAllCallback 的方法。Callback 数据作为一个 Map 数据类型，每次 MQTT 接收到订阅提醒就会执行 Callback 中所有的方法。

```typescript
    // 创建 mqtt 链接
    window.$wujie.props.methods.mqttConnect((data) => {
      state.mqttCallbackMap.forEach(value => {
        value(data)
      })
    })
```

在前文中，我们已经可以实现将物体数据存放到 Context 中，所以在 `afterInit` 的生命周期后，我们就可以对物体进行订阅。`afterInit` 是我们自己实现的，在模型场景等数据加载完成后执行。

以下代码我们获取标记的屏幕对象，并逐一添加 MQTT Callback：

```typescript
      // 根据屏幕对象订阅数据
      state.sceneData.forEach(item => {
        if (item.data.type !== '表计') return false;
        const currentId = (item.data as TSceneData<ICabinetData>).idx;
        const cabinetData = item as ISceneData<ICabinetData>;
        dispatch({
          type: 'ADDMQTTCALLBACK',
          name: 'ScreenDisplay_'+ item.id + '_' + currentId,
          callback(data) {
            // 物体贴图创建
          }
        })
      })
```

获取到对象后我们需要对数据贴图进行创建，通过 DOM 操作创建 Canvas，并创建文本，最后通过 `THREE.CanvasTexture` 将 Canvas 转为 Three 可用的材质贴图（如果无背景颜色，可以创建为透明贴图）：

```typescript
;((screenObject as THREE.Mesh).material as THREE.MeshBasicMaterial) = new THREE.MeshBasicMaterial({
    map: instance.textTextureMaker.createTextureFromArray(screenData),
});
```

## 效果展示

其中移入物体显示的标签为 CSS2DRenderer，物体上的数据显示为 CanvasTexture。

![](https://blog.oss.200011.net/11ty/20259/1757579180324-0251b902-6b60-48ae-8374-85df83db5e66.gif){align=center}