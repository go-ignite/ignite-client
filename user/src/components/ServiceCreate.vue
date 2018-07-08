<template>
  <v-dialog
    :value="visible"
    @input="visibleChange"
    max-width="500px">
    <v-card>
      <v-card-title>
        创建服务
      </v-card-title>
      <v-card-text>
        <v-radio-group v-model="nodeId" label="请选择服务节点">
          <v-radio
            v-for="node in nodes"
            :key="node.id"
            :label="nodeName(node)"
            :value="node.id"
          ></v-radio>
        </v-radio-group>
        <v-select
          v-model="addServerForm.type"
          :items="serviceTypes"
          label="请选择服务端类型"
        ></v-select>
        <v-select
          v-model="addServerForm.method"
          :items="serviceMethods"
          label="请选择加密方式"
        ></v-select>
        <v-text-field
          v-model="addServerForm.password"
          label="请输入服务密码"
          type="password"
          required
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click.stop="serverCreate"
          color="primary"
          flat
        >创建</v-btn>
        <v-btn
          @click.stop="visibleChange(false)"
          flat
        >取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { StateType } from '@/store/state';
import { renameKey } from '@/utils/helper';
import { POINT_CONVERSION_COMPRESSED } from 'constants';
import { postServiceCreate } from '@/apis'
import types from '@/store/types'
import { setTimeout } from 'timers';

@Component({
  props: {
    visible: Boolean,
  },
})
export default class ServerCreate extends Vue {
  @Action(types.LOADING) changeLoading: any
  @Action('fetchServices') fetchServices: any;
  @Action('fetchServiceConfig') fetchServiceConfig: any

  @State((state) => state.serviceConfig) serviceConfig: any;
  @State('nodes') nodes: any;

  @Emit('update:visible')
  visibleChange(option: boolean) {}
  
  nodeId: string = ''
  loading: boolean = false

  get serviceTypes() {
    const map: { [key: number]: string } = {
      1: 'ss',
      2: 'ssr',
    }
    return this.serviceConfig.map(({ type }: any) => {
      return {
        text: map[type],
        value: type
      }
    });
  }

  get serviceMethods() {
    const config = this.serviceConfig.find(({type}: any) => {
      return type === this.addServerForm.type
    })
    return config ? config.methods : []
  }

  addServerForm = {
    type: '',
    method: '',
    password: '',
  };

  async serverCreate() {
    this.changeLoading(true)
    try {
      await postServiceCreate(this.nodeId, this.addServerForm)
      this.fetchServices()
      this.changeLoading(false)
      this.visibleChange(false)
    } catch(e) {
      this.changeLoading(false)
    }
  }

  nodeName({ name, address }: any) {
    return `${name}(${address})`
  }

  mounted() {
    this.fetchServiceConfig()
  }
}
</script>
