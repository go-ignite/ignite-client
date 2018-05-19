<template>
  <div class="detail">
    <v-data-iterator
      :items="items"
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
            <v-list-tile v-if="props.index % 2 === 0">
              <v-list-tile-content>Calories:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.calories }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Fat:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.fat }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Carbs:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.carbs }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Protein:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.protein }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Sodium:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.sodium }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Calcium:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.calcium }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Iron:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.iron }}</v-list-tile-content>
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
      <v-dialog
        v-model="addServerDialogVis"
        max-width="500px">
        <v-card>
          <v-card-title>
            创建服务
          </v-card-title>
          <v-card-text>
            <v-select
              v-model="addServerForm.service"
              :items="serviceTypeOptions"
              label="请选择服务端类型"
            ></v-select>
            <v-select
              v-model="addServerForm.secret"
              :items="secretOptions"
              label="请选择加密方式"
            ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn
              @click.stop="serverCreate"
              color="primary"
              flat
            >创建</v-btn>
            <v-btn
              @click.stop="addServerDialogVis = false"
              flat
            >取消</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Detail extends Vue {
  servers: object[] = [{}];
  addServerDialogVis: boolean = false;
  loadingCreate: boolean = false;
  addServerForm = {
    service: '',
    secret: '',
  };
  serviceTypeOptions = [
    {
      text: 'SS',
      value: 'ss',
    },
    {
      text: 'SSR',
      value: 'ssr',
    },
  ];
  secretOptions = [
    {
      text: 'aes-256-cfb',
      value: 'aes-256-cfb',
    },
  ];

  items = [
    {
      value: false,
      name: 'KitKat',
      calories: 518,
      fat: 26.0,
      carbs: 65,
      protein: 7,
      sodium: 54,
      calcium: '12%',
      iron: '6%',
    },
  ];

  serverCreate() {
    this.loadingCreate = true;
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
