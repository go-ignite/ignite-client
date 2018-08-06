import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
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
