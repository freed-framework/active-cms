webpackJsonp([2,15,16],{

/***/ 1181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "config", function() { return config; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Layer__ = __webpack_require__(1204);
/// <reference path="../../config.d.ts" />

var config = {
    name: 'mobile/layer',
    isCommon: true,
    displayName: '布局',
    menus: ['mobile/layer', 'mobile/img', 'mobile/list'],
    editable: [{
        component: 'Basic',
        target: 'layout'
    }],
    defaultValues: {
        style: {
            layout: {
                padding: 10
            }
        }
    }
};

var _default = __WEBPACK_IMPORTED_MODULE_0__Layer__["a" /* default */];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(config, 'config', 'E:/test/active-cms/client/components/mobile/layer/index.ts');

    __REACT_HOT_LOADER__.register(_default, 'default', 'E:/test/active-cms/client/components/mobile/layer/index.ts');
}();

;

/***/ }),

/***/ 1182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "config", function() { return config; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__List__ = __webpack_require__(1206);
/// <reference path="../../config.d.ts" />

var config = {
    name: 'mobile/list',
    displayName: '图片列表',
    menus: [],
    editable: [{
        component: 'MobileList'
    }, {
        component: 'Basic',
        target: 'layout'
    }],
    defaultValues: {
        cols: 2,
        style: {
            layout: {
                padding: 10
            }
        },
        extendsProps: {
            style: {
                padding: 10
            }
        }
    }
};

var _default = __WEBPACK_IMPORTED_MODULE_0__List__["a" /* default */];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(config, 'config', 'E:/test/active-cms/client/components/mobile/list/index.ts');

    __REACT_HOT_LOADER__.register(_default, 'default', 'E:/test/active-cms/client/components/mobile/list/index.ts');
}();

;

/***/ }),

/***/ 1188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layer__ = __webpack_require__(1181);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Layer", function() { return __WEBPACK_IMPORTED_MODULE_0__layer__["default"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__img__ = __webpack_require__(221);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Img", function() { return __WEBPACK_IMPORTED_MODULE_1__img__["default"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__list__ = __webpack_require__(1182);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "List", function() { return __WEBPACK_IMPORTED_MODULE_2__list__["default"]; });



;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;

/***/ }),

/***/ 1204:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__layer_scss__ = __webpack_require__(1205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__layer_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__layer_scss__);






/**
 * @file Floor.jsx
 * @author denglingbo
 *
 * Des
 */
/// <reference path="./layer.d.ts" />



var Layer = function (_React$PureComponent) {
    __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(Layer, _React$PureComponent);

    function Layer() {
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Layer);

        return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Layer.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(Layer)).apply(this, arguments));
    }

    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Layer, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                id = _props.id,
                _props$style = _props.style,
                style = _props$style === undefined ? {} : _props$style;

            return __WEBPACK_IMPORTED_MODULE_6_react__["createElement"](
                'div',
                { id: id, className: 'tmc-layer', 'data-module': this.props.module, style: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, style && __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, style.layout, { 'backgroundPosition': 'center center' })) },
                this.props.children
            );
        }
    }]);

    return Layer;
}(__WEBPACK_IMPORTED_MODULE_6_react__["PureComponent"]);

var _default = Layer;

/* harmony default export */ __webpack_exports__["a"] = (_default);
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Layer, 'Layer', 'E:/test/active-cms/client/components/mobile/layer/Layer.tsx');

    __REACT_HOT_LOADER__.register(_default, 'default', 'E:/test/active-cms/client/components/mobile/layer/Layer.tsx');
}();

;

/***/ }),

/***/ 1205:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1206:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__list_scss__ = __webpack_require__(1207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__list_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__list_scss__);






/// <reference path="./list.d.ts" />



var List = function (_React$Component) {
    __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(List, _React$Component);

    function List() {
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, List);

        return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (List.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(List)).apply(this, arguments));
    }

    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(List, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                id = _props.id,
                cols = _props.cols,
                style = _props.style,
                module = _props.module;

            return __WEBPACK_IMPORTED_MODULE_6_react__["createElement"](
                'div',
                { id: id, className: 'tmc-list tmc-list-cols-' + cols, 'data-module': module, style: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, style && __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, style.layout)) },
                this.props.children
            );
        }
    }]);

    return List;
}(__WEBPACK_IMPORTED_MODULE_6_react__["Component"]);

List.defaultProps = {
    cols: 2
};
var _default = List;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(List, 'List', 'E:/test/active-cms/client/components/mobile/list/List.tsx');

    __REACT_HOT_LOADER__.register(_default, 'default', 'E:/test/active-cms/client/components/mobile/list/List.tsx');
}();

;

/***/ }),

/***/ 1207:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

});