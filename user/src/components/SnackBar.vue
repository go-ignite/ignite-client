<template>
    <v-snackbar
      v-bind="config"
      v-model="show"
    >
      {{ config.text }}
      <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import EventBus, { Event } from '@/utils/EventBus';

const INIT_CONFIG = {
  direction: 'top',
  timeout: 2000,
  mode: 'vertical',
  show: false,
  top: true,
};

// TODO: Refactor v-snackbar
@Component
export default class Register extends Vue {
  show: boolean = false;
  @State('toast') toast: any;

  config = { ...INIT_CONFIG };

  // listenClose(v) {
  //   alert(v);
  // }

  created() {
    EventBus.$on(Event.TOAST, (config: object) => {
      this.config = Object.assign(this.config, config);
      this.show = true
    });
  }
}
</script>
