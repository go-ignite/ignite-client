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
        <v-select
          v-model="addServerForm.method"
          :items="serviceTypes"
          label="请选择服务端类型"
        ></v-select>
        <v-select
          v-model="addServerForm.serverType"
          :items="serviceMethods"
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
// import { postServiceCreate } from '@/apis'
import types from '@/store/types'
import { setTimeout } from 'timers';

const RenameKeyMap = {
  serverType: 'server-type',
};

@Component({
  props: {
    visible: Boolean,
  },
})
export default class ServerCreate extends Vue {
  @Action(types.LOADING) changeLoading: any

  @State((state) => state.serviceConfig)
  serviceConfig: any;

  @Emit('update:visible')
  visibleChange(option: boolean) {}
  
  loading: boolean = false

  get serviceTypes() {
    return this.serviceConfig.servers || [];
  }

  get serviceMethods() {
    if (this.addServerForm.method === 'SS') {
      return this.serviceConfig.ssMethods || [];
    } else if (this.addServerForm.method === 'SSR') {
      return this.serviceConfig.ssrMethods || [];
    } else {
      return [];
    }
  }

  addServerForm = {
    method: '',
    serverType: '',
  };

  async serverCreate() {
    this.changeLoading(true)
    // await postServiceCreate(renameKey(this.addServerForm, RenameKeyMap))
    setTimeout(() => {
      this.changeLoading(false)
      this.visibleChange(false)
    }, 2000)
  }
}
</script>
