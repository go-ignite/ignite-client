const nodeEnv: 'development' | 'production' = process.env.NODE_ENV;

export const ADMIN_LOGIN = {
  development: 'http://127.0.0.1:10002/login',
  production: '/admin/login',
}[nodeEnv];

export const BACK_API: string = {
  development: process.env.DEV_SERVER || 'http://127.0.0.1:5000',
  production: '/',
}[nodeEnv];
