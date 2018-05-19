<template>
  <v-container justify-center  transition="scale-transition">
    <div class="home">
      <img src="../../assets/logo.png">
      <h1 class="home_title">ignite&nbsp;<span>v1</span></h1>
      <h2>A dockernized service for <span>shadowsocks</span>.</h2>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    Login: () => import('./Login.vue'),
  },
})
export default class Home extends Vue {}
</script>
<style lang="less">
.home {
  text-align: center;
}
.home_title {
  font-size: 20px;
}

</style>
