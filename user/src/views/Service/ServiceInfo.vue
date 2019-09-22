<template>
  <v-dialog :value="visible" @input="visibleChange" max-width="500px">
    <v-card>
      <v-card-title class="card_title">
        <h4>{{ node.name }}</h4>
        <div class="flex-grow-1"></div>

        <v-btn small text color="primary" @click="toggleQrcode(data)">{{
          showQrcode ? '查看配置' : '查看二维码'
        }}</v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-list dense v-if="!showQrcode">
        <v-list-item>
          <v-list-item-content>用户访问地址</v-list-item-content>
          <v-list-item-content class="align-end">{{ node.connection_address }}</v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>类型</v-list-item-content>
          <v-list-item-content class="align-end">{{ service.type }}</v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>加密方式</v-list-item-content>
          <v-list-item-content class="align-end">{{
            service.encryption_method
          }}</v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>端口号</v-list-item-content>
          <v-list-item-content class="align-end">{{ service.port }}</v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>密码</v-list-item-content>
          <v-list-item-content class="align-end">
            {{ service.password }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list v-else>
        <div class="qr-wrap">
          <img :src="QRUrl" alt="" />
          <v-text-field
            class="qr-url"
            :value="service.url"
            label="Url"
            readonly
            placeholder="Placeholder"
          ></v-text-field>
        </div>
      </v-list>
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
import get from 'lodash/get';
import QRCode from 'qrcode';

@Component({
  props: {
    visible: Boolean,
  },
  components: {},
})
export default class ServerCreate extends Vue {
  @Emit('update:visible')
  visibleChange(option: boolean) {}

  @Prop()
  public data: any;
  QRUrl: string = '';
  currentUrl: string = '';
  showQrcode: boolean = false;

  get service() {
    return get(this.data, 'service', {});
  }

  get node() {
    return get(this.data, 'node', {});
  }
  toggleQrcode(item: any) {
    this.showQrcode = !this.showQrcode;
    this.currentUrl = item.service.url;
  }

  async generateQR(url: string) {
    if (!url) return '';
    return await QRCode.toDataURL(url, { errorCorrectionLevel: 'H', width: 150 });
  }

  @Watch('service.url')
  async onUrlChange(val: string) {
    this.QRUrl = await this.generateQR(val);
  }
}
</script>

<style lang="less" scoped>
.qr-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 30px;
  img {
    width: 200px;
    height: 200px;
  }
}
.qr-url {
  width: 100%;
}
</style>
