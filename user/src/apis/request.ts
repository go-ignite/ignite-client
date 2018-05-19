import axios from 'axios';
import { BACK_API } from '@/config';

const $http = axios.create({
  baseURL: BACK_API,
  timeout: 3 * 60 * 1000, // 3 minutes
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

$http.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('ignite_token');
    if (token) {
      Object.defineProperty(config.headers, 'Authorization', {
        value: `Bearer ${token}`,
        configurable: true,
        enumerable: true,
        writable: true,
      });
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

$http.interceptors.response.use(
  (response: any) => response.data,
  (error: any) => {
    if (error.response.status === 401) {
      localStorage.removeItem('ignite_token');
      location.href = '/';
    }

    return Promise.reject(error);
  }
);

export default $http;
