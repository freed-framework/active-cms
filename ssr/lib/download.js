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

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _got = require('got');

var _got2 = _interopRequireDefault(_got);

var _zipfolder = require('zipfolder');

var _zipfolder2 = _interopRequireDefault(_zipfolder);

var _env = require('./env');

var _env2 = _interopRequireDefault(_env);

var _compile = require('../lib/utils/compile');

var _html = require('../lib/publishPage/html');

var _html2 = _interopRequireDefault(_html);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nodeENV = process.env.NODE_ENV;

var download = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
        var id, page, timeStmp, data, props, htmlString, destHtml, folderPath, folderZipPath, access;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        id = req.query.id;
                        page = {};
                        timeStmp = '' + id + new Date() * 1;
                        _context.next = 5;
                        return (0, _got2.default)(_env2.default.domain + '/api/page/query/' + id).then(function (response) {
                            var _JSON$parse$data = JSON.parse(response.body).data,
                                content = _JSON$parse$data.content,
                                title = _JSON$parse$data.title;

                            page.data = content;
                            page.name = title;
                        });

                    case 5:
                        _context.prev = 5;
                        _context.next = 8;
                        return (0, _compile.compileTemplate)(page, timeStmp);

                    case 8:
                        data = _context.sent;
                        props = {};

                        props.script = data.fileContent.toString();
                        props.style = data.styleContent.toString();
                        htmlString = _server2.default.renderToStaticMarkup(_react2.default.createElement(_html2.default, props));
                        destHtml = data.outputPath + '/index.html';

                        _fs2.default.writeFileSync(destHtml, htmlString);
                        folderPath = _path2.default.join(__dirname, '../render', timeStmp);
                        folderZipPath = folderPath + '.zip';
                        access = true;
                        _context.next = 20;
                        return _fs2.default.access(folderPath, function (err) {
                            if (err) {
                                access = false;
                            }
                        });

                    case 20:
                        if (!access) {
                            _context.next = 28;
                            break;
                        }

                        console.log('zip......');
                        _context.next = 24;
                        return _zipfolder2.default.zipFolder({ folderPath: folderPath });

                    case 24:
                        console.log('download......');
                        res.download(folderZipPath);
                        _context.next = 29;
                        break;

                    case 28:
                        res.status(404).send({
                            retcode: 404,
                            msg: 'zip 压缩包不存在'
                        });

                    case 29:
                        _context.next = 34;
                        break;

                    case 31:
                        _context.prev = 31;
                        _context.t0 = _context['catch'](5);

                        next(_context.t0);

                    case 34:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[5, 31]]);
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

    __REACT_HOT_LOADER__.register(download, 'download', 'src/download.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/download.js');
}();

;