'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forceUpdate = forceUpdate;
function forceUpdate(component) {
  // This is a hack :)
  // be carefore using it!
  console.log('by reset state to rerender page, a link will be cancle!');
  component.setState({
    forceRerenderTimstramp: window.performance && window.performance.now && window.performance.now() || Date.now()
  });
}

var _default = { forceUpdate: forceUpdate };
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(forceUpdate, 'forceUpdate', 'src/utils/util.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/utils/util.js');
}();

;