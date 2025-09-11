---
title: "React + ThreeJS 实践（一）"
seoTitle: "React+ ThreeJS 实践"
seoDescription: "Learn how to effectively integrate React and ThreeJS using object encapsulation, ensuring seamless 3D functionality within your applications"
datePublished: Mon Dec 16 2024 07:55:34 GMT+0000 (Coordinated Universal Time)
cuid: cm4qqpt00000e08l1bnaxgjlm
permalink: /react-threejs1/index.html
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/PACWvLRNzj8/upload/0d863cb2c5a00361b9f377a6d3572b1f.jpeg
tags: ['reactjs', 'threejs']

---

## 前言

React 和 ThreeJS 的开发方式有很多，本文主要通过对象封装做具体实现，内容只是做知识疏导，不会出现大量代码块。

由于最近需要在 Vue2 项目中加入 3D 功能，并且在原本项目代码已经堆积如山的情况下，我选择加入[微前端无界](https://wujie-micro.github.io/doc/)来确保在不打乱原本代码的情况下还能使用更新的技术。另外选择无界的原因就是无界的通信功能足够满足我的要求，在子应用中不需要重新编写请求代码，直接从父应用中通过 `props` 注入。构建工具使用的是 `vite`。

我将 Three 的数据封装在一个类中，通过[单例模式](https://www.runoob.com/design-pattern/singleton-pattern.html)来保证数据的唯一，最后通过实现生命周期方法来进行数据绑定。

## 建模场景

很多的 Three 教程一上来就是各种方块、三角形的代码编写，**事实上并不需要前端人员一个个方块、三角形把界面组成，而是通过 3d 建模工具导出 Three 可用的模型数据，通过 loader 来加载建模即可。**

在 UI 建模时，只需要约定好物体的命名，确定好物体的坐标就行。其他东西任意发挥。

## CThree 类

CThree 作为基类脏活累活都要干，首先是实现单例：

```typescript
export default class CThree {
    static instance = null
    static getInstance() {
        if (!CTree.instance)
            CTree.instance = new CTree()
        return CTree.instance
    }
}
```

之后就是创建场景、创建相机、创建渲染器、创建控制器、创建灯光，定制化可以添加 `resize` 监听、`stats` 性能监控。**此时需要把场景、相机等成员数据写入类中**。这些事情的分开写每个事情用一个方法来写，最后通过一个 `init` 方法将所有事情按先后顺序处理。

动画更新我写 Unity 比较多，命名为 `update` 了；具体的生命周期通过公开成员的方式进行重写。

卸载使用 `dispose` 作为方法名，需要把

**在** `update` **中有一个坑：**

如果是通过 `requestAnimationFrame(this.update);` 会出现 `this` 指向问题。这是因为我们是通过单例实现的，所以需要改为：

```typescript
  public update() {
    requestAnimationFrame( () => this.update() );
  }
```

同理的还有 `addEventListener` 也需要使用箭头函数来解决。

## CRoom 类

CRoom 是 CThree 的子类，上面单例需要对 `new` 进行修改，比如通过 `this` 来实现 `new this` 。我将该类作为具体实现的类。

在 CRoom 中我将把模型载入，模型载入时需要对模型名称进行判断，确定物体的分类，将需要进行数据交互的类提取到 `actionObjects` 数组中，另外还需要比如 `cameraObjects`、`tableObjects`等。**这些** `object` **必须是将原本的地址传入，不能通过复制的方式推入数组，因为** `object` **数据是关联到** `Three Scene` **中的，如果是拷贝后的数据，那在** `Scene` **中是不存在的，除非** `scene.add` **，但这样就会出现多个重复的物体。**

在鼠标事件中，可以直接使用 `actionObjects` 作为 `raycaster` 的目标物体，但这样会出现穿墙的情况。由于我们需要对每一个物体进行点击事件绑定，所以需要为每一个 `object` 分类做一个单独的点击 `callback` 。

比如摄像头，即放在 `actionObjects` 中，也放在 `cameraObjects` 中，单独的事件 `onClickCameraCallback` 将通过成员覆盖重写。

## React

以上完成了两个类，在 React 中只需要调用 CRoom 类就可以，为了更好的做功能实现，我会将数据放到 Context 中。

想要挂载 CThree 实例需要一个 dom，通过 `useRef` 来存放。在组件挂载时获取实例，绑定事件，卸载时清除实例。

比如在组件挂载时，通过封装给组件代码瘦身：

```typescript
export default function Room() {

  const threeRef = useRef<HTMLDivElement>(null)
  const { dispatch } = useStateContext();

  useEffect(() => {
    if (!threeRef.current) return;

    const root = threeRef.current;
    const instance = CRoom.getInstance(root);

    // 生命周期需要在 init 之前实现
    // 这里将内容推到 Context 保证虚拟 dom 的更新
    instance.afterLoaded = () => {
      dispatch({ type: 'CLEANACTIONOBJECTS' })
      dispatch({
        type: 'ADDACTIONOBJECT',
        actionObjects: instance.actionObjects,
      })
    }

    instance.init();
    instance.camera.position.set( 12, 12, 20 );
    
    instance.addStats();

    // 清理
    return () => {
      instance.dispose();
    };
  }, [])

  return (
    <>
      <div className="root" ref={threeRef}></div>
    </>
  )
}
```

在 CRoom 中提到的相机事件绑定：

```typescript

    instance.onClickCameraCallback = (selectedObject) => {
      // 计算相机位置
      const cameraPosition = calculateCameraPosition(selectedObject.position);
      // 转动视角
      gsapCamera(instance, cameraPosition, selectedObject.position, () => {
        dispatch({
          type: 'SETCURRENTOBJECTNAME',
          name: 'Room_' + selectedObject.name
        })
      });
      document.body.style.cursor = 'default';
    }
```

由于是单例模式，所以在其他组件中，我们依然可以通过 `CRoom.getInstance(root)` 来拿到这个实例。

就比如在上面我们把 `actionObjects` 放到 Context 中，现在需求是通过遍历这些对象，来实现一个 `Select` 选择对象并把摄像机聚焦这个对象：

```typescript
export default function ActionObjects() {
  const { state, dispatch } = useStateContext();

  /**
   * 下拉项
   */
  const options = useMemo(() => {
    const objectOptions = state.actionObjects.map(actionObject => {
      return {
        value: actionObject.uuid,
        label: actionObject.name,
      }
    })
    return [
      {
        value: 'default',
        label: '俯瞰视角',
      },
      ...objectOptions
    ];
  }, [state.actionObjects])

  /**
   * 选择项改变相机位置
   * @param uuid 
   * @returns 
   */
  const handleChangeSelect = (uuid: string) => {
    const instance = CRoom.getInstance();
    if (uuid === 'default') {
      gsapCamera(instance, new THREE.Vector3(12, 12, 20), new THREE.Vector3(0, 0, 0))
    }
    // 清除当前选择
    dispatch({
      type: 'SETCURRENTOBJECTNAME',
      name: ''
    })
    const obj = state.actionObjects.find(actionObject => actionObject.uuid === uuid);
    if (!obj) return;
    const cameraPosition = calculateCameraPosition(obj.position);
    gsapCamera(instance, cameraPosition, obj.position, () => {
      // 设置当前选择的物体名称
      dispatch({
        type: 'SETCURRENTOBJECTNAME',
        name: 'Room_' + obj.name
      })
    });
  }

  return (
    <div className="min-w-36 p-3 bg-white/20 backdrop-blur-md border border-gray-100/10 rounded">
      <Select className="w-full" placeholder="选择对象聚焦" onChange={handleChangeSelect} options={options} placement="bottomLeft"></Select>
    </div>
  );
}
```

## 效果展示

![](https://blog.oss.200011.net/11ty/20259/1757579178636-34c53034-c712-4224-883b-fe76ff5d910a.gif){align=center}

## 结语

React 和 ThreeJS 的实现方式不止这么一个方法，也可以通过 Context 创建，选择适合自己的方法最重要，在实际开发中还需要根据具体需求做具体定制。