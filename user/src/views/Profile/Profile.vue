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

@Component
export default class Profile extends Vue {
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
  
