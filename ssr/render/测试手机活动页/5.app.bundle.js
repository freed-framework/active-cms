webpackJsonp([5,18],{

/***/ 1180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Common__ = __webpack_require__(1201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_scss__ = __webpack_require__(1202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__common_scss__);


var _default = __WEBPACK_IMPORTED_MODULE_0__Common__["a" /* default */];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'E:/test/active-cms/client/components/common/hoc/baiscComponent/index.ts');
}();

;

/***/ }),

/***/ 1192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "config", function() { return config; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__hotImage__ = __webpack_require__(1227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__hotImage_scss__ = __webpack_require__(1228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__hotImage_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__hotImage_scss__);


var config = {
    name: 'grid/hotImage',
    displayName: '列',
    menus: ['layer'],
    editable: {
        style: {
            layout: ['Basic']
        }
    }
};

var _default = __WEBPACK_IMPORTED_MODULE_0__hotImage__["a" /* default */];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(config, 'config', 'E:/test/active-cms/client/components/pc/grid/hotImage/index.ts');

    __REACT_HOT_LOADER__.register(_default, 'default', 'E:/test/active-cms/client/components/pc/grid/hotImage/index.ts');
}();

;

/***/ }),

/***/ 1201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_classnames__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_classnames__);






/**
 * @file Common.ts
 * @author shijh
 *
 * 高阶组件，处理公共业务
 */


var Common = function Common(ComposedComponent) {
    return function (_React$PureComponent) {
        __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(Hoc, _React$PureComponent);

        function Hoc(props) {
            __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Hoc);

            return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Hoc.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(Hoc)).call(this, props));
        }

        __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Hoc, [{
            key: 'render',
            value: function render() {
                var _props = this.props,
                    attrs = _props.attrs,
                    _props$children = _props.children,
                    children = _props$children === undefined ? [] : _props$children,
                    id = _props.id,
                    module = _props.module;

                var classes = __WEBPACK_IMPORTED_MODULE_7_classnames___default()('as-common', {
                    'as-common-hasChild': !!children.length
                });
                return __WEBPACK_IMPORTED_MODULE_6_react__["createElement"](ComposedComponent, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, this.props, { className: classes, id: id, 'data-module': module }));
            }
        }]);

        return Hoc;
    }(__WEBPACK_IMPORTED_MODULE_6_react__["PureComponent"]);
};
var _default = Common;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Common, 'Common', 'E:/test/active-cms/client/components/common/hoc/baiscComponent/Common.tsx');

    __REACT_HOT_LOADER__.register(_default, 'default', 'E:/test/active-cms/client/components/common/hoc/baiscComponent/Common.tsx');
}();

;

/***/ }),

/***/ 1202:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__common_hoc_baiscComponent__ = __webpack_require__(1180);










var HotImages = function (_React$PureComponent) {
    __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default()(HotImages, _React$PureComponent);

    function HotImages() {
        __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, HotImages);

        return __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default()(this, (HotImages.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(HotImages)).apply(this, arguments));
    }

    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(HotImages, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                id = _props.id,
                _props$attrs = _props.attrs,
                attrs = _props$attrs === undefined ? {} : _props$attrs,
                parentStyle = _props.parentStyle;
            var _attrs$style = attrs.style,
                style = _attrs$style === undefined ? {} : _attrs$style;

            var newSty = {};
            __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()(newSty, parentStyle, style.layout);
            return __WEBPACK_IMPORTED_MODULE_7_react__["createElement"]('div', __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, this.props, { className: 'as-layer-goods', style: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()({}, newSty) }));
        }
    }]);

    return HotImages;
}(__WEBPACK_IMPORTED_MODULE_7_react__["PureComponent"]);

var _default = Object(__WEBPACK_IMPORTED_MODULE_8__common_hoc_baiscComponent__["default"])(HotImages);

/* harmony default export */ __webpack_exports__["a"] = (_default);
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(HotImages, 'HotImages', 'E:/test/active-cms/client/components/pc/grid/hotImage/hotImage.tsx');

    __REACT_HOT_LOADER__.register(_default, 'default', 'E:/test/active-cms/client/components/pc/grid/hotImage/hotImage.tsx');
}();

;

/***/ }),

/***/ 1228:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

});