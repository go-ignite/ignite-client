<template>
  <v-container>
    <v-row align="center">
      <v-col :md="3" offset-md="3">
        <v-progress-circular
          :rotate="270"
          :size="250"
          :width="30"
          :value="progressValue"
          color="primary"
        >
        <div>
          <p>当月已使用流量: {{ userInfo.month_traffic_used / 1024 / 1024 }} M</p>
          <p>每月流量上限： {{ userInfo.package_limit }} G</p>
        </div>
        </v-progress-circular>
      </v-col>
      <v-col :md="5">
        <ul>
          <li>最近统计时间：{{lastStatsTime}}</li>
          <li>创建时间：{{createdTime}}</li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import get from 'lodash/get';
import { State } from 'vuex-class';
import { format } from 'date-fns';
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class UserStatus extends Vue {
  @State('userInfo') userInfo: any;

  get lastStatsTime() {
    const time = get(this.userInfo, 'last_stats_time', '');
    return time ? format(new Date(time), 'yyyy-MM-dd hh:mm:ss') : null;
  }
  get progressValue() {
    const used = this.userInfo.month_traffic_used || 1;
    const all = used * 1024 * 1024 * 1024;
    return all ? ((all - used) / all) * 100 : 0;
  }
  get createdTime() {
    const value = this.userInfo.created_at;
    return value ? format(new Date(value), 'yyyy-MM-dd hh:mm:ss') : '';
  }
}
</script>
