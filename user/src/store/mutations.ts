import { StateType } from './state';
import types from './types';

const mutations = {
  [types.FETCH_SERVICE_CONFIG](state: StateType, serviceConfig: any) {
    state.serviceConfig = serviceConfig;
  },
  // [types.GET_SERVICE_CONFIG](state: StateType, serviceConfig: any) {
  //   state.serviceConfig = serviceConfig;
  // },
  [types.LOADING](state: StateType, loading: boolean) {
    state.loading = loading;
  },
  [types.FETCH_NODES](state: StateType, nodes: any) {
    state.nodes = nodes;
  },
  [types.WS_NODES_HEART](state: StateType, heart: any) {
    state.nodesHeart = heart;
  },
  [types.FETCH_SERVICES](state: StateType, services: any) {
    state.services = services;
  },
};

export default mutations;
