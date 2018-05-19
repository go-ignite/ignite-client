import request from './request';

export function postUserLogin(payload: any) {
  return request.post('/api/user/login', payload);
}

export function postUserSignup(payload: any) {
  return request.post('/api/user/signup/', payload);
}
