<template>
  <v-app>
    <v-navigation-drawer fixed v-model="drawer" app>
      <v-list dense>
        <v-list-item v-for="nav in navs" @click="routeJump(nav.routeName)" :key="nav.routeName">
          <v-list-item-icon>
            <v-icon v-text="nav.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="nav.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="indigo" dark fixed app>
      <v-app-bar-nav-icon @click.stop="toggleMenu"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ navTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <div slot="activator" v-bind="attrs" v-on="on" class="profile_name">
            欢迎您，{{userInfo.name}}
            <v-icon>keyboard_arrow_down</v-icon>
          </div>
        </template>
        <v-list>
          <v-list-item @click="resetPassVis = true">
            <v-list-item-title>修改密码</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>退出登录</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <v-container fluid class="profile_container">
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer color="indigo" app inset class="profile_footer">
      <span class="white--text">&copy; 2018 ignite</span>
    </v-footer>
    <ResetPasswordDialog :visible.sync="resetPassVis"></ResetPasswordDialog>
  </v-app>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {State} from 'vuex-class'
import { default as localforage } from 'localforage';
import * as apis from '../apis/index';
import ResetPasswordDialog from './ResetPasswordDialog.vue';
import { LOGIN_PAGE } from '@/config';

@Component({
  components: {
    ResetPasswordDialog,
  },
})
export default class Profile extends Vue {
  @State('userInfo') userInfo: any;
  drawer: boolean = false;
  resetPassVis: boolean = false;
  navs = [
    {
      title: '我的服务',
      icon: 'cast',
      routeName: 'services',
    },
  ];

  get navTitle() {
    const navItem: any = this.navs.find((nav) => nav.routeName === this.$route.name);
    return navItem ? navItem.title : '';
  }

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
    location.href = LOGIN_PAGE;
  }

  changePassword() {}

  mouted() {}
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
.profile_name {
  display: flex;
  align-items: center;
}
</style>
  
