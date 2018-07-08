import { fetchServiceConfig, fetchNodes, fetchServices } from '@/apis';
import { StateType } from './state';
import { ActionTree } from 'vuex';
import types from './types';

const actions: ActionTree<StateType, any> = {
  async [types.FETCH_SERVICE_CONFIG]({ commit }) {
    const resData = await fetchServiceConfig();
    commit(types.FETCH_SERVICE_CONFIG, resData);
  },
  async [types.FETCH_NODES]({ commit }) {
    const resData = await fetchNodes();
    commit(types.FETCH_NODES, resData);
  },
  async [types.FETCH_SERVICES]({ commit }) {
    const resData = await fetchServices();
    commit(types.FETCH_SERVICES, resData);
  },
  async [types.LOADING]({ commit }, loading) {
    commit(types.LOADING, loading);
  },
  async [types.WS_NODES_HEART]({ commit }, heart) {
    commit(types.WS_NODES_HEART, heart);
  },
};

export default actions;
