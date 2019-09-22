<template>
  <div class="iadmin_usertable g_wrap">
    <el-dialog
      @close="cancelResetPassword"
      :visible.sync="showModal"
      title="重置密码"
      width="400px"
    >
      <el-form
        :model="form"
        ref="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="输入新的密码" prop="new_password">
          <el-input type="password" v-model="form.new_password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button type="primary" @click="doResetPassword">提交</el-button>
      </span>
    </el-dialog>
    <t-c-r :tableData="statusList" :tableCols="tableCols" :pagination="pagination">
      <template slot="operator" slot-scope="{ col, row }">
        <el-button size="mini" @click.native="handleResetPassword(row)">重置密码</el-button>
        <el-button size="mini" @click.native="handleViewService(row)">查看服务</el-button>
        <el-button size="mini" @click.native="handleRemoveService(row)">删除用户</el-button>
      </template>
    </t-c-r>
  </div>
</template>

<script>
import format from 'date-fns/format'
import TCR from '@/components/TableColumnRender.vue'
import RenewForm from '@/components/RenewForm.vue'
import request from '@/apis/request'
import { getAccounts, putResetPassword, deleteAccounts } from '../apis'

export default {
  computed: {
    tableCols() {
      return [
        {
          raw: {
            label: '用户名',
            prop: 'name',
          },
        },
        {
          raw: {
            label: '每月流量上限',
            prop: 'package_limit',
          },
          formatter: (v) => `${v} G`,
        },
        {
          raw: {
            label: '当月已使用流量',
            prop: 'month_traffic_used',
          },
          formatter: (v) => `${v * 1024 * 1024} M`,
        },
        {
          raw: {
            label: '最近统计时间',
            prop: 'last_stats_time',
          },
          formatter: (v) => this.dateFilter(v),
        },
        {
          raw: {
            label: '创建时间',
            prop: 'created_at',
          },
          formatter: (v) => this.dateFilter(v),
        },
        {
          raw: {
            label: '操作',
            width: '300px',
          },
          slot: 'operator',
        },
      ]
    },
  },
  data() {
    return {
      // FIX PAGE INDEX
      pagination: {
        total: 0,
        size: 12,
      },
      statusList: [],
      isSimple: false,
      showModal: false,
      selectUser: {},
      form: {
        new_password: '',
      },
      rules: {
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
      },
    }
  },
  filters: {
    bandwidth: (value) => {
      return value.toFixed(2).toString() + ' GB'
    },
    dateFilter: (value) => {
      return format(value, 'YYYY-MM-DD')
    },
  },
  methods: {
    pageChanged(value) {
      this.fetchData(value)
    },
    async fetchData(index = 1) {
      const response = await getAccounts({
        page_index: index.toString(),
        page_size: this.pagination.size,
      })
      this.statusList = response.list
      this.pagination.total = response.total
    },
    dateFilter: (value) => {
      return format(value, 'YYYY-MM-DD')
    },
    bandwidth: (value) => {
      return value.toFixed(2).toString() + ' GB'
    },
    statusFormat(v) {
      if (v === 0) return '未创建'
      if (v === 1) return '运行中'
      return '已停止'
    },
    handleResetPassword(item) {
      this.selectUser = item
      this.showModal = true
    },
    cancelResetPassword() {
      this.form.new_password = ''
      this.selectUser = {}
      this.showModal = false
    },
    async doResetPassword() {
      await this.$refs.ruleForm.validate()
      await putResetPassword(this.form, {
        urlParam: {
          id: this.selectUser.id,
        },
      })
      this.$message.success('重置密码成功')
      this.cancelResetPassword()
    },
    handleViewService({ id }) {
      this.$router.push({
        name: 'services',
        query: {
          user_id: id,
        },
      })
    },
    async handleRemoveService({ id, name }) {
      await this.$confirm(`是否确认删除用户 ${name} ?`, '提示', {
        title: '删除用户',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      await deleteAccounts(null, { urlParam: { id } })
      const index = this.statusList.findIndex((e) => e.id === id)
      if (index > -1) {
        this.statusList.splice(index, 1)
        this.$message.success('用户已删除')
        this.fetchData()
      }
    },
  },
  created() {
    this.fetchData()
  },
  components: {
    TCR,
  },
}
</script>

<style scoped>
.table {
  margin: 80px auto 20px auto;
  width: 100%;
}

.table th,
.table td {
  text-align: center;
}
</style>
