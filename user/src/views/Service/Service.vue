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
                <td>{{ props.item.node.connection_address }}</td>
                <td>{{ props.item.node.request_address }}</td>
                <td>{{ props.item.node.port_from }} ~ {{ props.item.node.port_to }}</td>
                <td>{{ props.item.node.comment }}</td>
                <td>
                  <v-btn
                    v-if="!props.item.service"
                    color="primary"
                    @click="handleCreateService(props.item.id)"
                    >创建服务</v-btn
                  >
                  <v-card>
                    <v-card-title class="card_title">
                      <h4>{{ props.item.node.name }}</h4>
                      <div class="text-xs-center">
                        <v-menu offset-y>
                          <v-btn slot="activator" small icon>
                            <v-icon>more_vert</v-icon>
                          </v-btn>
                          <v-list>
                            <v-list-item @click="showQrCode(props.item)">
                              <v-list-item-title>查看二维码</v-list-item-title>
                            </v-list-item>
                            <v-list-item
                              @click="handleDeleteService(getServiceConfig(props.item.service.id))"
                            >
                              <v-list-item-title>删除</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </div>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-list dense>
                      <v-list-item>
                        <v-list-item-content>用户访问地址</v-list-item-content>
                        <v-list-item-content class="align-end">{{
                          props.item.node.connection_address
                        }}</v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>类型</v-list-item-content>
                        <v-list-item-content class="align-end">{{
                          props.item.service.type
                        }}</v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>加密方式</v-list-item-content>
                        <v-list-item-content class="align-end">{{
                          props.item.service.encryption_method
                        }}</v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>端口号</v-list-item-content>
                        <v-list-item-content class="align-end">{{
                          props.item.service.port
                        }}</v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>密码</v-list-item-content>
                        <v-list-item-content class="align-end">
                          {{ props.item.service.password }}
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </td>
              </template>
            </v-data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <ServiceCreate :nodeId="createNodeId" :visible.sync="addServerDialogVis"></ServiceCreate>
    <qrcode-dialog :visible.sync="qrcodeVis" :url="currentUrl"></qrcode-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';
import QRCode from 'qrcode';
import { StateType } from '@/store/state';
import QrcodeDialog from '@/components/QrcodeDialog.vue';
import { deleteServices } from '@/apis';
import EventBus, { Event } from '@/utils/EventBus';
import ServiceCreate from './ServiceCreate.vue';
import UserStatus from './UserStatus.vue';

@Component({
  components: {
    ServiceCreate,
    QrcodeDialog,
    UserStatus,
  },
})
export default class Services extends Vue {
  @State('services') services: any;
  @State('nodesHeart') nodesHeart: any;
  // @Action('fetchNodes') fetchNodes: any;
  @Action('fetchServices') fetchServices: any;

  @Getter('avaliableNodes') avaliableNodes: any;

  tableHeaders = [
    {
      text: '名称',
      value: 'name',
    },
    { text: '用户访问地址', value: 'connection_address' },
    { text: '节点连接地址', value: 'request_address' },
    { text: '端口范围', value: 'port_from' },
    { text: '备注', value: 'comment' },
    { text: '服务信息' },
  ];

  servers: object[] = [{}];
  addServerDialogVis: boolean = false;
  loadingCreate: boolean = false;
  qrcodeVis: boolean = false;
  currentUrl: string = '';

  createNodeId: string = '';

  get nodes() {
    return this.services.map((service: any) => service.node);
  }

  created() {}
  mounted() {
    // this.fetchNodes();
    this.fetchServices();
  }

  getServiceConfig({ id }: any) {
    return this.services.find((e: any) => e.node_id === id) || {};
  }

  handleDeleteService(item: any) {
    deleteServices(item.id).then(() => {
      EventBus.$emit(Event.TOAST, { text: '删除成功' });
      this.fetchServices();
    });
  }
  handleCreateService(id: string) {
    this.createNodeId = id;
    this.addServerDialogVis = true;
  }
  showQrCode(item: any) {
    this.qrcodeVis = true;
    this.currentUrl = item.service.url;
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
