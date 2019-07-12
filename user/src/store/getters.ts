import { GetterTree } from 'vuex';
import { StateType } from './state';

const getters: GetterTree<StateType, any> = {
  avaliableNodes(state): any {
    return state.services
      .filter((service: any) => service.service === null)
      .map((service: any) => service.node);
  },
};

export default getters;
