<template>
  <v-app>
    <v-navigation-drawer
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile
          v-for="nav in navs"
          @click="routeJump(nav.routeName)"
          :key="nav.routeName">
          <v-list-tile-action>
            <v-icon>{{nav.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{nav.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="toggleMenu"></v-toolbar-side-icon>
      <v-toolbar-title>我的服务</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <v-icon slot="activator">account_circle</v-icon>
        <v-list>
          <v-list-tile @click="logout">
            <v-list-tile-title>退出登录</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-content>
      <v-container fluid class="profile_container">
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer color="indigo" app inset class="profile_footer">
      <span class="white--text">&copy; 2018 ignite</span>
    </v-footer>
  </v-app>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { default as localforage } from 'localforage';
import { Action } from 'vuex-class';
import types from '@/store/types';
import * as apis from '../../apis/index';

@Component
export default class Profile extends Vue {
  @Action(types.GET_SERVICE_CONFIG) getServiceConfig: any;
  @Action(types.WS_NODES_HEART) patchNodesHeart: any;

  ws: any = null;
  drawer: boolean = false;
  aaa: string = '';
  navs = [
    {
      title: '我的服务',
      icon: 'cast',
      routeName: 'profile',
    },
  ];

  toggleMenu() {
    this.drawer = !this.drawer;
  }

  routeJump(name: string) {
    this.$router.push({
      name,
    });
    this.drawer = false;
  }

  logout() {
    localforage.removeItem('ignite_token');
    this.$router.push({
      name: 'home',
    });
  }

  async mounted() {
    this.getServiceConfig();
    const token = await localforage.getItem('ignite_token');
    this.ws = new WebSocket('ws://localhost:5000/api/ws/nodes');
    this.ws.onopen = () => {
      this.ws.send(token);
    };
    this.ws.onerror = () => {
      this.ws = new WebSocket('ws://localhost:5000/api/ws/nodes');
      alert('连接错误');
    };
    this.ws.onclose = () => {
      this.ws = new WebSocket('ws://localhost:5000/api/ws/nodes');
      alert('连接关闭');
    };
    this.ws.onmessage = (event: any) => {
      this.patchNodesHeart(JSON.parse(event.data) || {});
    };
  }
}
</script>
  
<style lang="less">
.profile_container {
  display: flex;
  height: 100%;
}
.profile_footer {
  padding-left: 10px;
}
</style>
  
