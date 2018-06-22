<template>
  <div class="detail">
    <v-data-iterator
      :items="nodes"
      row
      wrap
      :hide-actions="true"
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
          <v-card-title><h4>{{ props.item.name }}</h4></v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>heart:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ nodesHeart[props.item.id] ? 'Alive' : 'DEAD' }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>address:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.address }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>connect_ip:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.connect_ip }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>port_range:</v-list-tile-content>
              <v-list-tile-content class="align-end">
                {{ props.item.port_from }} ~ {{ props.item.port_to }} </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>comment:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.comment }}</v-list-tile-content>
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
import serviceCreate from '@/components/ServerCreate.vue';

@Component({
  components: {
    serviceCreate,
  },
})
export default class Server extends Vue {
  @State('nodes') nodes: any;
  @State('nodesHeart') nodesHeart: any;
  @Action('fetchNodes') fetchNodes: any;

  servers: object[] = [{}];
  addServerDialogVis: boolean = false;
  loadingCreate: boolean = false;

  mounted() {
    this.fetchNodes()
  }
}
</script>

<style lang="less">
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
</style>
