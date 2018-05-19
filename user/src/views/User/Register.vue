<template>
  <div class="register">
    <v-container justify-center  transition="scale-transition">
      <h1>用户注册</h1>
      <v-form>
        <v-text-field
          v-model="inviteCode"
          label="邀请码"
          require
        ></v-text-field>
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
        <v-text-field
          v-model="confirmPassword"
          label="确认密码"
          required
        ></v-text-field>
      </v-form>
      <div class="register_footer">
        <v-btn
          @click="submit"
        >注册</v-btn>
      </div>
      <v-snackbar
        :timeout="2000"
        top
        v-model="snackbar"
      >
        创建成功
      </v-snackbar>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as apis from '../../apis';

@Component
export default class Register extends Vue {
  inviteCode: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  snackbar: boolean = false;
  jumpId: any = 0;

  async submit() {
    debugger
    await apis.postUserSignup({
      'invite-code': this.inviteCode,
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword
    })
    this.snackbar = true;
    this.jumpId = setTimeout(() => {
      this.$router.push({
        name: 'login',
      });
    }, 2000);
  }

  beforeDestroy() {
    clearTimeout(this.jumpId);
  }
}
</script>

<style lang="less">
.register_footer {
  text-align: left;
}
</style>
