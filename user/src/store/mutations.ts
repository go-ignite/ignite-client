import { StateType } from './state';
import types from './types';

const mutations = {
  // [types.GET_SERVICE_CONFIG](state: StateType, serviceConfig: any) {
  //   state.serviceConfig = serviceConfig;
  // },
  [types.LOADING](state: StateType, loading: boolean) {
    state.loading = loading;
  },
  [types.NODES_HEART](state: StateType, heart: any) {
    state.nodesHeart = heart;
  },
  [types.FETCH_SERVICES](state: StateType, services: any) {
    state.services = services;
  },
  [types.FETCH_SERVICES_OPTIONS](state: StateType, servicesOptions: any) {
    state.servicesOptions = servicesOptions;
  },
  [types.FETCH_USERINFO](state: StateType, userInfo: any) {
    state.userInfo = userInfo;
  },
};

export default mutations;
