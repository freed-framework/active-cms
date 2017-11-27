'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

var _uploadZip = require('./uploadZip');

var _uploadZip2 = _interopRequireDefault(_uploadZip);

var _env = require('./env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nodeENV = process.env.NODE_ENV;

var download = function download(req, res, next) {
    var socket = req.socket,
        body = req.body;


    socket.emit('push:progress:' + body.id, {
        code: 200,
        progress: 1,
        message: "开始构建"
    });

    (0, _template2.default)(body.id, socket, body).then(function (_ref) {
        var folderZipPath = _ref.folderZipPath,
            baseUrl = _ref.baseUrl,
            timeStmp = _ref.timeStmp;

        (0, _uploadZip2.default)({ folderZipPath: folderZipPath, baseUrl: baseUrl, timeStmp: timeStmp, body: body }).then(function (result) {
            res.status(200).json(result);

            socket.emit('push:progress:' + body.id, {
                code: 200,
                progress: 100,
                message: "推送成功"
            });
        }).catch(function (e) {
            res.status(500).json(e);

            socket.emit('push:progress:' + body.id, {
                code: 500,
                progress: 0,
                message: "推送失败"
            });
        });
    }).catch(function (e) {
        res.status(500).json(e);

        socket.emit('push:progress:' + body.id, {
            code: 500,
            progress: 0,
            message: "推送失败"
        });
    });
};

var _default = download;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(nodeENV, 'nodeENV', 'src/push.js');

    __REACT_HOT_LOADER__.register(download, 'download', 'src/push.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/push.js');
}();

;