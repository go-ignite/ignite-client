<template>
  <v-layout row justify-center>
    <v-dialog :value="loading" persistent content-class="centered-dialog">
        <v-layout column justify-center align-center>
          <fingerprint-spinner :animation-duration="1500" :size="64" :color="progressColor" />
        </v-layout>
    </v-dialog>
  </v-layout>
</template>

<script lang="ts">
import { FingerprintSpinner } from 'epic-spinners';
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';


@Component({
  components: {
    FingerprintSpinner
  },
})
export default class GlobalLoading extends Vue {
  @State('loading') loading: any;

  progressColor = '#3f51b5';
}

</script>

<style>
.v-dialog.centered-dialog {
  box-shadow: none;
  border-radius: 6px;
  width: auto;
  color: whitesmoke;
}
.fullheight {
  height: 100%;
}
</style>
