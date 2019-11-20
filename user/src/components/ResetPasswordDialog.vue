<template>
  <v-dialog :value="visible" max-width="290" @input="visibleChange">
    <v-card>
      <v-card-title>
        <span class="headline">修改密码</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.old_password"
                  label="旧密码"
                  :rules="[(v) => !!v || '请输入旧密码']"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.new_password"
                  label="新密码"
                  :rules="[
                    (v) => !!v || '请输入新密码',
                    (v) => (v && (v.length >= 6 && v.length <= 12)) || '请输入 6 ~ 12 位的新密码',
                  ]"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="blue darken-1" text @click="visibleChange">关闭</v-btn>
        <v-btn color="blue darken-1" text @click="handleSubmit">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Component, Vue, Emit, Watch } from 'vue-property-decorator';
import QRCode from 'qrcode';
import EventBus, { EventMap } from '@/utils/EventBus';
import get from 'lodash/get';
import { postChangePassword } from '../apis';

const FORM_INIT = {
  old_password: '',
  new_password: '',
};
@Component({
  props: {
    visible: Boolean,
  },
})
export default class QrcodeDialog extends Vue {
  QRUrl = null;
  form = { ...FORM_INIT };
  @Emit('update:visible')
  visibleChange(option: boolean) {
    this.form = { ...FORM_INIT };
    return false;
  }
  created() {}
  async handleSubmit() {
    const el = this.$refs.form as any;
    if (!el.validate()) return;

    try {
      await postChangePassword(this.form);
      EventBus.emit(EventMap.TOAST, { text: '修改成功' });
      this.visibleChange(true);
    } catch (e) {
      const code = get(e, 'response.data.code');
      if (code === 1106) {
        EventBus.emit(EventMap.TOAST, { text: '用户密码填写错误' });
      }
    }
  }
}
</script>

