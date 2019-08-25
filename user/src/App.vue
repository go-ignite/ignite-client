<template>
  <div>
    <snack-bar></snack-bar>
    <global-loading></global-loading>
    <router-view />
  </div>
</template>

<script lang="ts">
import eventsource from 'eventsource';
import { Component, Vue } from 'vue-property-decorator';
import localforage from 'localforage';
import SnackBar from '@/components/SnackBar.vue';
import GlobalLoading from '@/components/GlobalLoading.vue';
import types from '@/store/types';
import { Action } from 'vuex-class';
import { fetchNodes } from './apis';

@Component({
  components: {
    SnackBar,
    GlobalLoading,
  },
})
export default class App extends Vue {
  @Action(types.FETCH_SERVICES_OPTIONS) fetchServicesOptions: any;
  @Action(types.NODES_HEART) fetchNodesHeart: any;

  ws: any = null;

  async mounted() {
    this.fetchServicesOptions();
    const Authorization = await localforage.getItem('ignite_token');
    if (!Authorization) return;
    const sse = new eventsource('/api/user/sync', {
      headers: {
        Authorization,
      },
      https: { rejectUnauthorized: false },
    });
    sse.onopen = () => {
      console.log('打开连接');
    };
    sse.onerror = (e) => {
      console.log('发生错误', e);
    };
    sse.close = () => {
      console.log('连接关闭');
    };
    sse.addEventListener('user_sync', (res: any) => {
      const data = JSON.parse(res.data)[0];
      console.log(data);
      this.fetchNodesHeart(data);
    });
    this.ws = sse;
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  text-align: center;
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.router-anim-enter-active {
  animation: coming 0.5s;
  animation-delay: 0.5s;
  opacity: 0;
}
.router-anim-leave-active {
  animation: going 0.5s;
}

@keyframes going {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50px);
    opacity: 0;
    display: none;
  }
}
@keyframes coming {
  from {
    transform: translateX(50px);
    opacity: 0;
    display: none;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
