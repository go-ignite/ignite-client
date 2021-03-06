<template>
  <div class="nodes g_wrap">
    <el-button @click="createNodeVis = true" type="primary">创建节点</el-button>
    <t-c-r :tableData="tableData" :tableCols="tableCols">
      <template slot="operator" slot-scope="{ col, row }">
        <el-button size="mini" @click.native="jumpNode(row)">查看服务</el-button>
        <el-button size="mini" @click.native="editNode(row)">编辑</el-button>
        <el-button size="mini" @click.native="handleDelete(row)">删除</el-button>
      </template>
    </t-c-r>
    <el-dialog
      :visible.sync="createNodeVis"
      @close="handleClose"
      :title="dialogTitle"
      width="600px"
    >
      <el-form
        class="create-node-form"
        label-width="150px"
        label-position="right"
        :model="form"
        :rules="getRules"
        ref="form"
      >
        <el-form-item label="节点名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="节点连接地址" prop="request_address">
          <el-input :disabled="isEdit" v-model="form.request_address"></el-input>
          <el-tooltip placement="top" popper-class="help-popper">
            <i class="help-tip el-icon-warning-outline"></i>
            <div slot="content">
              <p>
                面板与节点的通信地址，格式为 ip:端口，单节点模式下，ip 一般为
                localhost，eg：localhost:4000
              </p>
              <p>
                如果面板与节点在同一网络，ip 可以配置为内网 ip 地址，若不在同一网络，ip 为节点公网
                ip 地址。
              </p>
            </div>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="用户访问地址" prop="connection_address">
          <el-input v-model="form.connection_address"></el-input>
          <el-tooltip
            content="用户通过该地址访问 ss/ssr 服务，一般为节点的公网 ip 地址。"
            placement="top"
            popper-class="help-popper"
          >
            <i class="help-tip el-icon-warning-outline"></i>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="端口范围" prop="port_range">
          <el-col :span="6">
            <el-input v-model.number="form.port_from" placeholder="起始端口"></el-input>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center;">-</el-col>
          <el-col :span="6">
            <el-input v-model.number="form.port_to" placeholder="结束端口"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.comment" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <template v-if="isEdit">
          <el-button type="primary" @click="handleUpdate">修改</el-button>
        </template>
        <template v-else>
          <el-button type="primary" @click="handleCreateDialog">创建</el-button>
        </template>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/apis/request'
import TCR from '@/components/TableColumnRender.vue'
import { getNodes, postNodes, putNodes, deleteNodes } from '../apis'

const FormInit = {
  name: '',
  request_address: '',
  connection_address: '',
  port_from: '',
  port_to: '',
  comment: '',
}

export default {
  components: {
    TCR,
  },

  data() {
    return {
      form: { ...FormInit },
      tableData: [],
      createNodeVis: false,
      isEdit: false,
      editId: null,
    }
  },

  computed: {
    getRules() {
      return {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        request_address: [{ required: true, message: '请输入节点连接地址', trigger: 'blur' }],
        connection_address: [{ required: true, message: '请输入用户访问地址', trigger: 'blur' }],
        port_range: [
          {
            validator: (_, value, callback, source, options) => {
              if (!this.form.port_from) {
                callback('请输入开始端口')
              } else if (!this.form.port_to) {
                callback('请输入结束端口')
              } else if (this.form.port_from >= this.form.port_to) {
                callback('开始端口号需小于结束端口')
              } else {
                callback()
              }
            },
          },
        ],
        // port: [{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }],
      }
    },
    tableCols() {
      return [
        {
          raw: {
            label: '节点名称',
            prop: 'name',
          },
        },
        {
          raw: {
            label: '节点连接地址',
            prop: 'request_address',
          },
        },
        {
          raw: {
            label: '用户访问地址',
            prop: 'connection_address',
          },
        },
        {
          raw: {
            label: '端口范围',
          },
          formatter: (data, row) => `${row.port_from} ~ ${row.port_to}`,
        },
        {
          raw: {
            label: '备注',
            prop: 'comment',
          },
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

    dialogTitle() {
      return this.isEdit ? '编辑节点' : '创建节点'
    },
  },

  methods: {
    async fetchNodes(page = 1) {
      const data = await getNodes({
        page_index: page,
        page_size: 10,
      })
      this.tableData = data
    },

    async handleCreateDialog() {
      await this.$refs.form.validate()
      // Vaidate Dialog
      await postNodes(this.form)
      this.$message('创建成功')
      this.fetchNodes()
      this.createNodeVis = false
    },

    async handleDelete({ id }) {
      await deleteNodes(null, { urlParam: { id } })
      this.$message('删除成功')
      this.createNodeVis = false
      this.fetchNodes()
    },

    async handleUpdate() {
      await this.$refs.form.validate()
      await putNodes(this.form, { urlParam: { id: this.editId } })
      this.$message('更新成功')
      this.createNodeVis = false
      this.fetchNodes()
    },

    editNode(row) {
      Object.keys(this.form).forEach((key) => {
        this.form[key] = row[key]
      })
      this.editId = row.id
      this.isEdit = true
      this.createNodeVis = true
    },

    handleClose() {
      this.form = { ...FormInit }
      this.isEdit = false
      this.editId = null
    },

    jumpNode({ id }) {
      this.$router.push({
        name: 'services',
        query: {
          node_id: id,
        },
      })
    },
  },

  async created() {
    this.fetchNodes()
  },
}
</script>

<style lang="less" scoped>
.create-node-form {
  /deep/ .el-form-item__label {
    padding-right: 30px;
  }
  .help-tip {
    position: absolute;
    left: -20px;
    top: 13px;
    bottom: 0;
    margin: auto;
  }
}
/deep/ .help-popper {
  max-width: 500px;
}
</style>
