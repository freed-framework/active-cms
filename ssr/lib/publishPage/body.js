'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _normalize = require('../../../node_modules/normalize.css/normalize.css');

var _normalize2 = _interopRequireDefault(_normalize);

var _withStyles = require('../../decorators/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var newKey = function newKey() {
  var key = ((Math.random() + 1) * 100000).toString(16);
  return key;
};

var Page = (_dec = (0, _withStyles2.default)(_normalize2.default), _dec(_class = function (_Component) {
  (0, _inherits3.default)(Page, _Component);

  function Page() {
    (0, _classCallCheck3.default)(this, Page);
    return (0, _possibleConstructorReturn3.default)(this, (Page.__proto__ || (0, _getPrototypeOf2.default)(Page)).apply(this, arguments));
  }

  (0, _createClass3.default)(Page, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var components = this.props.page.components;
      var coms = components.map(function (component, index) {
        var Com = void 0;
        console.log('this.props.serverRendering', _this2.props.serverRendering);
        if (_this2.props.serverRendering) {
          // todo felix
          console.log('serverRendering!!!!!!!', component.fileContent.length);
          Com = eval(component.fileContent);
        } else {
          Com = _this2.props.Coms[index];
        }
        return _react2.default.createElement(
          'div',
          { className: 'component', key: newKey() },
          _react2.default.createElement(Com, component.config.props)
        );
      });
      return _react2.default.createElement(
        'div',
        { className: 'PreviewPage' },
        coms
      );
    }
  }]);
  return Page;
}(_react.Component)) || _class);
var _default = Page;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(newKey, 'newKey', 'src/publishPage/body.js');

  __REACT_HOT_LOADER__.register(Page, 'Page', 'src/publishPage/body.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/publishPage/body.js');
}();

;