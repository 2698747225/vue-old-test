// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import Vuex from 'vuex'

Vue.config.productionTip = false
const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /[A-Za-z]\w+\.(vue|js)$/
)
requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
      .split('/')
      .pop()
      .replace(/\.\w+$/, '')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})

Vue.mixin({
  created() {
    console.log('created finished!');
  }
})

Vue.directive('focus', {
  inserted: function (el, binding, vnode, oldVnode) {
    if (el.focus) el.focus();
  }
});

// Vue.directive('drag', {

// });

Vue.mixin({
  mounted() {
    console.log("我是mixin");
  }
});
router.beforeEach((to, from, next) => {
  console.log(to);
  console.log(from);
  next();
});
router.beforeResolve((to, from, next) => {
  console.log(to);
  next();
});

// Vuex注入
Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    moduleA: {
      // namespaced: true,
      state: {
        count: 0,
        student: {
          age: 21
        }
      },
      mutations: {
        increment(state, params) {
          state.count++
          // console.log(params.amount);
        }
      },
      getters: {
        caculateCount: state => {
          return 'getter格式化：' + state.count;
        }
      },
      actions: {
        asyncIncrement: function (context) {
          setTimeout(() => {
            context.commit('increment', 10);
          }, 5000);
        }
      }
    },
    moduleB: {
      namespaced: true,
      state: {
        count: 0
      },
      mutations: {
        increment(state, params) {
          state.count++
          // console.log(params.amount);
        },
        incrementSelf: function (state) {
          state.count++
        }
      },
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
