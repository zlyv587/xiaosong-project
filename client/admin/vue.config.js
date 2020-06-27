const path = require('path');

const STAGE_ENV = process.env.NODE_ENV || 'production';
let publicPath = '//localhost:8081/'
if (STAGE_ENV === 'development') {
  publicPath = './';
}









module.exports = {
  lintOnSave: true,
  publicPath,
  devServer: {
    disableHostCheck: true
  },
  // css: {
  //   loaderOptions: {
  //     // 全局变量
  //     sass: {
  //       data: '@import "~@/assets/css/_variable.scss";@import "~@/assets/css/_mixin.scss";'
  //     }
  //   }
  // },
  configureWebpack: config => {
    const { resolve = {} } = config;
    resolve.modules = [path.resolve('node_modules'), path.resolve(__dirname, './src')];
    if (STAGE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    }
  },
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      args[0]['process.env'] = {
        ...(args[0]['process.env'] || {}),
        NODE_ENV: JSON.stringify(STAGE_ENV)
      };
      return args;
    });
    if (STAGE_ENV !== 'development') {
      // 压缩图片
      config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          bypassOnDebug: true
        })
        .end();
    }
  }
};
