<template>
  <v-dialog :value="visible" max-width="290" @input="visibleChange">
    <v-card id="copy_dialog">
      <v-layout align-center justify-center row fill-height>
        <img :src="QRUrl" alt="" />
      </v-layout>
      <v-layout align-center justify-center row fill-height id="fuck">
        <v-btn
          flat
          small
          v-clipboard="() => url"
          v-clipboard:success="clipboardSuccessHandler"
          v-clipboard:error="clipboardErrorHandler"
          >复制链接</v-btn
        >
        <v-btn flat small color="primary">保存图片</v-btn>
      </v-layout>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" flat="flat" @click="visibleChange">
          关闭
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Component, Vue, Emit, Watch } from 'vue-property-decorator';
import QRCode from 'qrcode';
import EventBus, { Event } from '@/utils/EventBus';

@Component({
  props: {
    visible: Boolean,
    url: String,
  },
})
export default class QrcodeDialog extends Vue {
  QRUrl = null;
  @Emit('update:visible')
  visibleChange(option: boolean) {
    return false;
  }
  async generateQR(url: string) {
    return await QRCode.toDataURL(url, { errorCorrectionLevel: 'H', width: 150 });
  }

  @Watch('url')
  async onUrlChange(val: string) {
    this.QRUrl = await this.generateQR(val);
  }

  clipboardSuccessHandler() {
      EventBus.$emit(Event.TOAST, { text: '复制成功' });
  }

  clipboardErrorHandler() {
      EventBus.$emit(Event.TOAST, { text: '复制失败' });
  }

  created() {}
}
</script>

