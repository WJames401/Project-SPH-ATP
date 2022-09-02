const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 不打包map文件，dist文件体积更小
  productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false,
  // 代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn'
      }
    }
  }
})
