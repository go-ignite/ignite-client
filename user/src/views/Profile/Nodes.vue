<template>
  <div class="detail">
    <v-data-table :headers="headers" :items="nodes" hide-actions class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.connection_address }}</td>
        <td>{{ props.item.request_address }}</td>
        <td>{{ props.item.port_from }} ~ {{ props.item.port_to }}</td>
        <td>{{ props.item.comment }}</td>
      </template>
    </v-data-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';
import { StateType } from '@/store/state';
import serviceCreate from '@/components/ServiceCreate.vue';
import { deleteServices } from '@/apis';
import EventBus, { Event } from '@/utils/EventBus';

@Component({
  components: {
    serviceCreate,
  },
})
export default class Services extends Vue {
  @State('services') services: any;
  @State('nodesHeart') nodesHeart: any;
  // @Action('fetchNodes') fetchNodes: any;
  @Action('fetchServices') fetchServices: any;

  @Getter('avaliableNodes') avaliableNodes: any;

  typeMap = {
    1: 'SS',
    2: 'SSR',
  };

  servers: object[] = [{}];
  addServerDialogVis: boolean = false;
  loadingCreate: boolean = false;
  headers = [
    {
      text: '名称',
      value: 'name'
    },
    { text: '用户访问地址', value: 'connection_address' },
    { text: '节点连接地址', value: 'request_address' },
    { text: '端口范围', value: 'port_from' },
    { text: '备注', value: 'comment' },
  ];


  get nodes() {
    return this.services.map((service: any) => service.node);
  }

  mounted() {
    // this.fetchNodes();
    this.fetchServices();
  }

  getServiceConfig({ id }: any) {
    console.log('count');
    return this.services.find((e: any) => e.node_id === id) || {};
  }

  handleDeleteService(item: any) {
    deleteServices(item.id).then(() => {
      EventBus.$emit(Event.TOAST, { text: '删除成功' });
      this.fetchServices();
    });
  }
}
</script>

<style lang="less" scoped>
.detail {
  position: relative;
  width: 100%;
}
.detail_add_btn {
  bottom: 0;
}
.detail_server_item {
  padding: 10px;
}

.card_title {
  display: flex;
  justify-content: space-between;
}
</style>
