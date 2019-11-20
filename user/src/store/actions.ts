import { fetchUserInfo, fetchServices, fetchServicesOptions } from '@/apis';
import { StateType } from './state';
import { ActionTree } from 'vuex';
import types from './types';

const actions: ActionTree<StateType, any> = {
  async [types.FETCH_SERVICES_OPTIONS]({ commit }) {
    const resData = await fetchServicesOptions();
    commit(types.FETCH_SERVICES_OPTIONS, resData);
  },
  async [types.FETCH_SERVICES]({ commit }) {
    const resData = await fetchServices();
    commit(types.FETCH_SERVICES, resData);
  },
  async [types.LOADING]({ commit }, loading) {
    commit(types.LOADING, loading);
  },
  async [types.NODES_HEART]({ commit }, nodeService) {
    commit(types.NODES_HEART, nodeService);
  },
  async [types.FETCH_USERINFO]({ commit }) {
    const resData = await fetchUserInfo();
    commit(types.FETCH_USERINFO, resData);
  },
};

export default actions;
