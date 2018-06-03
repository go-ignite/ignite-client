import { fetchServiceConfig } from '@/apis';
import { StateType } from './state';
import { ActionTree } from 'vuex';
import types from './types';

const actions: ActionTree<StateType, any> = {
  async [types.GET_SERVICE_CONFIG]({ commit }) {
    const resData = await fetchServiceConfig();
    commit(types.GET_SERVICE_CONFIG, resData);
  },
  async [types.CREATE_SERVICE]({ commit }) {
    const resData = await fetchServiceConfig();
    commit(types.GET_SERVICE_CONFIG, resData);
  },
  async [types.LOADING]({ commit }, loading) {
    commit(types.LOADING, loading);
  },
};

export default actions;
