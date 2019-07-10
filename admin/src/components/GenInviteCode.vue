<template>
  <div class="modal-card">
    <el-form  label-width="100px" label-position="left"	>
      <el-form-item label="数量">
        <el-input
          v-model.number="amount"
          placeholder="输入邀请码数量"
          type="number"
          min="1"
          max="100"
          required
        >
        </el-input>
      </el-form-item>
      <el-form-item label="流量（GB）">
        <el-input
          v-model.number="limit"
          placeholder="输入月流量"
          type="number"
          min="1"
          max="999999"
          required
        >
        </el-input>
      </el-form-item>
      <el-form-item label="有效期至">
        <div>
          <el-date-picker v-model="expiredAt" type="date" placeholder="选择日期"> </el-date-picker>
        </div>
      </el-form-item>
    </el-form>
    <div class="dialog-footer">
      <el-button @click="$emit('closeModal')">关闭</el-button>
      <el-button type="primary" @click="onSubmit">批量生成</el-button>
    </div>

  </div>
</template>

<script>
import request from '../apis/request'
import { postCodes } from '../apis'

export default {
  data() {
    return {
      amount: 1,
      limit: 1,
      expiredAt: null,
    }
  },
  methods: {
    async onSubmit() {
      try {
        await postCodes({
          amount: this.amount,
          limit: this.limit,
          expired_at: this.expiredAt,
        })
        this.$message.success('生成邀请码成功!')
        this.$emit('success')
        this.$emit('closeModal')
      } catch (error) {
        this.$message.error('生成邀请码失败!')
      }
    },
  },
}
</script>

<style scoped>
.modal-card {
  margin: 0 auto;
  width: auto;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
