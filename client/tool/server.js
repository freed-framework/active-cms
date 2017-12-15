/**
 * @file dev.server.js
 * @author deo
 *
 * 本地服务
 */
var path = require('path');
var process = require('process');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

/**
 * 引入构建配置
 */
var webpackConfig = require('../webpack.config');

var devConfig = {
    publicPath: '/',
    // host: 'localhost',
    host: '172.30.120.73',
    port: 8899,
    // 开启服务器的模块热替换（HMR）
    hot: true,
    inline: true,
    historyApiFallback: {
        index: '/'
    },
    stats: {
        colors: true
    }
};

/**
 * 准备启动本地服务
 */
var compiler = webpack(webpackConfig);

/**
 * webpack dev service 配置
 */
var server = new WebpackDevServer(compiler, devConfig);

/**
 * 启动本地服务环境
 */
server.listen(devConfig.port, devConfig.host, function (error) {
    if (error) {
        console.error(error);
    } else {
        console.info('Listening on port %s. ' +
            'Open up http://' + devConfig.host + ':%s/ in your browser.',
            devConfig.port, devConfig.port);
    }
});
