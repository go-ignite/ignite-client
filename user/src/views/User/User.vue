<template>
  <v-app>
    <div id="nav">
      <router-link :to="{name: 'home'}">Home</router-link> |
      <router-link :to="{name: 'login'}">login</router-link> |
      <router-link :to="{name: 'register'}">register</router-link>
    </div>
    <transition name="router-anim">
      <router-view />
    </transition>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { default as localforage } from 'localforage'

@Component
export default class Login extends Vue {
  async mounted() {
    const token = await localforage.getItem('ignite_token')
    if (token) {
      this.$router.push({ name: 'profile' });
    }
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
  animation: coming .5s;
  animation-delay: .5s;
  opacity: 0;
}
.router-anim-leave-active {
  animation: going .5s;
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
