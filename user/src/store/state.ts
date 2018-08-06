export const state: StateType = {
  loading: false,
  userInfo: {},
  serviceConfig: [],
  nodes: [],
  services: [],
  nodesHeart: {},
};

export interface StateType {
  userInfo?: UserInfo;
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
