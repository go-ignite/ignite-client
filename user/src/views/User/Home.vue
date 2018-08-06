<template>
  <v-container justify-center  transition="scale-transition">
    <div class="home">
      <img src="../../assets/logo.png">
      <h1 class="home_title">ignite&nbsp;<span>v2</span></h1>
      <h2 class="home_desc">A dockernized service for <span>shadowsocks</span>.</h2>
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
  text-align: left;
}
.home_title {
  font-size: 40px;
}
.home_desc {
  margin-top: 10px;
  font-size: 22px;
}

</style>
