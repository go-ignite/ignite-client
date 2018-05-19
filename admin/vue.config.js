const path = require('path')

module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: process.env.DEV_SERVER || 'http://localhost:8000'
  },
  outputDir: '../dist/admin',
  configureWebpack: config => {
    // if (process.env.NODE_ENV === 'production') {
    //   config.output.publicPath = '/admin/'
    // }
  }
}

