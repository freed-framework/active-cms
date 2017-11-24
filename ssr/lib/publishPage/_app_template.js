'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _viewer = require('../../../client/src/pages/viewer');

var _viewer2 = _interopRequireDefault(_viewer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (_ExecutionEnvironment.canUseDOM) {
  _reactDom2.default.render(_react2.default.createElement(_viewer2.default, { data: data, pageType: pageType }), document.getElementById('topicRoot'), function () {
    console.log('ReactDOM.render');
  });
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;