
module.exports = {
  lintOnSave: false,
  devServer: {
    port: 10001,
    proxy: {
      '/api': {
        target: process.env.DEV_SERVER || 'http://localhost:5000',
      }
    }
  },
  outputDir: '../dist/user',
  publicPath: process.env.NODE_ENV === 'production' ? '/user' : '/',
}

