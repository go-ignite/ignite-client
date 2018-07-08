import request from './request';

export function postUserLogin(payload: any) {
  return request.post('/api/user/login', payload);
}

export function postUserSignup(payload: any) {
  return request.post('/api/user/signup', payload);
}

export function fetchUserInfo(payload: any) {
  return request.get('/api/user/auth/info', payload);
}

export function fetchServiceConfig() {
  return request.get('/api/user/auth/services/config');
}

export function postServiceCreate(nodeId: string, payload: any) {
  return request.post(`/api/user/auth/nodes/${nodeId}/services/`, payload);
}

export function fetchNodes() {
  return request.get('/api/user/auth/nodes');
}

export function fetchServices() {
  return request.get('/api/user/auth/services');
}
