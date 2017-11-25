'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var nodeENV = process.env.NODE_ENV;

function sendProgress(io, id, message, progress, data) {
    io.emit('push:progress:' + id, { code: 200, message: message, progress: progress, data: data });
}

function sendProgressFail(io, id, message, progress, data) {
    io.emit('push:progress:' + id, { code: 500, message: message, progress: progress, data: data });
}

var download = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
        var socket, _req$body, id, uploadUserId, content, title, field, page, timeStmp, _template, props, htmlString, destHtml, folderPath, folderZipPath, formData;

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

                        _req$body = req.body, id = _req$body.id, uploadUserId = _req$body.uploadUserId, content = _req$body.content, title = _req$body.title, field = (0, _objectWithoutProperties3.default)(_req$body, ['id', 'uploadUserId', 'content', 'title']);

                        sendProgress(socket, id, "开始构建", 1);

                        page = { data: content, name: title };
                        timeStmp = '' + id + new Date() * 1;
                        _context.prev = 5;
                        _context.next = 8;
                        return (0, _compile.compileTemplate)(page, timeStmp, id, sendProgress, socket);

                    case 8:
                        _template = _context.sent;

                        sendProgress(socket, id, "构建完成", 60);
                        props = {};

                        props.script = _template.fileContent.toString();
                        props.style = _template.styleContent.toString();
                        htmlString = _server2.default.renderToStaticMarkup(_react2.default.createElement(_html2.default, props));
                        destHtml = _template.outputPath + '/index.html';

                        _fs2.default.writeFileSync(destHtml, htmlString);
                        folderPath = _path2.default.join(__dirname, '../render', timeStmp);
                        folderZipPath = folderPath + '.zip';


                        sendProgress(socket, id, "打包中", 70);
                        _context.next = 21;
                        return _zipfolder2.default.zipFolder({ folderPath: folderPath });

                    case 21:
                        sendProgress(socket, "打包完成", 80);
                        // res.download(folderZipPath);

                        formData = (0, _extends3.default)({
                            uploadUserId: uploadUserId
                        }, field, {
                            file: {
                                value: _fs2.default.createReadStream(folderZipPath),
                                options: {
                                    filename: timeStmp + '.zip'
                                }
                            }
                        });

                        sendProgress(socket, id, "推送zip", 85);
                        _request2.default.post({ url: _env2.default.domain + '/api/publish/zip', formData: formData }, function (err, httpResponse, body) {
                            body = JSON.parse(body) || {};
                            if (err) {
                                res.status(500).send(err);
                                return;
                            }
                            (0, _rimraf2.default)(folderPath, {}, function () {});
                            (0, _rimraf2.default)(folderZipPath, {}, function () {});
                            sendProgress(socket, id, "推送成功", 100, body);
                            _template = null;
                            res.status(200).send(body);
                        });
                        _context.next = 32;
                        break;

                    case 27:
                        _context.prev = 27;
                        _context.t0 = _context['catch'](5);

                        sendProgressFail(socket, id, "推送失败", 0);
                        template = null;
                        next(_context.t0);

                    case 32:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[5, 27]]);
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

    __REACT_HOT_LOADER__.register(nodeENV, 'nodeENV', 'src/download.js');

    __REACT_HOT_LOADER__.register(sendProgress, 'sendProgress', 'src/download.js');

    __REACT_HOT_LOADER__.register(sendProgressFail, 'sendProgressFail', 'src/download.js');

    __REACT_HOT_LOADER__.register(download, 'download', 'src/download.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/download.js');
}();

;