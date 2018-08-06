import Vue from 'vue';
import Vuex, { ActionTree } from 'vuex';
import types from './types';
import { state } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
});
