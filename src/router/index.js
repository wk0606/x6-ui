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
        }
      ]
    }
  ]
})
