<template>
    <div class="iadmin_codetable g_wrap">
        <el-button @click="showModal = true" type="primary">批量生成</el-button>
        <t-c-r
          :tableData="codeList"
          :tableCols="tableCols"
          :pagination="pagination"
          @page-change="pageChanged"
        >
        </t-c-r>
        <el-dialog
          :visible.sync="showModal"
          title="批量生成邀请码"
          width="360">
          <gen-invite-code @success="genCodeSuccess" @closeModal="showModal = false"></gen-invite-code>
        </el-dialog>
    </div>
</template>

<script>
import TCR from '@/components/TableColumnRender.vue'
import GenInviteCode from '@/components/GenInviteCode.vue'
import request from '../apis/request'

export default {
  computed: {
    tableCols() {
      const removeFn = this.remove
      return [
        {
          raw: {
            label: '邀请码',
            prop: 'InviteCode',
          },
        },
        {
          raw: {
            label: '创建时间',
            prop: 'Created',
          },
          formatter: (v) => this.dateFilter(v),
        },
        {
          raw: {
            label: '有效期限',
            prop: 'AvailableLimit',
          },
          formatter: (v) => `${v}个月`,
        },
        {
          raw: {
            label: '总流量',
            prop: 'PackageLimit',
          },
          formatter: (v) => `${v} GB`,
        },
        {
          raw: {
            label: '操作',
          },
          render: {
            props: {
              row: {
                type: Object,
                default: () => ({}),
              },
            },
            render() {
              return (
                <el-button
                  onClick={() => removeFn(this.row)}
                  type="danger"
                  icon="el-icon-delete"
                  circle
                />
              )
            },
          },
        },
      ]
    },
  },
  data() {
    return {
      codeList: [],
      pagination: {
        total: 0,
        size: 12,
        index: 1,
      },
      order: '',
      size: 'is-small',
      isSimple: false,
      showModal: false,
    }
  },
  filters: {
    dateFilter: (value) => {
      return value.split('T')[0]
    },
  },
  methods: {
    fetchCode(index = 1) {
      request
        .get(`/api/admin/auth/code_list?pageIndex=${index}&pageSize=${this.pagination.size}`)
        .then((response) => {
          this.codeList = response.data
          this.pagination.total = response.total
        })
    },
    remove(item, index) {
      // TODO: FIX remove effect page
      this.$confirm('是否确定删除邀请码?', '提示', {
        title: '删除邀请码',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          const removeId = item.Id
          request
            .put(`/api/admin/auth/${removeId}/remove`)
            .then((response) => {
              const index = this.codeList.findIndex((e) => e.Id === removeId)
              if (index > -1) {
                this.codeList.splice(index, 1)
                this.$message.success('邀请码已删除')
                this.removePaginationCheck()
                this.fetchCode(this.pagination.index)
              }
            })
            .catch(() => {
              this.$message.error('删除邀请码失败!')
            })
        })
        .catch(() => {})
    },
    pageChanged(value) {
      this.pagination.index = value
      this.fetchCode(value)
    },
    dateFilter: (value) => {
      return value.split('T')[0]
    },
    removePaginationCheck() {
      const { total, size, index } = this.pagination
      if (index === 1 || !index) return
      const limit = size * (index - 1) + 1
      if (total === limit) {
        this.pagination.index -= 1
      }
    },
    genCodeSuccess() {
      this.pagination.index = 1
      this.fetchCode()
    },
  },
  created() {
    this.fetchCode()
  },
  components: {
    TCR,
    GenInviteCode,
  },
}
</script>

<style scoped>
.batch {
  margin: 80px auto 0px auto;
}

.table {
  margin: 20px auto 20px auto;
}

.table th,
.table td {
  text-align: center;
}

.pagination {
  margin: 20px auto 80px auto;
}
</style>
