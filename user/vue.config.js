const path = require('path')

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
  configureWebpack: config => {
    // if (process.env.NODE_ENV === 'production') {
    //   config.output.publicPath = '/admin/'
    // }
  }
}

