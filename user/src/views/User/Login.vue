<template>
  <div class="login">
    <v-container justify-center  transition="scale-transition">
      <h1>用户登录</h1>
      <v-form>
        <v-text-field
          v-model="username"
          label="用户名"
          require
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="密码"
          required
        ></v-text-field>
      </v-form>
      <div class="login_footer">
        <v-btn
          @click="login"
        >登录</v-btn>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as apis from "../../apis/index"

@Component
export default class Login extends Vue {
  username: string = '';
  password: string = '';

  login() {
    try {
      apis.postUserLogin({
        username: this.username,
        password: this.password,
      })
        .then(() => {
          console.log('ok')
        })
        .catch(() => {
          console.log('error')
        })
      // this.$router.push({ name: 'profile' });
    } catch(e) {

    }
  }
}
</script>

<style lang="less">
.login_footer {
  text-align: left;
}
</style>
