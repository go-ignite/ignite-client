import Vue from 'vue';
import Vuex, {ActionTree} from 'vuex';
import {fetchServiceConfig} from '@/apis';
import types from './types';

export const state: StateType = {
  loading: false,
  userInfo: {},
  serviceConfig: {},
  nodes: [],
  nodesHeart: {},
};

export interface StateType {
  userInfo?: UserInfo;
  serviceConfig?: ServiceConfig;
  loading: boolean;
  nodes: object[];
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

export interface ServiceConfig {
  servers?: string[];
  ssMethods?: string[];
  ssrMethods?: string[];
}

