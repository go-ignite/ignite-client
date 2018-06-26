<template>
  <v-app class="user">
    <div class="view">
      <transition name="router-anim">
        <component :is="`${current}-component`"></component>
      </transition>
    </div>
    <div class="tshirt" :class="current"></div>
    <v-bottom-nav :value="true" :active.sync="current" absolute :color="barColor">
      <v-btn flat :color="btnColor" value="home">
        <span>首页</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn flat :color="btnColor" value="login">
        <span>登录</span>
        <v-icon>send</v-icon>
      </v-btn>
      <v-btn flat :color="btnColor" value="register">
        <span>激活</span>
        <v-icon>weekend</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { default as localforage } from 'localforage'

@Component({
  components: {
    homeComponent: () => import('./Home.vue'),
    loginComponent: () => import('./Login.vue'),
    registerComponent: () => import('./Register.vue'),
  }
})
export default class Login extends Vue {
  current: string = 'home'

  get barColor(): string {
    return this.current === 'home' ? 'white' : 'bluebar'
  }

  get btnColor(): string {
    return this.current === 'home' ? 'grey' : 'white'
  }

  async mounted() {
    const token = await localforage.getItem('ignite_token')
    if (token) {
      this.$router.push({ name: 'profile' });
    }
  }
}

</script>

<style lang="less" scoped>
.bluebar {
  background-color: #2f54eb;
}
.user {
  overflow: hidden;
}
.view {
  height: 50vh;
  margin-top: 5vh;
  flex: 1 1 auto;
  overflow: hidden;
}
.tshirt {
  transition: all 500ms;
  width: 100%;
  height: 30vh;  
  background-color: #2f54eb;
  flex: 0 0 auto;
  position: relative;
  &::before {
    transition-delay: 500ms;
    content: '';
    height: 150%;
    position: absolute;
    top: -50%;
    width: 110%;
    transform: rotate(-5deg);
    background-color: #2f54eb;
  }
}
.tshirt.login,
.tshirt.register {
  height: 0;
  &::before {
    content: none;
  }
}
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
