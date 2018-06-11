<template>
  <div class="g_wrap">
    <h1>节点管理</h1>
  </div>
</template>

<script>
import request from '@/apis/request'

export default {
  async created() {
    const servers = await request.get('/api/admin/auth/nodes')
    console.log(servers)
  },
}
</script>
