webpackJsonp([1,7],{

/***/ 1183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__goodsItem__ = __webpack_require__(1209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__goodsImageItem__ = __webpack_require__(1210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__goodsItem_scss__ = __webpack_require__(1211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__goodsItem_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__goodsItem_scss__);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "GoodsItem", function() { return __WEBPACK_IMPORTED_MODULE_0__goodsItem__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "GoodsImageItem", function() { return __WEBPACK_IMPORTED_MODULE_1__goodsImageItem__["a"]; });




;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;

/***/ }),

/***/ 1190:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "config", function() { return config; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__goods__ = __webpack_require__(1223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__goods_scss__ = __webpack_require__(1225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__goods_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__goods_scss__);
/// <reference path="../../config.d.ts" />


var config = {
    name: 'goods',
    editable: {
        row: [{ label: '行', component: 'Attr' }],
        col: [{ label: '列', component: 'Attr' }],
        // component: [{
        //     label: '商品组件',
        //     component: 'radio',
        //     tabs: [{
        //         key: 'ImageText',
        //         label: '图片和文字'
        //     }, {
        //         key: 'Image',
        //         label: '图片'
        //     }, {
        //         key: 'HotImage',
        //         label: '热图'
        //     }]
        // }],
        style: {
            layout: ['Basic'],
            goodItem: ['Basic']
        }
    }
};

var _default = __WEBPACK_IMPORTED_MODULE_0__goods__["a" /* default */];
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(config, 'config', 'E:/test/active-cms/client/components/pc/goods/index.ts');

    __REACT_HOT_LOADER__.register(_default, 'default', 'E:/test/active-cms/client/components/pc/goods/index.ts');
}();

;

/***/ }),

/***/ 1209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoodsItem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);







var GoodsItem = function (_React$PureComponent) {
    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(GoodsItem, _React$PureComponent);

    function GoodsItem() {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, GoodsItem);

        return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (GoodsItem.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(GoodsItem)).apply(this, arguments));
    }

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(GoodsItem, [{
        key: "render",
        value: function render() {
            var style = this.props.style;

            return __WEBPACK_IMPORTED_MODULE_5_react__["createElement"](
                "div",
                { className: "as-layer-goods", style: style },
                __WEBPACK_IMPORTED_MODULE_5_react__["createElement"](
                    "div",
                    { className: "as-layer-goods-img-content" },
                    __WEBPACK_IMPORTED_MODULE_5_react__["createElement"]("img", { src: "https://img11.360buyimg.com/n7/jfs/t7684/231/3434426846/496810/9d8bbf11/59bf78daN55911b36.jpg", alt: "", className: "as-layer-goods-img" })
                ),
                __WEBPACK_IMPORTED_MODULE_5_react__["createElement"](
                    "div",
                    { className: "as=layer-goods-main" },
                    __WEBPACK_IMPORTED_MODULE_5_react__["createElement"](
                        "a",
                        { className: "as-layer-goods-title" },
                        "\u74F7\u808C\u6DF1\u5C42\u51C0\u5316\u9ED1\u9762\u819C10\u7247 \u6536\u7F29\u6BDB\u5B54\u6E05\u6D01\u9762\u819C  \u6E05\u723D\u8865\u6C34\u4FDD\u6E7F\u9762\u819C\u8D34 25g*10\u7247"
                    ),
                    __WEBPACK_IMPORTED_MODULE_5_react__["createElement"](
                        "div",
                        { className: "as-layer-goods-price" },
                        __WEBPACK_IMPORTED_MODULE_5_react__["createElement"](
                            "span",
                            { className: "as-layer-goods-price-tag" },
                            "\uFFE5"
                        ),
                        __WEBPACK_IMPORTED_MODULE_5_react__["createElement"](
                            "span",
                            { className: "as-layer-goods-price-num" },
                            "169"
                        )
                    )
                ),
                __WEBPACK_IMPORTED_MODULE_5_react__["createElement"](
                    "div",
                    { className: "as-layer-goods-btn" },
                    __WEBPACK_IMPORTED_MODULE_5_react__["createElement"](
                        "a",
                        { className: "as-layer-goods-btn-text" },
                        "\u7ACB\u5373\u79D2\u6740"
                    )
                )
            );
        }
    }]);

    return GoodsItem;
}(__WEBPACK_IMPORTED_MODULE_5_react__["PureComponent"]);


;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(GoodsItem, "GoodsItem", "E:/test/active-cms/client/components/pc/goods/goodsItem/goodsItem.tsx");
}();

;

/***/ }),

/***/ 1210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return goodsImageItem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);







var goodsImageItem = function (_React$PureComponent) {
    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(goodsImageItem, _React$PureComponent);

    function goodsImageItem() {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, goodsImageItem);

        return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (goodsImageItem.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(goodsImageItem)).apply(this, arguments));
    }

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(goodsImageItem, [{
        key: "render",
        value: function render() {
            var style = this.props.style;

            return __WEBPACK_IMPORTED_MODULE_5_react__["createElement"](
                "div",
                { className: "as-layer-goods", style: style },
                __WEBPACK_IMPORTED_MODULE_5_react__["createElement"]("img", { src: "https://img14.360buyimg.com/cms/jfs/t4405/299/3446803520/85003/621aff74/5922ea46N7a8e115d.jpg", alt: "", className: "as-layer-goods-img" })
            );
        }
    }]);

    return goodsImageItem;
}(__WEBPACK_IMPORTED_MODULE_5_react__["PureComponent"]);


;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(goodsImageItem, "goodsImageItem", "E:/test/active-cms/client/components/pc/goods/goodsItem/goodsImageItem.tsx");
}();

;

/***/ }),

/***/ 1211:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Goods; });
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__grid__ = __webpack_require__(1224);









var Goods = function (_React$PureComponent) {
    __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(Goods, _React$PureComponent);

    function Goods(props) {
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Goods);

        return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Goods.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(Goods)).call(this, props));
    }

    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Goods, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {}
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                id = _props.id,
                children = _props.children,
                _props$attrs = _props.attrs,
                attrs = _props$attrs === undefined ? {} : _props$attrs;
            var row = attrs.row,
                col = attrs.col,
                _attrs$style = attrs.style,
                style = _attrs$style === undefined ? {} : _attrs$style,
                component = attrs.component;

            return __WEBPACK_IMPORTED_MODULE_6_react__["createElement"](
                'div',
                { id: id, style: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, style.layout) },
                __WEBPACK_IMPORTED_MODULE_6_react__["createElement"](__WEBPACK_IMPORTED_MODULE_7__grid__["a" /* default */], { row: row || '1', col: col || '1', component: component, id: id, style: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, style.goodItem) }),
                children
            );
        }
    }]);

    return Goods;
}(__WEBPACK_IMPORTED_MODULE_6_react__["PureComponent"]);


;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Goods, 'Goods', 'E:/test/active-cms/client/components/pc/goods/goods.tsx');
}();

;

/***/ }),

/***/ 1224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Grid; });
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__goodsItem__ = __webpack_require__(1183);









var Grid = function (_React$PureComponent) {
    __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(Grid, _React$PureComponent);

    function Grid() {
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Grid);

        var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Grid.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(Grid)).apply(this, arguments));

        _this.renderItem = function () {
            return _this.__renderItem__REACT_HOT_LOADER__.apply(_this, arguments);
        };
        return _this;
    }

    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Grid, [{
        key: '__renderItem__REACT_HOT_LOADER__',
        value: function __renderItem__REACT_HOT_LOADER__() {
            var _props = this.props,
                row = _props.row,
                col = _props.col,
                id = _props.id,
                style = _props.style,
                component = _props.component;

            var li = [];
            var item = [];
            var node = __WEBPACK_IMPORTED_MODULE_6_react__["createElement"](__WEBPACK_IMPORTED_MODULE_7__goodsItem__["GoodsItem"], { style: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, style) });
            if (component === 'Image') {
                node = __WEBPACK_IMPORTED_MODULE_6_react__["createElement"](__WEBPACK_IMPORTED_MODULE_7__goodsItem__["GoodsImageItem"], { style: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, style) });
            }
            for (var j = 0; j < parseInt(col, 10); j++) {
                item.push(node);
            }
            for (var i = 0; i < parseInt(row, 10); i++) {
                li.push(__WEBPACK_IMPORTED_MODULE_6_react__["createElement"](
                    'li',
                    { key: i, className: 'as-layer-goods-row' },
                    item
                ));
            }
            return __WEBPACK_IMPORTED_MODULE_6_react__["createElement"](
                'ul',
                { className: 'as-layer-goods-col' },
                li
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var id = this.props.id;

            return __WEBPACK_IMPORTED_MODULE_6_react__["createElement"](
                'div',
                null,
                this.renderItem()
            );
        }
    }]);

    return Grid;
}(__WEBPACK_IMPORTED_MODULE_6_react__["PureComponent"]);


;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(Grid, 'Grid', 'E:/test/active-cms/client/components/pc/goods/grid.tsx');
}();

;

/***/ }),

/***/ 1225:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

});