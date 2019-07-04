const nodeEnv = process.env.NODE_ENV

export const LOGIN_PAGE = {
  development: 'http://127.0.0.1:10000',
  production: '/homepage',
}[nodeEnv]
