'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.compileTemplate = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var compileTemplate = exports.compileTemplate = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(page, timeStmp, id, sendProgress, socket) {
        var data, pageName, inputPath, inputFileName, outputPath, outputFileName, config, pageToString, varScripts, appScript, allScript, compiler;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        data = page.data;
                        pageName = page.name;


                        sendProgress(socket, id, '打包中', 10);

                        console.log('start to compile template: ', pageName);
                        inputPath = _path2.default.join(__dirname, '../publishPage/');
                        inputFileName = '_app.js';
                        outputPath = _path2.default.join(__dirname, '../../render/', timeStmp, '/');
                        outputFileName = 'app.bundle.js';
                        config = {
                            entry: inputPath + inputFileName,
                            output: {
                                path: outputPath,
                                filename: outputFileName,
                                publicPath: _env2.default.publicPath + '/' + timeStmp + '/'
                            },
                            module: {
                                loaders: loaders
                            },
                            plugins: plugins,
                            resolve: resolve
                        };
                        pageToString = (0, _stringify2.default)(data);
                        varScripts = 'const data = ' + pageToString + '\n\nconst pageType = "mobile"\n\n';
                        appScript = _fs2.default.readFileSync(_path2.default.join(inputPath, '_app_template.js')).toString();
                        allScript = varScripts + appScript;

                        console.log(_path2.default.join(inputPath, inputFileName));
                        _fs2.default.writeFileSync(_path2.default.join(inputPath, inputFileName), allScript);
                        sendProgress(socket, id, '打包中', 20);
                        compiler = (0, _webpack2.default)(config);
                        return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
                            compiler.run(function (err, stats) {
                                if (err) {
                                    reject(err);
                                    compiler = null;
                                } else {
                                    var outputFilePath = _path2.default.join(outputPath, outputFileName);
                                    var outputStylePath = _path2.default.join(outputPath, 'main.css');
                                    var jsonStats = stats.toJson();
                                    if (jsonStats.errors.length > 0) {
                                        reject(jsonStats.errors);
                                    }
                                    var fileContent = _fs2.default.readFileSync(outputFilePath);
                                    var styleContent = _fs2.default.readFileSync(outputStylePath);
                                    resolve({
                                        stats: stats,
                                        fileContent: fileContent,
                                        styleContent: styleContent,
                                        outputPath: outputPath,
                                        outputFileName: outputFileName
                                    });
                                }
                            });
                        }));

                    case 18:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function compileTemplate(_x, _x2, _x3, _x4, _x5) {
        return _ref.apply(this, arguments);
    };
}();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ncp = require('ncp');

var _ncp2 = _interopRequireDefault(_ncp);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

var _env = require('../env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var autoprefixer = require('autoprefixer');
var pxtorem = require('postcss-pxtorem');
// rem + css前缀
var postcssOpts = {
    ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
    plugins: function plugins() {
        return [autoprefixer({
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
        }), pxtorem({
            rootValue: 100 * (750 / 750),
            unitPrecision: 5,
            propList: ['*'],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0
        })];
    }
};

var loaders = [{
    test: /\.jsx?$/,
    use: ['babel-loader'],
    exclude: /node_modules/
}, {
    test: /\.tsx?$/,
    use: ['babel-loader', 'ts-loader'],
    exclude: /node_modules/
}, {
    test: /\.scss$/,
    use: _extractTextWebpackPlugin2.default.extract({
        fallback: 'style-loader',
        use: ['css-loader', { loader: 'postcss-loader', options: postcssOpts }, 'sass-loader']
    })
},
// less 加载器
{
    test: /\.less$/,
    loader: _extractTextWebpackPlugin2.default.extract({
        fallback: 'style-loader',
        use: ['css-loader', { loader: 'postcss-loader', options: postcssOpts }, 'less-loader']
    })
},
// css 加载器
// Reference: https://github.com/webpack/style-loader
// Reference: https://github.com/webpack/css-loader
// Reference: https://github.com/webpack/autoprefixer-loader
// Reference: https://github.com/webpack/extract-text-webpack-plugin
{
    test: /\.css$/,
    loader: _extractTextWebpackPlugin2.default.extract({
        fallback: 'style-loader',
        use: ['css-loader', { loader: 'postcss-loader', options: postcssOpts }]
    })
}, {
    // JSON资源文件加载器
    // Reference: https://github.com/webpack/json-loader
    test: /\.json$/,
    loader: 'json-loader'
}, {
    // 图片加载器
    test: /\.(png|jpg|gif|ttf|eot|svg|woff(2)?)(\?[=a-z0-9]+)?$/,
    loader: 'url-loader?limit=10000&name=images/[hash].[ext]'
}];

var plugins = [new _extractTextWebpackPlugin2.default({
    filename: '[name].css',
    allChunks: true
})
// ,
// new webpack.optimize.UglifyJsPlugin({
//     output: {
//         comments: false,  // remove all comments
//     },
//     compress: {
//         warnings: false
//     }
// })
];

var resolve = {
    // 省略后缀
    extensions: ['.js', '.jsx', '.ts', '.tsx']
};

;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(postcssOpts, 'postcssOpts', 'src/utils/compile.js');

    __REACT_HOT_LOADER__.register(loaders, 'loaders', 'src/utils/compile.js');

    __REACT_HOT_LOADER__.register(plugins, 'plugins', 'src/utils/compile.js');

    __REACT_HOT_LOADER__.register(resolve, 'resolve', 'src/utils/compile.js');

    __REACT_HOT_LOADER__.register(compileTemplate, 'compileTemplate', 'src/utils/compile.js');
}();

;