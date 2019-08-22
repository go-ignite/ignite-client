<template>
  <v-container>
    <v-row align="center">
      <v-col :cols="1">
        剩余流量
      </v-col>
      <v-col :cols="8">
  <v-progress-linear color="light-blue" height="10" value="10" striped></v-progress-linear>

      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class UserStatus extends Vue {}
</script>
