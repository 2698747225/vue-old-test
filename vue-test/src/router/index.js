import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import parent from '@/components/parent'
import xTemplate from '@/components/componentTemplate/xTemplate';
import parent2 from '@/components/parent2';
import newTest from '@/components/newTest';
// import dyncmic from '@/components/dynamic';
import computed from '@/components/computeTest';

Vue.use(Router)
const dynamic = () => import('@/components/dynamic');
export default new Router({
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/parent/:userId',
      name: 'parent',
      component: parent,
      props: true
    },
    {
      path: '/xTemplate',
      name: 'xTemplate',
      component: xTemplate
    },
    {
      path: '/parent2',
      name: 'parent2',
      component: parent2,
      children: [{
        path: 'parent',
        component: parent,
        meta: {
          requiresAuth: true
        }
      }],
      // redirect: {
      //   path: '/parent/123'
      // }
    },
    {
      path: '/dynamic',
      name: 'dynamic',
      component: dynamic
    },
    {
      path: '/newTest',
      name: '测试',
      component: newTest
    },
    {
      path: '/compute',
      component: computed
    }
  ]
})
