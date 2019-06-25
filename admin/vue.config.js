const path = require('path')

module.exports = {
  lintOnSave: false,
  devServer: {
    port: 10002,
    proxy: {
      '/api': {
        target: process.env.DEV_SERVER || 'http://localhost:5000',
      }
    }
  },
  outputDir: '../dist/admin',
  configureWebpack: config => {
    // if (process.env.NODE_ENV === 'production') {
    //   config.output.publicPath = '/admin/'
    // }
  }
}

