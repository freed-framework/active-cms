webpackJsonp([12],{

/***/ 1194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "config", function() { return config; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__hotMap__ = __webpack_require__(1232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__hotMap_scss__ = __webpack_require__(1233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__hotMap_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__hotMap_scss__);
/// <reference path="../../config.d.ts" />


var config = {
    name: 'hotMap',
    editable: {
        style: {
            layout: ['Basic', 'Position']
        },
        href: [{ label: '连接', component: 'Attr' }]
    }
};

var _default = __WEBPACK_IMPORTED_MODULE_0__hotMap__["a" /* default */];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(config, 'config', 'E:/test/active-cms/client/components/pc/hotMap/index.ts');

    __REACT_HOT_LOADER__.register(_default, 'default', 'E:/test/active-cms/client/components/pc/hotMap/index.ts');
}();

;

/***/ }),

/***/ 1232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);








var hotMap = function (_React$Component) {
    __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(hotMap, _React$Component);

    function hotMap() {
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, hotMap);

        return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (hotMap.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(hotMap)).apply(this, arguments));
    }

    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(hotMap, [{
        key: "render",
        value: function render() {
            var _props$attrs = this.props.attrs,
                attrs = _props$attrs === undefined ? {} : _props$attrs;
            var _attrs$style = attrs.style,
                style = _attrs$style === undefined ? {} : _attrs$style;

            return __WEBPACK_IMPORTED_MODULE_6_react__["createElement"](
                "a",
                { className: "position_absolute", href: attrs.href, style: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, style.layout) },
                this.props.children
            );
        }
    }]);

    return hotMap;
}(__WEBPACK_IMPORTED_MODULE_6_react__["Component"]);

var _default = hotMap;

/* harmony default export */ __webpack_exports__["a"] = (_default);
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(hotMap, "hotMap", "E:/test/active-cms/client/components/pc/hotMap/hotMap.tsx");

    __REACT_HOT_LOADER__.register(_default, "default", "E:/test/active-cms/client/components/pc/hotMap/hotMap.tsx");
}();

;

/***/ }),

/***/ 1233:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

});