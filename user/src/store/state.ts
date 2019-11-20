export const state: StateType = {
  loading: false,
  userInfo: {},
  serviceConfig: [],
  servicesOptions: [],
  nodes: [],
  services: [],
  nodesHeart: [],
};

export interface StateType {
  userInfo?: any;
  servicesOptions?: object[];
  serviceConfig?: object[];
  loading: boolean;
  nodes: object[];
  services: object[];
  nodesHeart: object[];
}
