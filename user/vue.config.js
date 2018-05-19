const path = require('path')

module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: process.env.DEV_SERVER || 'http://localhost:5000'
  },
  outputDir: '../dist/user',
  configureWebpack: config => {
    // if (process.env.NODE_ENV === 'production') {
    //   config.output.publicPath = '/admin/'
    // }
  }
}

