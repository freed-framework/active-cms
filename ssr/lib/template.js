'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _zipfolder = require('zipfolder');

var _zipfolder2 = _interopRequireDefault(_zipfolder);

var _env = require('./env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var child_process = require('child_process');

var cpy = require('cpy');


var nodeENV = process.env.NODE_ENV || 'development';
var publicPath = /(\/ssrPath\/)/ig;

var filePath = _env2.default.publicPath[nodeENV];

var Template = function Template(id, socket, body) {
    return new _promise2.default(function (resolve, reject) {
        var pageType = body.pageType;

        var timeStmp = '' + id + new Date() * 1;
        var baseUrl = _path2.default.join(__dirname, '../render', timeStmp);
        var folderZipPath = baseUrl + '.zip';

        socket.emit('push:progress:' + id, {
            code: 200,
            progress: 10,
            message: "开始打包"
        });

        if (!_fs2.default.existsSync(baseUrl)) {
            _fs2.default.mkdirSync(baseUrl);
        }

        socket.emit('push:progress:' + id, {
            code: 200,
            progress: 12,
            message: "开始复制页面"
        });
        console.log(123123123123);
        cpy(['../client/pkg-' + pageType + '/*'], baseUrl).then(function () {
            socket.emit('push:progress:' + id, {
                code: 200,
                progress: 30,
                message: "复制完成"
            });

            // 修改html中地址
            var htmlString = _fs2.default.readFileSync(baseUrl + '/index.html', "utf-8");
            var newHtmlString = htmlString.replace(publicPath, '' + filePath + timeStmp + '/');
            _fs2.default.writeFileSync(baseUrl + '/index.html', newHtmlString);

            socket.emit('push:progress:' + id, {
                code: 200,
                progress: 40,
                message: "替换html文件"
            });

            // // 修改vendor中地址
            // const svendorString = fs.readFileSync(baseUrl + '/vendor.js', "utf-8");
            // const newVendorString = svendorString.replace(publicPath, `${ENV.publicPath}${timeStmp}/`);
            // fs.writeFileSync(baseUrl + '/vendor.js', newVendorString);

            socket.emit('push:progress:' + id, {
                code: 200,
                progress: 50,
                message: "替换vendor.js文件"
            });

            // 修改index.js 中模板数据
            var scriptString = _fs2.default.readFileSync(baseUrl + '/index.js', "utf-8");
            var newScriptString = scriptString.replace(/({data:\[\],pageType:\"mobile\"})|(\/ssrPath\/)/ig, function ($0, $1, $2) {
                if ($1) {
                    return '{data: ' + (0, _stringify2.default)(body.content) + ',pageType: "' + pageType + '"}';
                }
                if ($2) {
                    return '' + filePath + timeStmp + '/';
                }
            });

            socket.emit('push:progress:' + id, {
                code: 200,
                progress: 60,
                message: "替换index.js文件"
            });

            _fs2.default.writeFileSync(baseUrl + '/index.js', newScriptString);
            _zipfolder2.default.zipFolder({ folderPath: baseUrl }, function () {
                resolve({ folderZipPath: folderZipPath, baseUrl: baseUrl, timeStmp: timeStmp });
            });
        });
    });
};

var _default = Template;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(nodeENV, 'nodeENV', 'src/template.js');

    __REACT_HOT_LOADER__.register(publicPath, 'publicPath', 'src/template.js');

    __REACT_HOT_LOADER__.register(filePath, 'filePath', 'src/template.js');

    __REACT_HOT_LOADER__.register(Template, 'Template', 'src/template.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/template.js');
}();

;