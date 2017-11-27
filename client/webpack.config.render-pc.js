/**
 * @file webpack.config.js
 * @author deo
 *
 */

var path = require('path');
var webpack = require('webpack');
var HtmlWebPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var ROOT_PATH = path.resolve(__dirname);

// let babelOptions = {
//     "presets": [
//         ["es2015", { "modules": false }],
//         "react",
//         "stage-0"
//     ],
//     "plugins": [
//         "react-hot-loader/babel",
//         "transform-decorators-legacy",
//         "transform-async-to-generator",
//         "transform-do-expressions",
//         "transform-runtime"
//     ]
// }
// 调用 framework

const PRO_ROOT = path.resolve(process.cwd(), '../');
const ROOT = path.resolve(process.cwd(), '');

var webpackConfig = {
    // devtool: 'source-map',
    entry: {
        vendor: [
            'react',
            'react-dom',
        ],
        index: './render/pc/App.jsx',
    },
    output: {
        path: path.resolve(process.cwd(), './pkg-pc/'),
        publicPath: '/ssrPath/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),

        new HtmlWebPlugin({
            filename: 'index.html',
            template: './render/pc/index.html',
            chunks: ['vendor', 'index'],
            inject: 'body',
        }),

        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true,
        }),

        // new webpack.optimize.UglifyJsPlugin({
        //     output: {
        //         comments: false,  // remove all comments
        //     },
        //     compress: {
        //         warnings: false
        //     }
        // })
    ],
    resolve: {
        // 省略后缀
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: [
                                ['import', [{ libraryName: 'antd', style: 'css' }]],
                            ],
                        }
                    }
                ],
                include: [
                    path.resolve(ROOT, './src'),
                    path.resolve(ROOT, './render'),
                    path.resolve(ROOT, './components'),
                ],
            },
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'ts-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'autoprefixer-loader',
                        'sass-loader',
                    ],
                })
            },
            // less 加载器
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'autoprefixer-loader',
                        'less-loader',
                    ]
                })
            },
            // css 加载器
            // Reference: https://github.com/webpack/style-loader
            // Reference: https://github.com/webpack/css-loader
            // Reference: https://github.com/webpack/autoprefixer-loader
            // Reference: https://github.com/webpack/extract-text-webpack-plugin
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'autoprefixer-loader'
                    ]
                })
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
            }
        ]
    },
};

module.exports = webpackConfig;
