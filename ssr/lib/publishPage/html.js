"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Html = function (_React$Component) {
  (0, _inherits3.default)(Html, _React$Component);

  function Html() {
    (0, _classCallCheck3.default)(this, Html);
    return (0, _possibleConstructorReturn3.default)(this, (Html.__proto__ || (0, _getPrototypeOf2.default)(Html)).apply(this, arguments));
  }

  (0, _createClass3.default)(Html, [{
    key: "render",
    value: function render() {
      var extraProps = this.props.props;
      return React.createElement(
        "html",
        null,
        React.createElement(
          "head",
          null,
          React.createElement("meta", { charSet: "UTF-8" }),
          React.createElement("meta", { httpEquiv: "X-UA-Compatible", content: "IE=edge,chrome=1" }),
          React.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui" }),
          React.createElement("style", { dangerouslySetInnerHTML: { __html: this.props.style } })
        ),
        React.createElement(
          "body",
          null,
          React.createElement("div", { id: "topicRoot", dangerouslySetInnerHTML: { __html: this.props.body } }),
          React.createElement("script", { dangerouslySetInnerHTML: { __html: this.props.script } })
        )
      );
    }
  }]);
  return Html;
}(React.Component);

var _default = Html;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Html, "Html", "src/publishPage/html.js");

  __REACT_HOT_LOADER__.register(_default, "default", "src/publishPage/html.js");
}();

;