'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var io = require('socket.io')(5555, {
  path: '/push',
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

io.on('connection', function (socket) {
  socket.emit('connection', '链接成功');
});

var Progress = function () {
  function Progress() {
    (0, _classCallCheck3.default)(this, Progress);
  }

  (0, _createClass3.default)(Progress, [{
    key: 'emit',
    value: function emit(voucher, data) {
      io.emit(voucher, data);
    }
  }]);
  return Progress;
}();

var _default = Progress;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(io, 'io', 'src/socket.js');

  __REACT_HOT_LOADER__.register(Progress, 'Progress', 'src/socket.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/socket.js');
}();

;