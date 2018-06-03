<template>
  <div class="register">
    <v-container justify-center  transition="scale-transition">
      <h1>用户注册</h1>
      <v-form ref="register">
        <v-text-field
          v-for="field in formFields"
          :key="field.key"
          :label="field.label"
          :rules="field.rules || []"
          :type="field.type || 'text'"
          v-model="formData[field.key]"
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
import { renameKey } from '@/utils/helper.ts';
import * as apis from '../../apis';

const RenameKeyMap = {
  inviteCode: 'invite-code',
  confirmPassword: 'confirm-password',
};

@Component
export default class Register extends Vue {
  snackbar: boolean = false;
  jumpId: any = 0;

  formData = {
    inviteCode: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  formFields: any = [
    {
      key: 'inviteCode',
      label: '邀请码',
      rules: [(v: any) => !!v || '请填写邀请码'],
    },
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
    {
      key: 'confirmPassword',
      type: 'password',
      label: '确认密码',
      rules: [(v: any) => !!v || '请再输入一次密码'],
    }
  ]

  async submit() {
    await (this.$refs.register as any).validate()
    const postData: {[index: string]: string;} = renameKey(this.formData, RenameKeyMap)
    const postFormData: any = new FormData();
    Object.keys(postData).forEach(key => {
      postFormData.set(key, postData[key])
    })
    const resp  = await apis.postUserSignup(postFormData);

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
