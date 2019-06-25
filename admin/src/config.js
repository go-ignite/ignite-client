const nodeEnv = process.env.NODE_ENV

export const LOGIN_PAGE = {
  development: 'http://127.0.0.1:10001',
  production: '/user',
}[nodeEnv]
