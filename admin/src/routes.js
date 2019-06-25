import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('./views/entry'),
      children: [
        {
          path: 'login',
          name: 'login',
          beforeEnter:  (to, from, next) => {
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
          path: 'invite-code',
          name: 'inviteCode',
          component: () => import('./views/invite-code'),
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('./views/users'),
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('./views/about'),
        },
      ],
    },
  ],
})

export default router
