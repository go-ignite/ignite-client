<template>
  <div class="iadmin_usertable g_wrap">
    <t-c-r :tableData="statusList" :tableCols="tableCols" :pagination="pagination">
      <template slot="operator" slot-scope="{ col, row }">
        <el-button size="mini" @click.native="handleResetPassword(row)">重置密码</el-button>
        <el-button size="mini" @click.native="handleViewService(row)">查看服务</el-button>
        <el-button size="mini" @click.native="handleRemoveService(row)">删除用户</el-button>
      </template>
    </t-c-r>
    <reset-password-modal :user="selectUser" :visible.sync="visResetPassword"></reset-password-modal>
  </div>
</template>

<script>
import format from 'date-fns/format'
import TCR from '@/components/TableColumnRender.vue'
import RenewForm from '@/components/RenewForm.vue'
import request from '@/apis/request'
import { getAccounts, deleteAccounts } from '../apis'
import ResetPasswordModal from './users/resetPasswordModal'

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
      visResetPassword: false,
      selectUser: {},
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
    handleResetPassword(item) {
      this.selectUser = item
      this.visResetPassword = true
    },
  },
  created() {
    this.fetchData()
  },
  components: {
    TCR,
    ResetPasswordModal
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
