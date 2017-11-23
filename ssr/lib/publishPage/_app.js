const data = [{"guid":"ab1b2580-8d5e-4412-8a76-f11fa5e086e8","name":"layer","attrs":{"style":{"layout":{"height":"800","backgroundColor":"rgba(238, 236, 248, 1)","borderStyle":"dashed","borderWidth":1}}},"children":[{"guid":"ec-module-11122-42a6-490e-99ac-b4a1686d5fd5","name":"layer"},{"guid":"ec-module-e6bed695-577a-4639-be0c-54c38f5a4b7c","name":"goods","attrs":{"row":"3","col":"5","style":{"layout":{"width":"3211","margin":"0"}}}}]},{"guid":"ec-module-bd54abf3-42a6-490e-99ac-b4a1686d5fd5","name":"tabs","dataTrans":{"activeKey":"0","data":[{"key":"0","title":"Tab 2222","content":"Content 1"},{"key":"1","title":"Tab 2","content":"Content 2"}]}},{"guid":"ec-module-3c02c9cc-3ab6-49ef-bf80-a46961132fa5","name":"layer"},{"guid":"ec-module-7733e4cb-8cd5-45e4-acc7-1ab5bcffe6c5","name":"tabs"},{"guid":"ec-module-6a48dfdc-19a8-44e1-8f81-98f0e0e641fa","name":"layer"}]

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
  _reactDom2.default.render(_react2.default.createElement(_viewer2.default, { data: data }), document.getElementById('topicRoot'), function () {
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