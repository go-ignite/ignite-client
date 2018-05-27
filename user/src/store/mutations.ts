import { State } from './state';
import types from './types';

const mutations = {
  [types.GET_SERVICE_CONFIG](state: State, serviceConfig: any) {
    state.serviceConfig = serviceConfig;
  },
};

export default mutations;
