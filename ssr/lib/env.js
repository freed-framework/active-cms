"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var nodeENV = process.env.NODE_ENV || 'development';
/**
 * client server ssr 三个平台环境变量
 */

var apiMap = {
    development: "http://sitxcsc.yatang.com.cn/api/sc",
    production: "https://xcscm.yatang.com.cn/api/sc",
    test: "http://xcscm.yatang.com.cn/api/sc"
};

var publishMap = {
    development: "http://sit.db.com/html/",
    production: "https://xcrapp.yatang.com.cn/html/",
    test: "http://sit.db.com/html/"
};

var ENV = {
    /**
     * 外部地址
     */
    api: apiMap[nodeENV],

    /**
     * 项目域名
     */
    domain: nodeENV === 'production' ? 'http://wuget.yatang.com.cn' : 'http://www.iting.top',

    /**
     * zip包地址
     */
    publicPath: publishMap[nodeENV]
};

var _default = ENV;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(nodeENV, "nodeENV", "src/env.js");

    __REACT_HOT_LOADER__.register(apiMap, "apiMap", "src/env.js");

    __REACT_HOT_LOADER__.register(publishMap, "publishMap", "src/env.js");

    __REACT_HOT_LOADER__.register(ENV, "ENV", "src/env.js");

    __REACT_HOT_LOADER__.register(_default, "default", "src/env.js");
}();

;