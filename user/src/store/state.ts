export const state: StateType = {
  loading: false,
  userInfo: {},
  serviceConfig: [],
  servicesOptions: [],
  nodes: [],
  services: [],
  nodesHeart: {},
};

export interface StateType {
  userInfo?: UserInfo;
  servicesOptions?: object[];
  serviceConfig?: object[];
  loading: boolean;
  nodes: object[];
  services: object[];
  nodesHeart: object;
}

export interface UserInfo {
  Id?: number;
  Host?: string;
  Username?: string;
  Status?: number;
  PackageLimit?: number;
  PackageUsed?: string;
  PackageLeft?: string;
  PackageLeftPercent?: string;
  ServicePort?: number;
  ServicePwd?: string;
  ServiceMethod?: string;
  ServiceType?: string;
  ServiceURL?: string;
  Expired?: string;
}
