'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _got = require('got');

var _got2 = _interopRequireDefault(_got);

var _needle = require('needle');

var _needle2 = _interopRequireDefault(_needle);

var _zipfolder = require('zipfolder');

var _zipfolder2 = _interopRequireDefault(_zipfolder);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

var _env = require('./env');

var _env2 = _interopRequireDefault(_env);

var _compile = require('../lib/utils/compile');

var _html = require('../lib/publishPage/html');

var _html2 = _interopRequireDefault(_html);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cpy = require('cpy');

var nodeENV = process.env.NODE_ENV;

function sendProgress(io, id, message, progress, data) {
    io.emit('push:progress:' + id, { code: 200, message: message, progress: progress, data: data });
}

function sendProgressFail(io, id, message, progress, data) {
    io.emit('push:progress:' + id, { code: 500, message: message, progress: progress, data: data });
}

var download = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
        var socket, timeStmp, baseUrl, folderZipPath;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        socket = req.socket;
                        /**
                         * id {string} 页面id
                         * uploadUserId {string} 上传用户
                         * description {string} 描述
                         * effectTime {Date} 生效时间
                         * invalidTime {Date} 有效时间
                         * activityName {sting} 活动名称
                         */
                        // const {
                        //     id, uploadUserId, content, title,
                        //     ...field
                        // } = req.body;
                        // sendProgress(socket, id, "开始构建", 1);

                        // const page = {data: content, name: title};

                        timeStmp = '' + new Date() * 1;
                        baseUrl = _path2.default.join(__dirname, '../render', timeStmp);
                        folderZipPath = baseUrl + '.zip';


                        if (!_fs2.default.existsSync(baseUrl)) {
                            _fs2.default.mkdirSync(baseUrl);
                        }
                        cpy(['../client/dist-ssr/*'], baseUrl).then(function () {
                            var htmlString = _fs2.default.readFileSync(baseUrl + '/index.html', "utf-8");
                            var newHtmlString = htmlString.replace(/(\/ssrPath\/)/ig, 'http://localhost/');
                            _fs2.default.writeFileSync(baseUrl + '/index.html', newHtmlString);

                            var scriptString = _fs2.default.readFileSync(baseUrl + '/index.js', "utf-8");
                            var newScriptString = scriptString.replace(/{data:\[\],pageType:\"mobile\"}/ig, function () {
                                return "{data: [{name: 'shijh'}],pageType: 'pc'}";
                            });
                            _fs2.default.writeFileSync(baseUrl + '/index.js', newScriptString);
                            _zipfolder2.default.zipFolder({ folderPath: baseUrl });
                        });
                        next();

                    case 7:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function download(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

var _default = download;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(nodeENV, 'nodeENV', 'src/ssr.js');

    __REACT_HOT_LOADER__.register(sendProgress, 'sendProgress', 'src/ssr.js');

    __REACT_HOT_LOADER__.register(sendProgressFail, 'sendProgressFail', 'src/ssr.js');

    __REACT_HOT_LOADER__.register(download, 'download', 'src/ssr.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/ssr.js');
}();

;