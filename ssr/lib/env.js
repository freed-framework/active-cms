"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * client server ssr 三个平台环境变量
 */
var ENV = {
  /**
   * 外部地址
   */
  api: {
    development: "http://sitxcsc.yatang.com.cn/api/sc",
    production: "http://uat-xcscm.yatang.com.cn/api/sc",
    test: "http://xcscm.yatang.com.cn/api/sc"
  },
  /**
   * 项目域名
   */
  domain: "http://localhost:3000",
  /**
   * zip包地址
   */
  publicPath: "http://sit.db.com/html"
};

var _default = ENV;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(ENV, "ENV", "src/env.js");

  __REACT_HOT_LOADER__.register(_default, "default", "src/env.js");
}();

;