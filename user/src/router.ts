import Vue from 'vue';
import Router from 'vue-router';
import { ROUTE_BASE } from './config';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: ROUTE_BASE,
  routes: [
    {
      path: '',
      component: () => import('./views/User/User.vue'),
      children: [
        {
          name: 'home',
          path: '/',
          component: () => import('./views/User/Home.vue'),
        },
      ],
    },
    {
      name: 'profile',
      path: '/profile',
      component: () => import('./views/Profile/Profile.vue'),
      redirect: {name: 'services'},
      children: [
        {
          name: 'services',
          path: 'services',
          component: () => import('./views/Profile/Services.vue'),
        },
      ],
    },
  ],
});
