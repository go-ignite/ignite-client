<template>
    <v-snackbar
      v-bind="config"
      v-model="show"
    >
      {{ config.text }}
      <v-btn text @click.native="snackbar = false">关闭</v-btn>
    </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import EventBus, { EventMap } from '@/utils/EventBus';

const INIT_CONFIG = {
  direction: 'top',
  timeout: 2000,
  vertical: false,
  show: false,
  top: true,
};

// TODO: Refactor v-snackbar
@Component
export default class Register extends Vue {
  show: boolean = false;
  @State('toast') toast: any;

  config = { ...INIT_CONFIG };


  created() {
    EventBus.on(EventMap.TOAST, (config: object) => {
      this.config = Object.assign(this.config, config);
      this.show = true
    });
  }
}
</script>
