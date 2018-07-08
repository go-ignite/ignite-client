<template>
  <div class="detail">
    <v-data-iterator
      :items="services"
      :hide-actions="true"
      row
      wrap
      no-data-text="您暂无可用的服务"
    >
      <v-flex
        slot="item"
        slot-scope="props"
        xs12
        sm6
        md6
        lg4
        class="detail_server_item"
      >
        <v-card>
          <v-card-title class="card_title">
            <h4>{{ getNodeConfig(props.item).name }}</h4>
            <div class="text-xs-center">
              <v-menu offset-y>
                <v-btn
                  slot="activator"
                  small
                  icon
                >
                  <v-icon>more_vert</v-icon> 
                </v-btn>
                <v-list>
                  <v-list-tile>
                    <v-list-tile-title>查看二维码</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click="handleDeleteService(props.item)">
                    <v-list-tile-title>删除</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>心跳:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ nodesHeart[props.item.node_id] ? '在线' : '离线' }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>类型</v-list-tile-content>
              <v-list-tile-content class="align-end">{{typeMap[props.item.type]}}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>加密方式</v-list-tile-content>
              <v-list-tile-content class="align-end">{{props.item.method}}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>地址</v-list-tile-content>
              <v-list-tile-content class="align-end">
                {{getNodeConfig(props.item).address}}
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>端口号</v-list-tile-content>
              <v-list-tile-content class="align-end">{{props.item.port}}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>密码</v-list-tile-content>
              <v-list-tile-content class="align-end">
                {{props.item.password}}
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-data-iterator>
    <v-btn
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
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
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
  @State('nodes') nodes: any;
  @State('services') services: any;
  @State('nodesHeart') nodesHeart: any;
  @Action('fetchNodes') fetchNodes: any;
  @Action('fetchServices') fetchServices: any;

  typeMap = {
    1: 'SS',
    2: 'SSR',
  };
  servers: object[] = [{}];
  addServerDialogVis: boolean = false;
  loadingCreate: boolean = false;

  mounted() {
    this.fetchNodes();
    this.fetchServices();
  }

  getNodeConfig({ node_id: nodeId }: any) {
    return this.nodes.find((e: any) => e.id === nodeId) || {};
  }

  handleDeleteService(item: any) {
    deleteServices(item.id)
      .then(() => {
        EventBus.$emit(Event.TOAST, { text: '删除成功' });
        this.fetchServices()
      })
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
