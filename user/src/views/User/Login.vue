<template>
  <div class="login">
    <v-container justify-center transition="scale-transition">
      <v-flex md8 offset-md2>
        <h1>用户登录</h1>
        <v-form ref="login">
          <v-text-field
            v-for="field in formFields"
            v-model="formData[field.key]"
            :key="field.key"
            :label="field.label"
            :rules="field.rules || []"
            :type="field.type || 'text'"
            required
          ></v-text-field>
          <v-checkbox v-model="isAdmin" label="管理员登陆"></v-checkbox>
        </v-form>
        <div class="login_footer">
          <v-btn color="indigo white--text" @click="login">登录</v-btn>
        </div>
      </v-flex>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EventBus, { Event } from '@/utils/EventBus';
import { default as localforage } from 'localforage';
import * as apis from '../../apis/index';
import * as config from '../../config';

@Component
export default class Login extends Vue {
  isAdmin: boolean = false;
  formData: apis.LoginPayload = {
    username: '',
    password: '',
  };

  formFields = [
    {
      key: 'username',
      label: '用户名',
      rules: [(v: any) => !!v || '请填写用户名'],
    },
    {
      key: 'password',
      label: '密码',
      type: 'password',
      rules: [(v: any) => !!v || '请填写密码'],
    },
  ];

  async login() {
    await (this.$refs.login as any).validate();

    const postFormData: any = new FormData();
    postFormData.set('username', this.formData.username);
    postFormData.set('password', this.formData.password);

    if (this.isAdmin) {
      const resp: any = await apis.postAdminLogin(this.formData);
      await localforage.setItem('ignite_token', resp);
      location.href = `${config.ADMIN_LOGIN}?token=${resp.token}`;
    } else {
      const resp = await apis.postUserLogin(postFormData);

      await localforage.setItem('ignite_token', resp);
      this.$router.push({ name: 'profile' });
    }
  }
}
</script>

<style lang="less" scoped>
.login_footer {
  text-align: left;
}
</style>
