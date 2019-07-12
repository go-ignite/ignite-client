import request from './request';

export interface LoginPayload {
  username: string;
  password: string;
}

export function postUserLogin(payload: LoginPayload) {
  return request.post('/api/user/login', payload);
}

export function postAdminLogin(payload: LoginPayload) {
  return request.post('/api/admin/login', payload);
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
  return request.get('/api/user/services');
}

export function deleteServices(id: number) {
  return request.delete(`/api/user/auth/services/${id}`);
}

// 服务器配置信息
export function fetchServicesOptions() {
  return request.get('/api/user/services/options');
}

// 创建服务
export function postServices(payload: any) {
  return request.post('/api/user/services', payload);
}
