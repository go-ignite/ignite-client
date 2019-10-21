<template>
  <div class="detail">
    <v-row justify="center">
      <v-expansion-panels popout :value="1">
        <v-expansion-panel>
          <v-expansion-panel-header>用户信息</v-expansion-panel-header>
          <v-expansion-panel-content>
            <UserStatus></UserStatus>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>节点信息</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-data-table
              :headers="tableHeaders"
              :items="services"
              hide-default-footer
              class="elevation-1"
            >
              <template v-slot:item="props">
                <td>{{ props.item.node.name }}</td>
                <td>{{ getNodesStatus(props.item.node.id) }}</td>
                <td>{{ props.item.node.connection_address }}</td>
                <td>{{ props.item.node.request_address }}</td>
                <td>{{ props.item.node.port_from }} ~ {{ props.item.node.port_to }}</td>
                <td>{{ props.item.node.comment }}</td>
                <td>
                  <v-btn
                    small
                    v-if="!props.item.service"
                    color="primary"
                    @click="handleCreateService(props.item.id)"
                    >创建服务</v-btn
                  >
                  <template v-else>
                    <v-btn small @click="handleSeeService(props.item)">
                      查看详情
                    </v-btn>
                  </template>
                </td>
              </template>
            </v-data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <ServiceCreateDialog :nodeId="createNodeId" :visible.sync="visServiceCreateDialog" />
    <ServiceInfo :data="serviceInfo" :visible.sync="serviceInfoVis"></ServiceInfo>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';
import { StateType } from '@/store/state';
import { deleteServices, fetchUserInfo } from '@/apis';
import EventBus, { Event } from '@/utils/EventBus';
import types from '@/store/types';
import eventsource from 'eventsource';
import localforage from 'localforage';
import ServiceCreateDialog from './ServiceCreateDialog.vue';
import ServiceInfo from './ServiceInfo.vue';
import UserStatus from './UserStatus.vue';

@Component({
  components: {
    ServiceCreateDialog,
    ServiceInfo,
    UserStatus,
  },
})
export default class Services extends Vue {
  @State('services') services: any;
  @State('nodesHeart') nodesHeart: any;
  // @Action('fetchNodes') fetchNodes: any;
  @Action('fetchServices') fetchServices: any;

  @Getter('avaliableNodes') avaliableNodes: any;
  @Action(types.FETCH_SERVICES_OPTIONS) fetchServicesOptions: any;
  @Action(types.NODES_HEART) fetchNodesHeart: any;
  @Action(types.LOADING) changeLoading: any;

  tableHeaders = [
    {
      text: '名称',
      value: 'name',
    },
    {
      text: '节点状态',
    },
    { text: '用户访问地址', value: 'connection_address' },
    { text: '节点连接地址', value: 'request_address' },
    { text: '端口范围', value: 'port_from' },
    { text: '备注', value: 'comment' },
    { text: '服务信息' },
  ];

  servers: object[] = [{}];
  visServiceCreateDialog: boolean = false;
  serviceInfoVis: boolean = false;
  serviceInfo: any = null;
  ws: any = null;

  createNodeId: string = '';

  get nodes() {
    return this.services.map((service: any) => service.node);
  }

  created() {}
  async mounted() {
    this.fetchServicesOptions();
    // this.fetchNodes();
    this.fetchServices();
    const Authorization = await localforage.getItem('ignite_token');
    const sse = new eventsource('/api/user/services/sync', {
      headers: {
        Authorization,
      },
      https: { rejectUnauthorized: false },
    });
    sse.onopen = () => {
      console.log('打开连接');
    };
    sse.onerror = (e) => {
      console.log('发生错误', e);
    };
    sse.close = () => {
      console.log('连接关闭');
    };
    sse.addEventListener('user_sync', (res: any) => {
      const data = JSON.parse(res.data);
      console.log(data)
      this.fetchNodesHeart(data.node_service);
    });
    this.ws = sse;
  }

  getServiceConfig({ id }: any) {
    return this.services.find((e: any) => e.node_id === id) || {};
  }

  handleDeleteService(item: any) {
    deleteServices(item.id).then(() => {
      EventBus.emit(Event.TOAST, { text: '删除成功' });
      this.fetchServices();
    });
  }
  handleCreateService(id: string) {
    this.createNodeId = id;
    this.visServiceCreateDialog = true;
  }
  handleSeeService(item: any) {
    this.serviceInfo = item;
    this.serviceInfoVis = true;
  }

  getNodesStatus(id: string) {
    const item = this.nodesHeart.find((node: any) => node.node.id === id)
    if (item) {
      return item.node.available ? '正常' : '异常'
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  position: relative;
  width: 100%;
  padding: 30px;
}
.detail_server_item {
  padding: 10px;
}

.card_title {
  display: flex;
  justify-content: space-between;
}
</style>
