const nodeEnv: any = process.env.NODE_ENV;

const backServer = {
  development: process.env.DEV_SERVER || 'http://127.0.0.1:5000',
  testbuild: 'https://wwwapi.qixincha.com',
  production: 'https://wwwapi.qixincha.com',
};

export const BACK_API: string = (backServer as any)[nodeEnv];
