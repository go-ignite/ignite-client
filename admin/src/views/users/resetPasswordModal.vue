<template>
  <el-dialog @close="cancelResetPassword" :visible="visible" title="重置密码" width="400px">
    <el-form :model="form" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="输入新的密码" prop="new_password">
        <el-input type="password" v-model="form.new_password" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="primary" @click="doResetPassword">提交</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { putResetPassword } from '../../apis'
const rules = {
  new_password: [
    {
      trigger: 'blur',
      validator: (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入密码'))
        }
        if (value.length < 6 || value.length > 12) {
          callback(new Error('请输入长度为 6 ~ 12 位的密码'))
        }
        callback()
      },
    },
  ],
}

export default {
  name: 'ResetPasswordModal',
  data() {
    return {
      form: {
        new_password: '',
      },
      rules
    }
  },
  props: {
    visible: Boolean,
    user: Object,
  },
  methods: {
    cancelResetPassword() {
      this.form.new_password = ''
      this.$emit('update:visible', false)
    },
    async doResetPassword() {
      await this.$refs.ruleForm.validate()
      await putResetPassword(this.form, {
        urlParam: {
          id: this.user.id,
        },
      })
      this.$message.success('重置密码成功')
      this.cancelResetPassword()
    },
  },
}
</script>
