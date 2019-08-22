import Vue from 'vue';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import localforage from 'localforage';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;


localforage.config({
  name: 'ignite',
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
