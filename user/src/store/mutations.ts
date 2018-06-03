import { StateType } from './state';
import types from './types';

const mutations = {
  [types.GET_SERVICE_CONFIG](state: StateType, serviceConfig: any) {
    state.serviceConfig = serviceConfig;
  },
  [types.GET_SERVICE_CONFIG](state: StateType, serviceConfig: any) {
    state.serviceConfig = serviceConfig;
  },
  [types.LOADING](state: StateType, loading: boolean) {
    state.loading = loading;
  },
};

export default mutations;
