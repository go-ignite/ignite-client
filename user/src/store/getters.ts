import { GetterTree } from 'vuex';
import { StateType } from './state';

const getters: GetterTree<StateType, any> = {
  avaliableNodes(state): any {
    const data = state.nodes.filter((node: any) => {
      return !state.services.find((service: any) => service.node_id === node.id);
    });
    return data;
  },
};

export default getters;
