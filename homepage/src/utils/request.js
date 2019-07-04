import axios from 'axios';

const request = axios.create({
  timeout: 3 * 60 * 1000, // 3 minutes
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

request.interceptors.response.use(response => response.data);

export function postUserLogin(payload) {
  return request.post('/api/user/login', payload);
}

export function postAdminLogin(payload) {
  return request.post('/api/admin/login', payload);
}

export function postUserRegister(payload) {
  return request.post('/api/user/register', payload);
}
