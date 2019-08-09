type NodeEnv = 'development' | 'production';
const nodeEnv =  process.env.NODE_ENV as NodeEnv;

export const LOGIN_PAGE = {
  development: 'http://127.0.0.1:10000',
  production: '/',
}[nodeEnv];

export const BACK_API = {
  development: process.env.DEV_SERVER || 'http://127.0.0.1:5000',
  production: '/',
}[nodeEnv];

export const ROUTE_BASE = {
  development: '/',
  production: '/user',
}[nodeEnv];
