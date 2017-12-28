/**
 * @file webpack.config.js
 * @author deo
 *
 */
var glob = require('glob');
var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var HtmlWebPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var ROOT_PATH = path.resolve(__dirname);
var ENV = process.env.NODE_ENV;
var CONF = process.env.CONF;

var __PRO__ = ENV === 'production';
var configFiles = glob.sync(process.cwd() + '/config/*.js');

var isWebFeSelf = __dirname === process.cwd();

var PRO_ROOT = path.resolve(process.cwd(), '../');
var ROOT = path.resolve(process.cwd(), '');

/**
 * 获取公有配置
 * @returns {*}
 */
function getPublicConfig() {
    var f = null;
    var type = !CONF ? '' : '.' + CONF;
    var fileName = 'config' + type + '.js';

    configFiles.forEach(function (item) {
        var expr = new RegExp(fileName + '$');
        if (expr.test(item)) {
            f = item;
        }
    });

    if (f === null) {
        throw new Error('Required {PRODUCT CONFIG PATH}: ' + file);
    }

    return f;
}

var publicConfig = getPublicConfig();

var scriptString = fs.readFileSync(publicConfig);

var webpackConfig = {
    devtool: 'source-map',
    entry: {
        vendor: [
            'react',
            'react-dom',
        ],
        index: './src/index',
    },
    output: {
        path: path.resolve(process.cwd(), './dist/'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash].chunk.js'
    },
    plugins: [
        // 开启全局的模块热替换（HMR）
        new webpack.HotModuleReplacementPlugin(),

        // 当模块热替换（HMR）时在浏览器控制台输出对用户更友好的模块名字信息
        new webpack.NamedModulesPlugin(),

        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     minChunks: Infinity
        // }),

        new HtmlWebPlugin({
            filename: 'index.html',
            template: './src/index.html',
            config: scriptString,
            chunks: ['index', 'vendor'],
            inject: 'body',
        }),
    ],
    resolve: {
        // 省略后缀
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            'freed-multi': path.resolve(__dirname, './node_modules/freed-multi'),
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        // options: babelOptions,
                        options: {
                            plugins: [
                                ['import', [{ libraryName: 'antd', style: 'css' }]],
                            ],
                        }
                    }
                ],
                include: [
                    path.resolve(ROOT, './src'),
                    path.resolve(ROOT, './components'),
                ],
            },
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'ts-loader'],
                exclude: /node_modules/,
            },
            // {
            //     enforce: 'pre',
            //     test: /\.js$/,
            //     loader: 'source-map-loader'
            // },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'autoprefixer-loader',
                    'sass-loader',
                ]
                // use: ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: [
                //         'css-loader',
                //         'autoprefixer-loader',
                //         'sass-loader',
                //     ],
                // })
            },
            // less 加载器
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'autoprefixer-loader',
                    'less-loader',
                ]
                // loader: ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: [
                //         'css-loader',
                //         'autoprefixer-loader',
                //         'less-loader',
                //     ]
                // })
            },
            // css 加载器
            // Reference: https://github.com/webpack/style-loader
            // Reference: https://github.com/webpack/css-loader
            // Reference: https://github.com/webpack/autoprefixer-loader
            // Reference: https://github.com/webpack/extract-text-webpack-plugin
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'autoprefixer-loader'
                ]
                // loader: ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: [
                //         'css-loader',
                //         'autoprefixer-loader'
                //     ]
                // })
            },
            {
                // JSON资源文件加载器
                // Reference: https://github.com/webpack/json-loader
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                // 图片加载器
                test: /\.(png|jpg|gif|ttf|eot|svg|woff(2)?)(\?[=a-z0-9]+)?$/,
                loader: 'url-loader?limit=10000&name=images/[hash].[ext]'
            },
        ]
    },
};

module.exports = webpackConfig;
