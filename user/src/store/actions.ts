import { fetchServiceConfig } from '@/apis';
import { State } from './state';
import { ActionTree } from 'vuex';
import types from './types';

const actions: ActionTree<State, any> = {
  async [types.GET_SERVICE_CONFIG]({ commit }) {
    const resData = await fetchServiceConfig();
    commit(types.GET_SERVICE_CONFIG, resData);
  },
};

export default actions;
