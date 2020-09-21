### new Vue都做了什么？

1. 合并选项
2. 初始化组件的生命周期
3. 初始化事件
4. 构建响应式系统
5. 初始化选项注入
6. 初始化选项提供

### Vue中key的作用	

#### 提升v-for中更新节点的准确性

key可以用来唯一标识一个节点，并且在更新子节点时作为两个vnode是否相等的依据之一。在patchVnode时，如果newNode和oldNode有节点，则需要调用updateChildren方法。在这个方法中，会定义四个指针，分别指向新children和旧children的起始和结束节点。比较时：

1. 先比较newStartIndex和oldStartIndex，相等则执行patchNode函数更新dom节点，
2. 如果不相等，比较newEndIndex和oldEndIndex，过程同上。
3. 如果不相等，则再比较newStartIndex和oldEndIndex，如果相等，将dom上最后一个节点插入到oldStartIndex前面。
4. 如果不相等，再比较newEndIndex和oldStartIndex,如果相等，则将dom上第一个节点插入到oldEndIndex后面。
5. 如果不相等，比较newStartNode的key值和oldchildren中哪个相等，如果没有，则在oldStartIndex前面插入newStartNode节点，如果相等则将该节点插入到newStartNode前面。

如果没有传入key，那么每一次执行sameNode函数时，可能都会返回true，也就是永远执行newStartIndex和oldStartIndex的比较。如果没有传入key或者使用index作用key，当我们删除中间某个元素时，会触发更新，此时新children有两个元素，根据上面的规则可以知道只会更新旧children的前两个节点（因为key是一样的），最后一个dom元素就被remove了，因而这种操作永远只能删除最后一个元素。

#### 使用key可以实现强制替换元素/组件而不是复用它

- 如果只是修改了span元素中的内容是不会触发过渡的
- 完整的触发组件的生命周期钩子

### Vue作用域插槽有什么用

作用域插槽使得父组件可以访问子组件的数据，$scopedSlots

### 什么样的数组操作Vue无法监听到，为什么？

改变数组的length属性和使用数组下标复制都无法监听到，JavaScript限制，性能问题。

### mixins和extends

#### 合并策略 

1. data、provide、inject、props、methods、components、computed、el等属性mixins/extends将自身有的属性而组件没有的属性混合到组件上。
2. watch、生命钩子函数在触发时先执行mixins/extends的回调，在执行组件里的回调。

#### mergeOption的执行过程

### Vue各个生命周期都做了什么？

1. beforeCreated之前：初始化生命周期，事件，无法访问data、methods等数据。
   1. 初始化生命周期，$parent,$root,$children
   2. 初始化事件，对父组件传入的事件进行监听
   3. 初始化render函数，声明$slots,$createElement
2. created 之前：进行了数据响应式处理，初始化选项注入，初始化provide。
3. beforeMount之前：调用mountComponent函数，该函数生成updateComponent函数，以及初始化一个渲染watcher，该watch的更新函数就是updateComponent函数。
4. mounted之前：调用了updateComponent函数，执行render函数（生成virtual-dom），并执行update函数生成实际dom替换原来的el元素。
5. beforeUpdate之前：数据变化了
6. update之前，re_render函数和patch函数（diff算法）调用后

### Vue路由机制



#### Vue路由原理

- `router.push`和`router.replace`有什么区别?
  replace不会推入历史记录，而是直接替换当前路由，用户无法返回原来的页面

- history模式和hash模式有什么区别？

- 路由注册
  Vue路由本身是Vue一个插件，使用Vue.use执行文件的install方法，在VueRouter的install方法中，调用Vue.mixin在每一个组件的beforeCreate生命周期钩子定义_router为传入的VueRouter实例，\_rooterRouter保存跟路由所在的Vue实例。这也是为什么每一个组件都可以访问到this.$router的原因。同时定义当前路由\_route为响应式对象，保证在路由变化时，触发对应组件的重新渲染。

- VueRouter对象

  - new VueRouter做了什么事情

    - this.options保存传入的路由参数
    - 创建路由记录映射表 pathList,pathMap,nameMap，获取matcher实例，该实例有match,addRoutes两种方法
    - 根据传入的mode初始化history对象，默认为hash模式，如果不支持history，也会降级为hash模式

  - 在跟实例执行VueRouter实例的\_init()方法

    - 调用transitionTo( 当前路由和要切换的路由)
      - 调用router.match 实际上是调用matcher.match
        match方法实际上就根据当前的路由的name或者path去路由记录映射表中找到对应的路由记录，并且返回一个不可修改的路由对象，其中有matched属性，记录了匹配的所有路由记录。	
      - 拿到next路由和current路由，比较这两个的matched数组，得到三个队列，updated更新,actived激活,disactived失效
      - 获取钩子函数
        - 获取失效队列
        - 获取更新队列
        - 获取激活队列
        - 激活异步组件
        - 获取失效队列的beforeLeave钩子函数，获取全局router的beforeHooks中的函数，获取更新队列的befoerUpdated钩子函数，获取激活队列的beforeEnter钩子函数，合并为一个队列。

      - 执行钩子函数
        调用runQueue执行上述钩子函数队列，在runQueue的回调函数中生成激活路由的boforeEnter钩子函数（访问不到this）队列和全局解析钩子函数，最后执行全局后置钩子函数

- Router-View

  - 如何知道当前该渲染哪个组件
    history.listen监听到路由的变化，在回调函数中将当前路由赋值给_route。routerView通过获取父组件实例中的$route对象知道当前的路由对象，根据路由对象中的component可以知道该渲染哪一个组件。对于嵌套RouterView会有一个depth属性记录组件深度，根据深度可以获取route.matched中对应组件进行渲染。由于$route是响应式对象，而RouterView的渲染函数又使用到了$router，因此当路由路径变化时，RouterView也会同时触发渲染。

#### 完成的路由解析流程（包含生命周期）

1. 导航被触发
2. 调用失活组件的beforeRouteLeave
3. 调用全局路由beforeEach前置钩子
4. 调用复用组件的beforeRouteUpdate钩子
5. 解析异步路由组件
6. 调用路由独享beforeRouterEnter钩子
7. 调用组件内beforeRouteEnter钩子
8. 调用全局beforeResolve钩子，**在所有组件内守卫和异步路由组件被解析之后**
9. 导航被确定
10. 调用全局的afterEach钩子
11. 触发dom更新
12. 执行next中的回调函数

### 异步更新队列

### 虚拟dom

### diff算法

### 组件的挂载流程

1. Vue实例的挂载

   调用$mount，执行mountComponent方法，在mountComponent方法中生成updateComponent函数，并实例化一个Watcher，updateComponent函数作为Watcher的更新函数。在updateComponent中执行render函数生成VNode,在update函数中将VNode转化为真实dom挂载到body上。

2. 组件的挂载

   1. createComponent

      1. 生成组件构造函函数
         利用Vue.extend生成一个继承Vue组件实例的构造函数

      2. 安装组件钩子函数
         在patch的过程中，会调用组件的钩子函数

      3. 实例化VNode

         返回一个组件的VNode实例，组件的vode是没有children的

   2. patch

      1. 调用createEle执行createComponent方法，执行组件中的data.hook中的init函数，该init函数初始化了组件构造函数，并且自动执行了$mount方法
      2. $mount方法执行

3. 普通节点的挂载

###  响应式原理

#### 响应式对象

- 在initState中对选项进行初始化，在initData中对data作响应式处理
  - 对data数据做一个代理，可以vm.key===vm\[sourceKey][key]
  - 调用observe函数对data做处理
    - observe主要作用是给对象类型添加一个\__ob\__的属性，如果这个属性存在，则直接返回。否则实例化一个Observe类，并将其赋值给\__ob\__属性
    - Observe类的主要作用实例化一个Dep对象，对对象的每一个key执行defineReactive方法
    - defineReactive实例化了一个Dep对象，在数据被getter时执行dep.depend()进行依赖收集，在数据被setter时执行dep.notify()执行派发更新。

#### 依赖收集

- Watcher和Dep

- 过程分析
  在执行$mount时，会执行mountComponent函数，这个函数定义了一个渲染watcher以及更新函数updateComponent。实例化Watcher会调用watcher的getter函数，即updateComponent函数。执行render函数的过程中会触发数据对象的getter方法，此时的Dep.target是当前的渲染Watcher，getter方法中会执行dep.depend方法，该方法执行Dep.target.addDep，也就是当前的渲染Watcher。也就是在为这个Watcher订阅了这个数据对象。同时在addDep中又执行dep.addSubs()，将Watcher添加到数据对象的订阅者中。

#### 派发更新

- 过程分析
  数据对象更新时触发setter，会调用dep.notify()，执行每个Watcher的update函数。在update函数中一般会执行queueWatcher方法，将Watcher放入一个队列中，同一个Watcher只会被放入一次。等待结束后，执行nextTick(flushScheduleQueue)异步进行异步更新。首先会先对队列中的watcher进行排序保证父组件的watcher在子组件的watcher之前执行回调，保证用户自定义Watcher在渲染watcher之前执行，接着执行watcher.run()函数，对于userwatche执行watcher的回调函数，对于渲染watcher执行updateComponent函数，即生成VNode和渲染真实dom。

#### 组件更新

-  新旧节点不同
  1. 创建新的节点 createElm
  2. 更新父的占位符节点
  3. 删除旧的节点，遍历待删除的节点执行删除函数，调用destroy钩子函数
- 新旧节点相同
  - 文本节点
    直接替换文本内容
  - 父节点（比较子节点）
    - oldCh和ch都存在且不同
      updateChildren算法
    - 只有oldCh
      removeVnodes
    - 只有ch
      addVnodes

