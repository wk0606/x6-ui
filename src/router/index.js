import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/Layout/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '/select-comp/gys',
          name: 'gys',
          component: () => import('../views/select/gys.vue')
        },
        {
          path: '/select-comp/gs',
          name: 'gs',
          component: () => import('../views/select/gs.vue')
        },
        {
          path: '/select-comp/yg',
          name: 'yg',
          component: () => import('../views/select/yg.vue')
        },
        {
          path: '/select-comp/yys',
          name: 'yys',
          component: () => import('../views/select/yys.vue')
        },
        {
          path: '/select-comp/kh',
          name: 'kh',
          component: () => import('../views/select/kh.vue')
        },
        {
          path: '/select-comp/xfz',
          name: 'xfz',
          component: () => import('../views/select/xfz.vue')
        },
        {
          path: '/select-comp/sp',
          name: 'sp',
          component: () => import('../views/select/sp.vue')
        },
        {
          path: '/select-comp/sp',
          name: 'sp',
          component: () => import('../views/select/sp.vue')
        },
        {
          path: '/select-comp/tc',
          name: 'tc',
          component: () => import('../views/select/tc.vue')
        },
        {
          path: '/select-comp/zh',
          name: 'zh',
          component: () => import('../views/select/zh.vue')
        },
        {
          path: '/table-comp',
          name: 'table',
          component: () => import('../views/table/r_table.vue')
        }
      ]
    }
  ]
})
