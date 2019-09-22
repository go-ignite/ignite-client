import axios from 'axios';
import localforage from 'localforage';
import { LOGIN_PAGE } from '@/config';

const $http = axios.create({
  timeout: 3 * 60 * 1000, // 3 minutes
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

$http.interceptors.request.use(
  async (config: any) => {
    const token = await localforage.getItem('ignite_token');
    if (token) {
      Object.defineProperty(config.headers, 'Authorization', {
        value: token,
        configurable: true,
        enumerable: true,
        writable: true,
      });
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

$http.interceptors.response.use(
  (response: any) => response.data,
  (error: any) => {
    if (error.response.status === 401) {
      localforage.removeItem('ignite_token');
      location.href = LOGIN_PAGE;
    }
    return Promise.reject(error);
  }
);

export default $http;
