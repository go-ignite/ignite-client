<template>
  <div class="detail">
    <v-data-iterator
      :items="nodes"
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
            <h4>{{ props.item.name }}</h4>
            <div class="text-xs-center" v-if="nodeMap.get(props.item)">
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
                  <v-list-tile @click="handleDeleteService(getServiceConfig(props.item))">
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
              <v-list-tile-content class="align-end">{{ nodesHeart[props.item.id] ? '在线' : '离线' }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>connection</v-list-tile-content>
              <v-list-tile-content class="align-end">
                {{props.item.connection}}
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>address</v-list-tile-content>
              <v-list-tile-content class="align-end">
                {{props.item.address}}
              </v-list-tile-content>
            </v-list-tile>
            <template v-if="nodeMap.get(props.item)">
              <v-list-tile>
                <v-list-tile-content>类型</v-list-tile-content>
                <v-list-tile-content class="align-end">{{typeMap[nodeMap.get(props.item).type]}}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>加密方式</v-list-tile-content>
                <v-list-tile-content class="align-end">{{nodeMap.get(props.item).method}}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>端口号</v-list-tile-content>
                <v-list-tile-content class="align-end">{{nodeMap.get(props.item).port}}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>密码</v-list-tile-content>
                <v-list-tile-content class="align-end">
                  {{nodeMap.get(props.item).password}}
                </v-list-tile-content>
              </v-list-tile>
            </template>
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
  @State('nodes') nodes: any;
  @State('services') services: any;
  @State('nodesHeart') nodesHeart: any;
  @Action('fetchNodes') fetchNodes: any;
  @Action('fetchServices') fetchServices: any;

  @Getter('avaliableNodes') avaliableNodes: any;

  typeMap = {
    1: 'SS',
    2: 'SSR',
  };

  servers: object[] = [{}];
  addServerDialogVis: boolean = false;
  loadingCreate: boolean = false;

  get nodeMap() {
    return new Map(this.nodes.map(node => [node, this.services.find((e: any) => e.node_id === node.id)]))
  }

  mounted() {
    this.fetchNodes();
    this.fetchServices();
  }

  getServiceConfig({ id }: any) {
    console.log('count')
    return this.services.find((e: any) => e.node_id === id) || {};
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
