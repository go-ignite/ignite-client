const path = require('path')
const {ROUTE_BASE} = require('./src/config')

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
  publicPath: ROUTE_BASE,
  configureWebpack: config => {
    // if (process.env.NODE_ENV === 'production') {
    //   config.output.publicPath = '/admin/'
    // }
  }
}

