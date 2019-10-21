<template>
  <v-dialog :value="visible" @input="visibleChange" max-width="500px">
    <v-card>
      <v-card-title>
        创建服务
      </v-card-title>
      <v-card-text>
        <v-select
          v-model="addServerForm.node_id"
          :items="avaliableNodes.map(node => ({text: node.name, value: node.id}))"
          label="请选择服务节点"
        ></v-select>
        <v-select
          v-model="addServerForm.type"
          :items="serviceTypes"
          label="请选择服务端类型"
        ></v-select>
        <v-select
          v-model="addServerForm.encryption_method"
          :items="serviceMethods"
          label="请选择加密方式"
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-btn @click.stop="serverCreate" color="primary">创建</v-btn>
        <v-btn @click.stop="visibleChange(false)">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Emit, Watch, Prop } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';
import { StateType } from '@/store/state';
import { renameKey } from '@/utils/helper';
import { postServiceCreate, postServices } from '@/apis';
import types from '@/store/types';

@Component({
  props: {
    visible: Boolean,
  },
})
export default class ServerCreate extends Vue {
  @Action(types.LOADING) changeLoading: any;
  @Action('fetchServices') fetchServices: any;
  @Action('fetchNodes') fetchNodes: any;

  @State((state) => state.serviceConfig) serviceConfig: any;
  @State('nodes') nodes: any;
  @State('services') services: any;
  @State('servicesOptions') servicesOptions: any;

  @Getter('avaliableNodes') avaliableNodes: any;

  @Emit('update:visible')
  visibleChange(option: boolean) {}

  @Prop()
  public nodeId!: string;

  loading: boolean = false;

  get serviceTypes() {
    return this.servicesOptions.map((option: any) => option.type);
  }

  get serviceMethods() {
    const item = this.servicesOptions.find(
      (option: any) => option.type === this.addServerForm.type
    );
    return item ? item.encryption_methods : [];
  }

  addServerForm = {
    node_id: '',
    type: '',
    encryption_method: '',
  };

  async serverCreate() {
    this.changeLoading(true);
    try {
      await postServices(this.addServerForm);
      this.fetchServices();
      this.visibleChange(false);
    } finally {
      this.changeLoading(false);
    }
  }

  nodeName({ name, address }: any) {
    return `${name}(${address})`;
  }

  @Watch('visible')
  onVisibleChange(val: boolean) {
    if (val === true && this.nodeId) {
      this.addServerForm.node_id = this.nodeId;
    }
  }
}
</script>
