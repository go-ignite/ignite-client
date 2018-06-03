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
  return request.get('/api/user/auth/service/config');
}

export function postServiceCreate(payload: any) {
  return request.post('/api/user/auth/service/create', payload);
}

