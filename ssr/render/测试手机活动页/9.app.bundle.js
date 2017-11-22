webpackJsonp([9],{

/***/ 1198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "config", function() { return config; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__list__ = __webpack_require__(1237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_scss__ = __webpack_require__(1238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__index_scss__);
/// <reference path="../../config.d.ts" />


var config = {
    name: 'list',
    displayName: '列表',
    menus: [],
    editable: {
        items: [{ label: '商品数', component: 'GoodsNumber', defaultValue: 1 }],
        images: [{ label: '上传图片', component: 'Upload' }],
        style: {
            layout: ['Basic'],
            goodsItem: ['Basic']
        }
    }
};

var _default = __WEBPACK_IMPORTED_MODULE_0__list__["a" /* default */];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(config, 'config', 'E:/test/active-cms/client/components/pc/list/index.ts');

    __REACT_HOT_LOADER__.register(_default, 'default', 'E:/test/active-cms/client/components/pc/list/index.ts');
}();

;

/***/ }),

/***/ 1237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return List; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react__);







/**
 * @file List.tsx
 * @author shijh
 *
 * 商品列表
 */


var List = function (_React$Component) {
    __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default()(List, _React$Component);

    function List() {
        __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, List);

        var _this = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default()(this, (List.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(List)).apply(this, arguments));

        _this.renderClone = function () {
            return _this.__renderClone__REACT_HOT_LOADER__.apply(_this, arguments);
        };
        return _this;
    }

    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(List, [{
        key: "__renderClone__REACT_HOT_LOADER__",
        value: function __renderClone__REACT_HOT_LOADER__() {
            var _props = this.props,
                children = _props.children,
                _props$attrs = _props.attrs,
                attrs = _props$attrs === undefined ? {} : _props$attrs;
            var _attrs$style = attrs.style,
                style = _attrs$style === undefined ? {} : _attrs$style;

            var cols = __WEBPACK_IMPORTED_MODULE_7_react__["Children"].map(children, function (item, index) {
                if (item) {
                    return __WEBPACK_IMPORTED_MODULE_7_react__["cloneElement"](item, {
                        parentStyle: style.goodsItem || {}
                    });
                }
            });
            return cols;
        }
    }, {
        key: "render",
        value: function render() {
            var _props$attrs2 = this.props.attrs,
                attrs = _props$attrs2 === undefined ? {} : _props$attrs2;
            var _attrs$style2 = attrs.style,
                style = _attrs$style2 === undefined ? {} : _attrs$style2;

            return __WEBPACK_IMPORTED_MODULE_7_react__["createElement"](
                "div",
                __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, this.props, { style: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()({}, style.layout), className: "as-list" }),
                this.renderClone()
            );
        }
    }]);

    return List;
}(__WEBPACK_IMPORTED_MODULE_7_react__["Component"]);


;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(List, "List", "E:/test/active-cms/client/components/pc/list/list.tsx");
}();

;

/***/ }),

/***/ 1238:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

});