<template>
  <div class="iadmin_codetable g_wrap">
    <el-button @click="showModal = true" type="primary">批量生成</el-button>
    <el-button @click="handleClearExpired" type="info">清理过期邀请码</el-button>
    <t-c-r
      :tableData="codeList"
      :tableCols="tableCols"
      :pagination="pagination"
      @page-change="pageChanged"
    >
    </t-c-r>
    <el-dialog :visible.sync="showModal" title="批量生成邀请码" width="360">
      <gen-invite-code @success="genCodeSuccess" @closeModal="showModal = false"></gen-invite-code>
    </el-dialog>
  </div>
</template>

<script>
import TCR from '@/components/TableColumnRender.vue'
import GenInviteCode from '@/components/GenInviteCode.vue'
import { format } from 'date-fns'
import request from '../apis/request'
import { getCodes, postCodes, deleteCodes, postCodesExpired } from '../apis'

export default {
  computed: {
    tableCols() {
      const removeFn = this.remove
      return [
        {
          raw: {
            label: '邀请码',
            prop: 'invite_code',
          },
        },
        {
          raw: {
            label: '创建时间',
            prop: 'created_at',
          },
          formatter: (v) => `${format(v, 'YYYY-MM-DD')}`,
        },
        {
          raw: {
            label: '过期时间',
            prop: 'expired_at',
          },
          formatter: (v) => `${format(v, 'YYYY-MM-DD')}`,
        },
        {
          raw: {
            label: '总流量',
            prop: 'limit',
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
    async fetchCode(index = 1) {
      const response = await getCodes({
        page_index: index,
        page_size: this.pagination.size,
      })
      this.codeList = response.list
      this.pagination.total = response.total
    },
    remove(item, index) {
      // TODO: FIX remove effect page
      this.$confirm('是否确定删除邀请码?', '提示', {
        title: '删除邀请码',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await deleteCodes(null, { urlParam: { id: item.id } })
          const index = this.codeList.findIndex((e) => e.id === item.id)
          if (index > -1) {
            this.codeList.splice(index, 1)
            this.$message.success('邀请码已删除')
            this.removePaginationCheck()
            this.fetchCode(this.pagination.index)
          }
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
    async handleClearExpired() {
      await this.$confirm('是否清除所有过期邀请码?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      this.pagination.index = 1
      await postCodesExpired()
      await this.fetchCode()
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
