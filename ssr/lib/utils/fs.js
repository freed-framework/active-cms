'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ncp = require('ncp');

var _ncp2 = _interopRequireDefault(_ncp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var exists = function exists(filename) {
  return new _promise2.default(function (resolve) {
    _fs2.default.exists(filename, resolve);
  });
};

var stat = function stat(filename) {
  return new _promise2.default(function (resolve, reject) {
    _fs2.default.stat(filename, function (err, stat) {
      if (err) {
        reject(err);
      } else {
        resolve(stat);
      }
    });
  });
};

var access = function access(filename) {
  return new _promise2.default(function (resolve, reject) {
    _fs2.default.access(filename, _fs2.default.R_OK, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

var readFile = function readFile(filename) {
  return new _promise2.default(function (resolve, reject) {
    _fs2.default.readFile(filename, 'utf8', function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

var writeFile = function writeFile(filename, content) {
  return new _promise2.default(function (resolve, reject) {
    _fs2.default.writeFile(filename, content, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

var readdir = function readdir(filename) {
  return new _promise2.default(function (resolve, reject) {
    _fs2.default.readdir(filename, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

var copy = function copy(source, destination, options) {
  return new _promise2.default(function (resolve, reject) {
    options = options ? options : {};
    (0, _ncp2.default)(source, destination, options, function (err) {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

var _default = { exists: exists, stat: stat, access: access, readFile: readFile, writeFile: writeFile, readdir: readdir, copy: copy };
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(exists, 'exists', 'src/utils/fs.js');

  __REACT_HOT_LOADER__.register(stat, 'stat', 'src/utils/fs.js');

  __REACT_HOT_LOADER__.register(access, 'access', 'src/utils/fs.js');

  __REACT_HOT_LOADER__.register(readFile, 'readFile', 'src/utils/fs.js');

  __REACT_HOT_LOADER__.register(writeFile, 'writeFile', 'src/utils/fs.js');

  __REACT_HOT_LOADER__.register(readdir, 'readdir', 'src/utils/fs.js');

  __REACT_HOT_LOADER__.register(copy, 'copy', 'src/utils/fs.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/utils/fs.js');
}();

;