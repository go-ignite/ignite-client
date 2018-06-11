<template>
  <div class="iadmin_login">
    <h1 class="title">管理登录</h1>
    <el-form>
      <el-form-item label="用户名">
        <el-input v-model="username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password" @keyup.enter.native="onLogin" type="password"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="onLogin" type="primary">登录</el-button>
  </div>
</template>

<script>
import request from '../apis/request'
import EventBus, { Event } from '../utils/EventBus'

export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    onLogin(event) {
      request
        .post('/api/admin/login', {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          localStorage.setItem('ignite_admin_token', response)
          EventBus.$emit(Event.LOGIN_SUCCESS)
          this.$router.push({ name: 'users' })
        })
    },
  },
  created() {
    if (localStorage.getItem('ignite_admin_token')) {
      EventBus.$emit(Event.LOGIN_SUCCESS)
      this.$router.push({
        name: 'users',
      })
    }
  }
}
</script>
