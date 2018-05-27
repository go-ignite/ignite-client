import Vue from 'vue';
import Vuex, {ActionTree} from 'vuex';
import {fetchServiceConfig} from '@/apis';
import types from './types';

export const state: State = {
  userInfo: {},
  serviceConfig: [],
};

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

export interface State {
  userInfo: UserInfo;
  serviceConfig: object[];
}
