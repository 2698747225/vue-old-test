# vue+vuex+vueRouter官方组件练习

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run e2e tests
npm run e2e

# run all tests
npm start
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 相关组件练习文档
# Vue相关
v-bind：相当于单向绑定，后面跟的属性相当于绑定的属性，值为vue实例的值（相当于angular2的方括号）

v-on：相当于绑定事件，后面跟的是事件名，以及vue实例中的事件名。

父、子组件传值，父往子组件传值通过在父组件bind属性，子组件props属性接收属性名获得，相当于angular中的@Input

子向父组件传值，通过$emit传递一个模板参数，使父组件接收，相当于@output

computed计算属性，相当于getter、setter方法。特殊的地方在于进方法的方式采用了缓存，这表示若getter中的内容不是响应式的（new Date()），则不会再进函数计算第二次，
响应式的数据发生变化才会导致再次进入函数计算。（即使是v-if重新渲染也不会进入计算方法）

vue的v-if、v-else中的模板并不会从头开始渲染，实际上会保留数据（意味着数据在dom隐藏后依然缓存了下来），如果要使用不复用数据的方法，需要使用key

因为wabpack对单文件组件的支持很好，所以大多数页面的组件都应使用单文件组件。全局的共享组件应该使用node中的require加载共享组件包，在根入口进行全局的注册

props是子组件用来引用父组件传递参数，可以使用数组来接收多个值，也可以使用对象，接收一个{title:string,name:string}类似的对象，可以限制接收参数的类型，类似ts

父子组件传值时，父组件的props改变，数据流会单向向下更新，子组件的props会自动更新。子组建若从父组件接收一个对象类型的prop，当在子组件中修改对象时，父组件中的
对象依然也会发生改变，但vue不推荐这种做法，会有报错。推荐是隔离对象之间的引用。

v-bind可以绑定特性，用来传递给子组件。同时可以传递一个键值队对象，用来传递多个特性。当不使用v-bind时，传入的prop会被解析为字符串，理论上讲，只有向模板中传入字符串
时，才会不用v-bind，其他类型比如数组、对象、整型、布尔等都需要v-bind以确定不是以字符串的方式传递。

$props：子组件中可以通过$props访问到自身组件的props对象，通过v-bind=$props，可以把自身props完整的传入模板中。
$listeners：子组件中可以通过$listeners访问到自身绑定的事件对象，可以通过v-on=$listeners绑定到模板中
$attrs：子组件中可以通过$attrs访问到自身的非props（除style、class外）的属性

父组件若要直接触发模板中的子组件的事件，需要在绑定事件时加入.native，但仅限与子模板的根模板是有这个事件的（通俗一点就是父组件内的子组件模板上直接绑定方法可执行）

父组件和子组件之间一般是单向数据流，如果要进行双向绑定，建议用sync语法糖，子组件中emit('update:param')通知父组件更新这个值

关于动态模板相关，要是用其他组件，首先要在全局或组件内注册！。通过v-bind:is可以把组件绑定在component组件上，若这个组件切换成其他组件，会进行重新渲染。<keep-alive>
会阻止组件的重新渲染。

组件可以通过$root访问到根实例，$parent可以访问到父组件，但由于组件之间嵌套关系多，不建议直接使用父组件方法，而是使用依赖注入的方法。父组件通过provider返回需要注入的内容，
所有的子组件都可以提通过inject选项注入。

父组件可以在子组件上定义ref注册引用信息，子组件会注册到$ref里，若非自组件而是普通DOM，则为dom本身（类似与angular的elementRef）

通过v-once可以创建出只编译渲染一次的模板。

通过mixins可以给组件注册混入内容，混入内容会优先组件内容执行，若混入内容和组件定义的内容重名，会以组件为准。同时混入也支持全局注册(Vue.mixin({}))，全局注册后所有组件都会混入。

vue指令和angular指令相同，用来操作dom元素。支持组件内局部定义，或者绑定在vue上全局定义。组件中钩子函数的参数为el,binding等，el为dom，binding为指令所带有的参数信息
指令钩子函数：
	bind：指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
	inserted：被绑定元素插入父节点时调用
	update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前
	componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用
	unbind：解绑时

若父组件中子组件的模板中任然包含内容，可以通过<slot></slot>实现，类似angular的<ng-content></ng-content>，slot称为插槽。可以通过在模板上标注v-slot指令来申明插槽的名字
(v-slot:name)，以及插槽本体（v-slot:name="slotBody"）。子组件中通过在插槽组件上添加name元素标记属于哪个插槽。若要在父组件的子组件插槽内容中使用子组件作用域的参数，需要
在子组件中插槽组件中v-bind一个特性（插槽prop）暴露自己作用域中的值，父组件中可以在slotBody中拿到这个特性（具名插槽在父组件中一定要绑在template上）

vue动态渲染部分，render会在beforeCreated之前执行，回调函数中返回createElement方法构造模板，参数为（'h1',Object||VNode），第一个参数为标签，第二个参数为写入标签模板的
数据对象，同时也可以传递一个数组写入多个Vnode节点（子节点），一个组件下不允许创建多个Vnode。

watch部分，可以监听实例属性变化，但如果实例属性为对象，需要深度监听，如果需要监听第一次初始化，需要加上immediate

# Router相关
命名路由
例如针对不同id的用户，/user/:id。在实例中可以通过$route.params.id获取，通过路由props参数的设置，可以解除耦合（通过props接收动态路径参数）。组件中可以通过
$router.push(name:'name',params:{id:id})的方式跳转命名路由。路由参数变化可以通过beforeRouteUpdate监听。

跳转路由携带query参数$router.push(name:'/route',query:{name:123})  //  /route/name=123

router.replace和push相似，不同点在于不会向history栈中保留历史路由

命名视图可以使单个页面下面同时展现多个路由页面，通过routes的组件参数中传递数组完成。（路由JS中以对象别命名的方式保存，router-view中通过name标记）

全局路由守卫
router实例的beforeEach方法，返回的回调中有路由的方向。路由对应的组件会等待守卫的resolve，通过next方法执行。同时每个路由又有自己的守卫beforeEnter。每个组件
有beforeRouteEnter（路由执行前，由于在这个阶段组件未创建，因此访问不到this，可以在next中传递回调函数，在回调函数中访问组件this对象）、beforeRouteUpdate（路由参数发生变化）、
beforeRouteLeave（离开当前组件路由）

路由元信息
针对每个路由设置对应的权限，{path:'a',components:'componentA',meta:AuthPath}。在路由守卫中可以获取到meta信息，对信息进行校验、进行权限校验

在定义router实例时，同时可以设置切换页面的滚动位置（感觉用处不大）

路由懒加载，通过动态引入组件的方式，const Foo = ()=>import('./test.vue') // 返回一个promise，再通过babel中的syntax-dynamic-import解析，可以实现懒加载路由，
在组件被引用时，以工厂函数返回组件的引用promise，实现懒加载路由

全局
beforeEach、beforeResolve、afterEach
路由
beforeEnter
组件内
beforeRouteUpdate、beforeRouteEnter、beforeRouteLeave

# vuex相关
vuex是vue的状态管理树，通俗点理解就是全局状态管理。通过在全局实例化store树，每个单页组件中就都可以引入一个相同的全局状态变量，方便追踪、操作多个组件共享状态。

vuex Store树包含state（状态，相当于组件中的data）、getters（相当于computed的getter方法）、mutations（相当于methods）、actions（异步methods）、module

单页组件中可以通过this.$state访问store中的状态，在computed中可以响应状态的变化，data中只有第一次拿的到数据。也可以通过mapState的方式获取state对象。
    ...mapState({					...map(['count','student'])
      count: state => state.count,
      countParse: function(state) {
        return state.count + this.msg;
      },
      sex: state => state.student.sex
    })

getters保存的主要是格式化的状态数据，理论上也可以在组件中进行格式化，缺点是每个组件都要写一遍。和state用法类似，一般在组件的computed中注入

mutations用来对状态进行修改，但若状态是对象类型，可以利用Vue的数据响应，通过Vue.set方法添加对象属性，修改对象属性可以直接修改。而mutations主要针对其他类型的状态进行修改。
mutations函数为function(state、params){}，组件中利用this.$store.commit('mutationsName',{param:1})的方式调用。mutations只能同步修改state

actions用来异步操作state，但实际上是通过actions异步执行store实例的commit方法（actions函数可以获得context对象）实现的，组件中的注册方法和mutations类似，通过this.$store.dispatch
方法进行调用

module的作用是分块管理状态树，都注册在全局树上会导致很难管理。
使用module后，模块内部的state是局部的，组件中如果要引用外部state需要加入模块名。store树中要引入外部state可以通过rootState（store实例中）对象引入
模块内部的 action、mutations 和 getters 默认可是注册在全局命名空间的。这意味着组件中commit提交一个状态，有可能引发多个全局模块中相同属性名的mutations执行。若要使store树中
模块内的action、mutations、getters只在当前模块中生效，需要加入namespaced: true字段，组件中如果要访问它，就需要在方法前加入模块的路径，或者使用createNamespacedHelpers，
创建模块独有的空间。
可以通过store.registerModule动态注册模块，但一般是用在第三方插件使用vuex管理状态时创建的，支持模块的卸载。
模块在重用时，state会被多个组件引用，导致污染。可以使用和组件data相似的，使用函数返回的方式

store树：									组件中：只有在vuex封装的mapState, mapGetters, mapMutations, mapActions中有注入state
	state基础类型、引用类型							state:$store.state
	mutations：function(state、params){}						mutations：$store.commit
	getters：function(state, getters, rootState){}					getters：$store.getters
	actions：function(context:{state、commit、dispatch、getters,rootState}){}		actions：$store.dispatch
