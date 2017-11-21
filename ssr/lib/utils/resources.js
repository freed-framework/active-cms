'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getComponent = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(project, name) {
    var configPath, config, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            configPath = _path2.default.join(basedir, project, 'components', name, 'package.json');
            _context.next = 3;
            return _fs2.default.readFile(configPath);

          case 3:
            config = _context.sent;

            config = JSON.parse(config);
            result = {
              project: project,
              name: name,
              config: config
            };
            return _context.abrupt('return', result);

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getComponent(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getComponents = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var results, projects, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, project, componentDir, components, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, name, result;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            results = [];
            _context2.next = 3;
            return _fs2.default.readdir(basedir);

          case 3:
            projects = _context2.sent;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 7;
            _iterator = (0, _getIterator3.default)(projects);

          case 9:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 46;
              break;
            }

            project = _step.value;
            componentDir = _path2.default.join(basedir, project, 'components');
            _context2.next = 14;
            return _fs2.default.readdir(componentDir);

          case 14:
            components = _context2.sent;
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context2.prev = 18;
            _iterator2 = (0, _getIterator3.default)(components);

          case 20:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context2.next = 29;
              break;
            }

            name = _step2.value;
            _context2.next = 24;
            return getComponent(project, name);

          case 24:
            result = _context2.sent;

            results.push(result);

          case 26:
            _iteratorNormalCompletion2 = true;
            _context2.next = 20;
            break;

          case 29:
            _context2.next = 35;
            break;

          case 31:
            _context2.prev = 31;
            _context2.t0 = _context2['catch'](18);
            _didIteratorError2 = true;
            _iteratorError2 = _context2.t0;

          case 35:
            _context2.prev = 35;
            _context2.prev = 36;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 38:
            _context2.prev = 38;

            if (!_didIteratorError2) {
              _context2.next = 41;
              break;
            }

            throw _iteratorError2;

          case 41:
            return _context2.finish(38);

          case 42:
            return _context2.finish(35);

          case 43:
            _iteratorNormalCompletion = true;
            _context2.next = 9;
            break;

          case 46:
            _context2.next = 52;
            break;

          case 48:
            _context2.prev = 48;
            _context2.t1 = _context2['catch'](7);
            _didIteratorError = true;
            _iteratorError = _context2.t1;

          case 52:
            _context2.prev = 52;
            _context2.prev = 53;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 55:
            _context2.prev = 55;

            if (!_didIteratorError) {
              _context2.next = 58;
              break;
            }

            throw _iteratorError;

          case 58:
            return _context2.finish(55);

          case 59:
            return _context2.finish(52);

          case 60:
            return _context2.abrupt('return', results);

          case 61:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[7, 48, 52, 60], [18, 31, 35, 43], [36,, 38, 42], [53,, 55, 59]]);
  }));

  return function getComponents() {
    return _ref2.apply(this, arguments);
  };
}();

var _fs = require('./fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var basedir = _path2.default.join(__dirname, '../src/resources/');

var _default = { getComponent: getComponent, getComponents: getComponents };
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(basedir, 'basedir', 'src/utils/resources.js');

  __REACT_HOT_LOADER__.register(getComponent, 'getComponent', 'src/utils/resources.js');

  __REACT_HOT_LOADER__.register(getComponents, 'getComponents', 'src/utils/resources.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/utils/resources.js');
}();

;