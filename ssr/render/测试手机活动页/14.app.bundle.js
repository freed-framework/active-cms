webpackJsonp([14],{

/***/ 1182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "config", function() { return config; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Fix__ = __webpack_require__(1207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_scss__ = __webpack_require__(1208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__index_scss__);
/// <reference path="../../config.d.ts" />


var config = {
    name: 'fix',
    menus: ['layer', 'hotMap'],
    editable: {
        style: {
            layout: ['basic']
        },
        distanceLeft: [{ label: '侧边距离', component: 'Attr' }],
        distanceTop: [{ label: '顶部距离', component: 'Attr' }],
        target: [{
            label: '定位目标',
            component: 'Radio',
            data: [{
                key: 'body',
                label: '窗口'
            }, {
                key: 'parent',
                label: '父元素'
            }]
        }],
        horizontal: [{ label: '水平方向定位', component: 'MultiData', items: [{
                key: 'left',
                label: '左'
            }, {
                key: 'right',
                label: '右'
            }] }],
        vertical: [{ label: '垂直方向定位', component: 'MultiData', items: [{
                key: 'top',
                label: '上'
            }, {
                key: 'bottom',
                label: '下'
            }] }]
        // horizontal: [{label: '距左右边框的距离', component: 'attrs'}],
        // vertical: [{label: '距上下边框的距离', component: 'attrs'}]
    }
};

var _default = __WEBPACK_IMPORTED_MODULE_0__Fix__["a" /* default */];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(config, 'config', 'E:/test/active-cms/client/components/pc/fix/index.ts');

    __REACT_HOT_LOADER__.register(_default, 'default', 'E:/test/active-cms/client/components/pc/fix/index.ts');
}();

;

/***/ }),

/***/ 1207:
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






/**
 * @file Fix.tsx
 * @author denglingbo
 *
 * Des
 */
/// <reference path="./fix.d.ts" />

// import Style from './index.scss';

var Fix = function (_React$Component) {
    __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(Fix, _React$Component);

    /**
     * state 对象
     */
    // state?: any
    function Fix(props) {
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Fix);

        var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Fix.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(Fix)).call(this, props));

        _this.parseStyle = function () {
            return _this.__parseStyle__REACT_HOT_LOADER__.apply(_this, arguments);
        };
        _this.state = {
            isShow: true
        };
        return _this;
    }

    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Fix, [{
        key: '__parseStyle__REACT_HOT_LOADER__',
        value: function __parseStyle__REACT_HOT_LOADER__(attrs) {
            var _attrs$target = attrs.target,
                target = _attrs$target === undefined ? 'body' : _attrs$target,
                _attrs$position = attrs.position,
                position = _attrs$position === undefined ? 'left' : _attrs$position,
                _attrs$horizontal = attrs.horizontal,
                horizontal = _attrs$horizontal === undefined ? { key: 'left', value: 0 } : _attrs$horizontal,
                _attrs$vertical = attrs.vertical,
                vertical = _attrs$vertical === undefined ? { key: 'top', value: 0 } : _attrs$vertical,
                _attrs$style = attrs.style,
                style = _attrs$style === undefined ? {} : _attrs$style;

            if (target === 'body') {
                return getBodyStyle(position, horizontal, vertical);
            } else if (target === 'parent') {
                return getParentStyle(position, horizontal, vertical, style.layout);
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.scroll = window.addEventListener('scroll', function (e) {
                var scrollTop = e.target.body.scrollTop;
                // this.setState({
                //     isShow: scrollTop > 750
                // })
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var isShow = this.state.isShow;
            var _props = this.props,
                _props$attrs = _props.attrs,
                attrs = _props$attrs === undefined ? {} : _props$attrs,
                id = _props.id;
            var _attrs$style2 = attrs.style,
                style = _attrs$style2 === undefined ? {} : _attrs$style2;

            var sty = {};
            __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(sty, style.layout, this.parseStyle(attrs));
            if (!isShow) {
                return null;
            }
            return __WEBPACK_IMPORTED_MODULE_6_react__["createElement"](
                'div',
                { id: id, className: 'as-fix', style: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, sty) },
                this.props.children
            );
        }
    }]);

    return Fix;
}(__WEBPACK_IMPORTED_MODULE_6_react__["Component"]);

function tf(str) {
    var arr = str.split("-");
    for (var i = 1; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1);
    }
    return arr.join("");
}
;
function getBodyStyle(po, horizontal, vertical) {
    var sty = {};
    if (horizontal) {
        var key = horizontal.key,
            value = horizontal.value;

        sty[key] = value;
    }
    if (vertical) {
        var _key = vertical.key,
            _value = vertical.value;

        sty[_key] = _value;
    }
    sty.zIndex = 1000;
    return sty;
}
function getParentStyle(po, horizontal, vertical, style) {
    var _style$width = style.width,
        width = _style$width === undefined ? '0' : _style$width;

    var sty = {};
    if (horizontal) {
        var key = horizontal.key,
            value = horizontal.value;

        var margin = parseInt(width, 10) + parseInt(value, 10);
        var attr = tf('margin-' + key);
        sty[attr] = -margin;
    }
    if (vertical) {
        var _key2 = vertical.key,
            _value2 = vertical.value;

        sty[_key2] = _value2;
    }
    sty.zIndex = 1000;
    return sty;
}
var _default = Fix;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Fix, 'Fix', 'E:/test/active-cms/client/components/pc/fix/Fix.tsx');

    __REACT_HOT_LOADER__.register(tf, 'tf', 'E:/test/active-cms/client/components/pc/fix/Fix.tsx');

    __REACT_HOT_LOADER__.register(getBodyStyle, 'getBodyStyle', 'E:/test/active-cms/client/components/pc/fix/Fix.tsx');

    __REACT_HOT_LOADER__.register(getParentStyle, 'getParentStyle', 'E:/test/active-cms/client/components/pc/fix/Fix.tsx');

    __REACT_HOT_LOADER__.register(_default, 'default', 'E:/test/active-cms/client/components/pc/fix/Fix.tsx');
}();

;

/***/ }),

/***/ 1208:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

});