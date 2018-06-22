import { fetchServiceConfig, fetchServiceNodes } from '@/apis';
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
  async [types.FETCH_NODES]({ commit }) {
    const resData = await fetchServiceNodes();
    commit(types.FETCH_NODES, resData);
  },
  async [types.WS_NODES_HEART]({ commit }, heart) {
    const resData = await fetchServiceNodes();
    commit(types.WS_NODES_HEART, heart);
  },
};

export default actions;
