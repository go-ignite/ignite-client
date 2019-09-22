<template>
  <v-container>
    <v-row align="center">
      <v-col :cols="2">
        当月已使用流量 / 每月流量上限
      </v-col>
      <v-col :cols="8">
        <v-progress-linear color="light-blue" height="10" :value="progressValue" striped></v-progress-linear>
      </v-col>
      <v-col :cols="2">
        {{userInfo.month_traffic_used / 1024 / 1024}} M / {{userInfo.package_limit}} G
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col :cols="1">
        最近统计时间
      </v-col>
      <v-col :cols="8">
        {{ lastStatsTime }}
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col :cols="1">
        创建时间
      </v-col>
      <v-col :cols="8">
        {{ createdTime }}
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import get from 'lodash/get';
import { format } from 'date-fns';
import { fetchUserInfo } from '@/apis';
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class UserStatus extends Vue {
  userInfo: any = {
    month_traffic_used: 0,
    package_limit: 0,
    created_at: null,
  };
  async created() {
    this.userInfo = await fetchUserInfo();
  }
  get lastStatsTime() {
    const time = get(this.userInfo, 'last_stats_time', '');
    return time ? format(new Date(time), 'yyyy-MM-dd hh:mm:ss') : null;
  }
  get progressValue() {
    const all = this.userInfo.month_traffic_used * 1024 * 1024 * 1024; // kb
    return all ? this.userInfo.month_traffic_used / all : 0;
  }
  get createdTime() {
    const value = this.userInfo.created_at;
    return value ? format(new Date(value), 'yyyy-MM-dd hh:mm:ss') : ''
  }
}
</script>
