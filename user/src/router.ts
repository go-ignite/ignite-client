import Vue from 'vue';
import Router from 'vue-router';
import { ROUTE_BASE } from './config';
import localforage from 'localforage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: ROUTE_BASE,
  routes: [
    {
      path: '/login',
      name: 'login',
      beforeEnter: async (to: any, from, next) => {
        const {
          query: { token },
        } = to;
        if (token) {
          await localforage.setItem('ignite_token', token);

          next({ name: 'services' });
        }
      },
    },
    {
      name: '',
      path: '/services',
      component: () => import('./components/Layout.vue'),
      children: [
        {
          name: 'services',
          path: '',
          component: () => import('./views/Service'),
        },
      ],
    },
  ],
});
