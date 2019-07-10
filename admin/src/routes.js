import Vue from 'vue'
import Router from 'vue-router'
import { ROUTE_BASE } from './config'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: ROUTE_BASE,
  routes: [
    {
      path: '/',
      component: () => import('./views/entry'),
      children: [
        {
          path: 'login',
          name: 'login',
          beforeEnter: (to, from, next) => {
            const {
              query: { token },
            } = to
            if (token) {
              localStorage.setItem('ignite_admin_token', token)
              next({ name: 'users' })
            }
          },
        },
        {
          path: 'nodes',
          name: 'nodes',
          component: () => import('./views/nodes'),
        },
        {
          path: 'services',
          name: 'services',
          component: () => import('./views/services'),
        },
        {
          path: 'codes',
          name: 'codes',
          component: () => import('./views/codes'),
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('./views/users'),
        },
      ],
    },
  ],
})

export default router
