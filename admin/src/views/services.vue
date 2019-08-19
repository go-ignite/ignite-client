<template>
  <div class="nodes g_wrap">
      <t-c-r
        :tableData="tableData"
        :tableCols="tableCols"
        :pagination="pagination"
      >
        <div slot="operator" slot-scope="scope">
          <el-dropdown>
            <el-button type="primary" size="mini">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleDelete(scope.row)">删除服务</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </t-c-r>
  </div>
</template>

<script>
import request from '@/apis/request'
import TCR from '@/components/TableColumnRender.vue'


export default {
  components: {
    TCR,
  },

  data() {
    return {
      tableData: [],
      createNodeVis: false,
      isEdit: false,
      editId: null,
      pagination: {
        total: 0,
        size: 12,
      },
    }
  },

  computed: {
    tableCols() {
      const typeMap = {
        1: 'SS',
        2: 'SSR'
      }
      return [
        {
          raw: {
            label: '节点信息',
            prop: 'node_id',
          },
        },
        {
          raw: {
            label: '端口',
            prop: 'port',
          },
        },
        {
          raw: {
            label: '加密方法',
            prop: 'method',
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
            label: '状态',
            prop: 'status'
          },
        },
        {
          raw: {
            label: '操作',
          },
          slot: 'operator',
        },
      ]
    },
  },

  methods: {
    fetchNodes(page = 1) {
      request
        .get(`/api/admin/auth/services?page_index=${page}page_size=12`)
        .then((response) => {
          this.tableData = response
        })
    },

    handleDelete(item) {
      this.$confirm(`是否确定删除服务?`, '删除服务', {
        confirmButtonText: '删除服务',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          request
            .delete(`/api/admin/auth/services/${item.id}/`)
            .then((response) => {
              this.$message('服务已删除!')
              this.fetchNodes()
            })
            .catch(() => {
              this.$message('删除服务失败!')
            })
        })
    },

    pageChanged(value) {
      this.fetchNodes(value)
    },
  },

  async created() {
    this.fetchNodes()
  },
}
</script>

<style lang="less" scoped>
</style>
