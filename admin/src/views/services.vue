<template>
  <div class="iadmin_usertable g_wrap">
    <div>
      <el-form :inline="true" :model="filter" class="demo-form-inline">
        <el-form-item label="用户">
          <el-select v-model="filter.user_id" placeholder="选择用户" clearable>
            <el-option
              v-for="user in users"
              :key="user.id"
              :label="user.name"
              :value="user.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="节点">
          <el-select v-model="filter.node_id" placeholder="选择节点" clearable>
            <el-option
              v-for="node in nodes"
              :key="node.id"
              :label="node.name"
              :value="node.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clearFilter">清除</el-button>
          <el-button type="primary" @click="fetchData(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <t-c-r :tableData="serviceList" :tableCols="tableCols" :pagination="pagination">
      <!-- <template slot="operator" slot-scope="{ col, row }">
        <el-dropdown>
          <el-button type="primary" size="mini">
            操作<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="row.Status !== 1" @click.native="start(row)"
              >启动服务</el-dropdown-item
            >
            <el-dropdown-item v-else @click.native="stop(row)">停止服务</el-dropdown-item>
            <el-dropdown-item @click.native="reset(row)" divided>重置流量</el-dropdown-item>
            <el-dropdown-item @click.native="renew(row)">服务续期</el-dropdown-item>
            <el-dropdown-item @click.native="destroy(row)">一键销毁</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template> -->
    </t-c-r>
    <el-dialog @close="cancelRenew" :visible.sync="showModal" title="服务续期" width="380">
      <renew-form
        @renew-success="fetchData"
        :showModal="showModal"
        :selectUser="selectUser"
        :cancel="cancelRenew"
      ></renew-form>
    </el-dialog>
  </div>
</template>

<script>
import format from 'date-fns/format'
import TCR from '@/components/TableColumnRender.vue'
import RenewForm from '@/components/RenewForm.vue'
import request from '@/apis/request'
import { getServices, getAccounts, getNodes } from '../apis'

const FilterInit = {
  node_id: '',
  user_id: '',
}

export default {
  computed: {
    tableCols() {
      return [
        {
          raw: {
            label: '创建时间',
            prop: 'created_at',
          },
          formatter: (v) => this.dateFilter(v),
        },
        {
          raw: {
            label: '服务类型',
            prop: 'type',
          },
        },
        {
          raw: {
            label: '端口号',
            prop: 'port',
          },
        },
        {
          raw: {
            label: '密码',
            prop: 'password',
          },
        },
        {
          raw: {
            label: '加密方式',
            prop: 'encryption_method',
          },
        },
        {
          raw: {
            label: '二维码url',
            prop: 'url',
          },
        },
        // {
        //   raw: {
        //     label: '',
        //     width: '150px',
        //   },
        //   slot: 'operator',
        // },
      ]
    },
  },
  data() {
    return {
      pagination: {
        total: 0,
        size: 12,
      },
      filter: { ...FilterInit },
      serviceList: [],
      isSimple: false,
      showModal: false,
      selectUser: {},
      nodes: [],
      users: [],
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
    stop(item) {
      const index = this.serviceList.findIndex((e) => e.Id === item.Id)
      this.$confirm(`是否确定停止用户${item.Username}的服务?`, '停止服务', {
        confirmButtonText: '停止服务',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        request
          .put('/api/admin/auth/' + item.Id.toString() + '/stop')
          .then((response) => {
            this.serviceList[index].Status = 2
            this.$message('用户帐号对应服务已停止!')
          })
          .catch(() => {
            this.$message('停止服务失败!')
          })
      })
    },
    start(item) {
      const index = this.serviceList.findIndex((e) => e.Id === item.Id)
      this.$confirm(`是否确定启动用户${item.Username}的服务?`, '启动服务', {
        confirmButtonText: '启动服务',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        request
          .put('/api/admin/auth/' + item.Id.toString() + '/start')
          .then((response) => {
            this.serviceList[index].Status = 1
            this.$message('用户帐号对应服务已成功启动!')
          })
          .catch(() => {
            this.$message.error('启动服务失败')
          })
      })
    },
    reset(item) {
      const index = this.serviceList.findIndex((e) => e.Id === item.Id)
      this.$confirm(`是否确定重置用户账号${item.Username}的本月流量?`, '重置流量', {
        confirmButtonText: '重置',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        request
          .put('/api/admin/auth/' + item.Id.toString() + '/reset')
          .then((response) => {
            this.serviceList[index].PackageUsed = 0
            this.$message('用户帐号本月流量已重置!')
          })
          .catch(() => {
            this.$message('重置用户帐号本月流量失败!')
          })
      })
    },
    destroy(item) {
      const index = this.serviceList.findIndex((e) => e.Id === item.Id)
      this.$confirm(`是否确定销毁用户账号${item.Username}?该操作将不可逆转`, '销毁账号', {
        confirmButtonText: '销毁账号',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        request
          .put('/api/admin/auth/' + item.Id.toString() + '/destroy')
          .then((response) => {
            this.serviceList.splice(index, 1)
            this.$message('用户帐号已销毁!')
          })
          .catch(() => {
            this.$message('销毁用户帐号失败!')
          })
      })
    },
    renew(item) {
      this.selectUser = item
      this.showModal = true
    },
    cancelRenew() {
      this.selectUser = {}
      this.showModal = false
    },
    async fetchData(index = 1) {
      const response = await getServices({
        page_index: index.toString(),
        page_size: this.pagination.size,
        ...this.filter,
      })
      this.serviceList = response.list
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
    clearFilter() {
      this.filter = { ...FilterInit }
      this.fetchData()
    },
  },
  async created() {
    this.filter = {
      ...this.$route.query,
    }
    const { list: users } = await getAccounts({
      page_index: 1,
      page_size: 999,
    })
    this.users = users
    this.nodes = await getNodes()
    this.fetchData()
  },
  components: {
    RenewForm,
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
