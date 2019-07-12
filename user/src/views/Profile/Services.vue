<template>
  <div class="detail">
    <v-data-iterator
      :items="services"
      :hide-actions="true"
      row
      wrap
      no-data-text="您暂无可用的服务"
    >
      <v-flex slot="item" slot-scope="props" xs12 sm6 md6 lg4 class="detail_server_item">
        <v-card>
          <v-card-title class="card_title">
            <h4>{{ props.item.node.name }}</h4>
            <div class="text-xs-center">
              <v-menu offset-y>
                <v-btn slot="activator" small icon>
                  <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile @click="showQrCode(props.item)">
                    <v-list-tile-title>查看二维码</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile
                    @click="handleDeleteService(getServiceConfig(props.item.service.id))"
                  >
                    <v-list-tile-title>删除</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>用户访问地址</v-list-tile-content>
              <v-list-tile-content class="align-end">{{
                props.item.node.connection_address
              }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>类型</v-list-tile-content>
              <v-list-tile-content class="align-end">{{
                props.item.service.type
              }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>加密方式</v-list-tile-content>
              <v-list-tile-content class="align-end">{{
                props.item.service.encryption_method
              }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>端口号</v-list-tile-content>
              <v-list-tile-content class="align-end">{{
                props.item.service.port
              }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>密码</v-list-tile-content>
              <v-list-tile-content class="align-end">
                {{ props.item.service.password }}
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-data-iterator>
    <v-btn
      v-if="avaliableNodes.length"
      @click="addServerDialogVis = true"
      absolute
      dark
      fab
      right
      color="pink"
      class="detail_add_btn"
    >
      <div>
        <v-icon>add</v-icon>
      </div>
    </v-btn>
    <service-create :visible.sync="addServerDialogVis"></service-create>
    <qrcode-dialog :visible.sync="qrcodeVis" :url="currentUrl"></qrcode-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';
import QRCode from 'qrcode'
import { StateType } from '@/store/state';
import serviceCreate from '@/components/ServiceCreate.vue';
import QrcodeDialog from '@/components/QrcodeDialog.vue';
import { deleteServices } from '@/apis';
import EventBus, { Event } from '@/utils/EventBus';

@Component({
  components: {
    serviceCreate,
    QrcodeDialog
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
  qrcodeVis: boolean = false;
  currentUrl: string = ''; 

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
  showQrCode(item: any) {
    this.qrcodeVis = true;
    this.currentUrl = item.service.url
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
