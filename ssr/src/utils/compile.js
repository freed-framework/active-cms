import path from 'path';
import webpack from 'webpack';
import fs from 'fs';
import ncp from 'ncp';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ENV from '../env';

const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
// rem + css前缀
const postcssOpts = {
    ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
    plugins: () => [
        autoprefixer({
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
        }),
        pxtorem({
            rootValue: 100 * (750 / 750),
            unitPrecision: 5,
            propList: ['*'],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 0
        })
    ],
};

const loaders = [
    {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
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
                { loader: 'postcss-loader', options: postcssOpts },
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
                { loader: 'postcss-loader', options: postcssOpts },
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
                { loader: 'postcss-loader', options: postcssOpts }
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
];

const plugins = [
    new ExtractTextPlugin({
        filename: '[name].css',
        allChunks: true,
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

const resolve = {
    // 省略后缀
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
};

export async function compileTemplate(page, timeStmp, id, sendProgress) {
    const data = page.data;
    const pageName = page.name;

    sendProgress(id, '打包中', 10);

    console.log('start to compile template: ', pageName);
    const inputPath = path.join(__dirname, '../publishPage/');
    const inputFileName = '_app.js';
    const outputPath = path.join(__dirname, '../../render/',  timeStmp, '/');
    const outputFileName = 'app.bundle.js';
    var config = {
        entry: inputPath + inputFileName,
        output: {
            path: outputPath,
            filename: outputFileName,
            publicPath: `${ENV.publicPath}/${timeStmp}/`
        },
        module: {
            loaders: loaders
        },
        plugins: plugins,
        resolve: resolve
    };

    const pageToString = JSON.stringify(data);
    const varScripts = `const data = ${pageToString}\n\nconst pageType = "mobile"\n\n`;
    const appScript = fs.readFileSync(path.join(inputPath, '_app_template.js')).toString();
    const allScript = varScripts + appScript;
    console.log(path.join(inputPath, inputFileName))
    fs.writeFileSync(path.join(inputPath, inputFileName), allScript);
    sendProgress(id, '打包中', 20);
    var compiler = webpack(config);

    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) {
                reject(err);
            } else {
                const outputFilePath = path.join(outputPath, outputFileName);
                const outputStylePath = path.join(outputPath, 'main.css');
                const jsonStats = stats.toJson();
                if (jsonStats.errors.length > 0) {
                    reject(jsonStats.errors);
                }
                const fileContent = fs.readFileSync(outputFilePath);
                const styleContent = fs.readFileSync(outputStylePath);
                resolve({
                    stats: stats,
                    fileContent: fileContent,
                    styleContent: styleContent,
                    outputPath: outputPath,
                    outputFileName: outputFileName,
                });
                console.log('end compile template: ', pageName);
            }
        });
    });
}

