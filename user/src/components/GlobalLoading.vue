<template>
  <v-layout row justify-center>
    <v-dialog :value="loading" persistent content content-class="centered-dialog">
      <v-container fill-height>
        <v-layout column justify-center align-center>
          <fingerprint-spinner :animation-duration="1500" :size="64" :color="progressColor" />
        </v-layout>
      </v-container>
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

  progressColor = '#fff';
}

</script>

<style>
.dialog.centered-dialog {
  background: #282c2dad;
  box-shadow: none;
  border-radius: 6px;
  width: auto;
  color: whitesmoke;
}
</style>
