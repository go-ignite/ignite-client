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
        {
          name: 'login',
          path: 'login',
          component: () => import('./views/User/Login.vue'),
        },
        {
          name: 'register',
          path: 'register',
          component: () => import('./views/User/Register.vue'),
        },
      ],
    },
    {
      name: 'profile',
      path: '/profile',
      component: () => import('./views/Profile/Profile.vue'),
      redirect: {name: 'server'},
      children: [
        {
          name: 'server',
          path: 'server',
          component: () => import('./views/Profile/Server.vue'),
        },
      ],
    },
  ],
});
