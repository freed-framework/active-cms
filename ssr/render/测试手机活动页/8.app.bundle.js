webpackJsonp([8],{

/***/ 1199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PreImage__ = __webpack_require__(1239);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return __WEBPACK_IMPORTED_MODULE_0__PreImage__["a"]; });
/**
 * @file index.jsx
 * @author denglingbo
 *
 * Des
 */



;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;

/***/ }),

/***/ 1239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_classnames__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_antd__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__BasicInfo__ = __webpack_require__(1240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_scss__ = __webpack_require__(1241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__app_scss__);





/**
 * @file PreImage.jsx
 * @author denglingbo
 *
 * Des
 */







var PreImage = function (_Component) {
    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(PreImage, _Component);

    function PreImage(props) {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, PreImage);

        var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (PreImage.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(PreImage)).call(this, props));

        _this.state = {
            /**
             * 组件状态
             * 0: 未添加图片
             * 1: 已经添加图片
             */
            status: 0,

            /**
             * 默认缩放比例
             */
            scale: props.scale,

            /**
             * 当前的画布宽度
             */
            canvasWidth: 0,

            /**
             * 当前的画布高度
             */
            canvasHeight: 0
        };

        // 是否可以位移
        _this.allowMove = false;
        // 图片
        _this.image = null;
        // File Type
        _this.fileType = null;

        // 移动的基本信息
        _this.basicInfo = new __WEBPACK_IMPORTED_MODULE_9__BasicInfo__["a" /* default */]();

        _this.handleFile = _this.handleFile.bind(_this);
        _this.handleGetFile = _this.handleGetFile.bind(_this);
        _this.handleControl = _this.handleControl.bind(_this);

        _this.handleDragStart = _this.handleDragStart.bind(_this);
        _this.handleDragEnd = _this.handleDragEnd.bind(_this);
        _this.handleDraging = _this.handleDraging.bind(_this);
        _this.handleChangeScale = _this.handleChangeScale.bind(_this);
        return _this;
    }

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(PreImage, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            window.addEventListener('mousemove', this.handleDraging);
            window.addEventListener('mouseup', this.handleDragEnd);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.controllerCtx = this.controller.getContext('2d');
            this.referenceCtx = this.reference.getContext('2d');
            this.storeCtx = this.store.getContext('2d');

            this.getDefaultImage();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('mouseup', this.handleDragEnd);
            window.removeEventListener('mousemove', this.handleDraging);
        }

        /**
         * 获取相应位置缩放的数据
         * @param dir, x or y
         * @return {number}
         */

    }, {
        key: 'getScaleValue',
        value: function getScaleValue(dir) {
            var scale = this.state.scale;
            var dpr = this.props.dpr;


            var value = this.state[dir === 'x' ? 'canvasWidth' : 'canvasHeight'];
            var pos = this.basicInfo.pos[dir === 'x' ? 'x' : 'y'];

            return (value - value * scale) * 0.5 + pos * scale;
        }

        /**
         * 获取图片的 base64
         * @return {string}
         */

    }, {
        key: 'getImageByBase64',
        value: function getImageByBase64() {
            if (this.state.status === 0) {
                return null;
            }

            var _props = this.props,
                width = _props.width,
                height = _props.height,
                dpr = _props.dpr,
                quality = _props.quality;
            var _state = this.state,
                scale = _state.scale,
                canvasWidth = _state.canvasWidth,
                canvasHeight = _state.canvasHeight;
            var _basicInfo$pos = this.basicInfo.pos,
                x = _basicInfo$pos.x,
                y = _basicInfo$pos.y;

            var fileType = this.getImageType();

            this.referenceCtx.clearRect(0, 0, canvasWidth * dpr, canvasHeight * dpr);
            this.storeCtx.clearRect(0, 0, width * dpr, height * dpr);

            // 在 canvas 绘制前填充白色背景, 解决被截取的图片背景是黑色
            if (fileType === 'image/jpeg') {
                this.referenceCtx.fillStyle = '#fff';
                this.referenceCtx.fillRect(0, 0, width * dpr, height * dpr);
            }

            // 从画布剪切的开始坐标系（画布的左上角为 0, 0）
            var cutStartX = (canvasWidth * scale * dpr - width) * 0.5;
            var cutStartY = (canvasHeight * scale * dpr - height) * 0.5;

            // 这个画布中的内容作为裁剪图片的源
            this.referenceCtx.drawImage(this.image, 0, 0, canvasWidth * dpr, canvasHeight * dpr, x * dpr * scale, y * dpr * scale, canvasWidth * dpr * scale, canvasHeight * dpr * scale);

            this.storeCtx.drawImage(
            // 这里直接从 reference canvas 中获取图片
            this.reference,
            // 从 canvas x, y 坐标获取图像
            cutStartX, cutStartY,
            // 截多少尺寸的图像
            width, height,
            // 放置在画布的位置
            0, 0,
            // 使用的图像尺寸
            width, height);

            // quality 经过测试 95% 与原图最为接近，超过98% size远大于原图
            return this.store.toDataURL(fileType, quality / 100 * 0.95);
        }

        /**
         * 获取图片类型
         * @return {string}
         */

    }, {
        key: 'getImageType',
        value: function getImageType() {
            return this.fileType || 'image/jpeg';
        }

        /**
         * 重置画布
         */

    }, {
        key: 'resetImage',
        value: function resetImage() {
            var _this2 = this;

            this.setState({
                scale: 1
            }, function () {
                _this2.basicInfo.reset();
                _this2.toDraw();
            });
        }

        /**
         * 删除图片
         */

    }, {
        key: 'deleteImage',
        value: function deleteImage() {
            // 该代码，只是为了下次如果还选了同样的图片不会触发 file onchange
            this.fileButton.value = '';

            this.allowMove = false;
            this.image = null;
            this.fileType = null;
            this.basicInfo.reset();

            this.setState({
                status: 0,
                scale: 1
            });
        }

        /**
         * 操作容器
         * @param event
         */

    }, {
        key: 'handleControl',
        value: function handleControl(event) {
            var type = event.currentTarget.getAttribute('tabs-type');

            if (type === 'reset') {
                this.resetImage();
            }

            if (type === 'delete') {
                this.deleteImage();
            }
        }

        /**
         * 判断是否在可上传类型范围中
         *
         * @param {string} type, eg: image/jpeg
         * @return {boolean}
         */

    }, {
        key: 'isAccept',
        value: function isAccept(type) {
            var match = false;
            this.props.accept.forEach(function (t) {
                if (new RegExp(t + '$').test(type)) {
                    match = true;
                }
            });

            return match;
        }

        /**
         * 拖拽准备开始
         * @param event
         */

    }, {
        key: 'handleDragStart',
        value: function handleDragStart(event) {
            if (event.button === 2) {
                return;
            }

            var pos = this.basicInfo.pos;

            this.allowMove = true;

            this.basicInfo.start = {
                x: pos.x,
                y: pos.y
            };

            this.basicInfo.click = {
                x: event.screenX,
                y: event.screenY
            };
        }

        /**
         * 拖拽结束
         */

    }, {
        key: 'handleDragEnd',
        value: function handleDragEnd() {
            this.allowMove = false;
        }

        /**
         * 拖拽移动位置
         * @param event
         */

    }, {
        key: 'handleDraging',
        value: function handleDraging(event) {
            if (this.allowMove) {
                var _basicInfo = this.basicInfo,
                    start = _basicInfo.start,
                    click = _basicInfo.click;

                // 这里是当前的相对位移

                this.basicInfo.pos = {
                    x: event.screenX - click.x + start.x,
                    y: event.screenY - click.y + start.y
                };

                this.toDraw();
            }
        }

        /**
         * 缩放画布
         * @param scale
         */

    }, {
        key: 'handleChangeScale',
        value: function handleChangeScale(scale) {
            var _this3 = this;

            var _state2 = this.state,
                canvasWidth = _state2.canvasWidth,
                canvasHeight = _state2.canvasHeight;
            var dpr = this.props.dpr;


            this.setState({
                scale: scale
            }, function () {
                _this3.controllerCtx.clearRect(0, 0, canvasWidth, canvasHeight);
                _this3.controllerCtx.save();
                _this3.controllerCtx.drawImage(_this3.image, 0, 0,
                // 这里截取图像的宽高，需要乘以 dpr ，这样才能获得当前 dpr 的图片正确尺寸
                canvasWidth * dpr, canvasHeight * dpr, _this3.getScaleValue('x'), _this3.getScaleValue('y'), canvasWidth * scale, canvasHeight * scale);
                _this3.controllerCtx.restore();
            });
        }

        /**
         * 绘制图片
         */

    }, {
        key: 'toDraw',
        value: function toDraw() {
            var _state3 = this.state,
                canvasWidth = _state3.canvasWidth,
                canvasHeight = _state3.canvasHeight,
                scale = _state3.scale;
            var _props2 = this.props,
                width = _props2.width,
                height = _props2.height,
                dpr = _props2.dpr;


            if (this.image == null) {
                return;
            }

            this.controllerCtx.clearRect(0, 0, canvasWidth, canvasHeight);
            this.controllerCtx.save();
            this.controllerCtx.drawImage(this.image, this.getScaleValue('x'), this.getScaleValue('y'), canvasWidth * scale, canvasHeight * scale);

            this.controllerCtx.restore();
        }
    }, {
        key: 'handleFile',
        value: function handleFile() {
            this.fileButton.click();
        }

        /**
         * 判断图片地址是否跨域
         * @param url
         * @return {boolean}
         */

    }, {
        key: 'isCrossOriginImage',
        value: function isCrossOriginImage(url) {
            var localOrigin = window.location.origin;
            var expr = new RegExp(localOrigin);

            return expr.test(url);
        }

        /**
         * 加载图片
         * @param url
         */

    }, {
        key: 'loadImage',
        value: function loadImage(url) {
            var _this4 = this;

            var dpr = this.props.dpr;

            this.image = new Image();
            this.image.src = url;

            if (this.isCrossOriginImage(url)) {
                this.image.crossOrigin = 'Anonymous';
            }

            this.image.addEventListener('load', function () {
                _this4.setState({
                    status: 1,
                    canvasWidth: _this4.image.width / dpr,
                    canvasHeight: _this4.image.height / dpr
                }, function () {
                    return _this4.toDraw();
                });
            });
        }

        /**
         * 显示默认图片
         */

    }, {
        key: 'getDefaultImage',
        value: function getDefaultImage() {
            var url = this.props.url;


            if (!url) {
                return;
            }

            var expr = /\.(\w+)$/.exec(url);

            if (expr && expr[1]) {
                this.fileType = 'image/' + expr[1];
            } else {
                __WEBPACK_IMPORTED_MODULE_8_antd__["f" /* message */].error('图片类型错误');
                return;
            }

            this.loadImage(url);
        }

        /**
         * 本地获取图片并展示
         * @param event
         */

    }, {
        key: 'handleGetFile',
        value: function handleGetFile(event) {
            var _this5 = this;

            if (event.button === 2) {
                return;
            }

            var error = this.props.error;

            var file = event.target.files[0];
            var fileReader = new FileReader();

            if (!this.isAccept(file.type)) {
                var accept = this.props.accept.join(', ');
                __WEBPACK_IMPORTED_MODULE_8_antd__["f" /* message */].error(error.accept.replace('{accept}', accept));
                return;
            }

            if (file.size > this.props.maxsize) {
                var kb = (this.props.maxsize / 1024 / 1024).toFixed(2);
                __WEBPACK_IMPORTED_MODULE_8_antd__["f" /* message */].error(error.size.replace('{size}', kb));
                return;
            }

            this.fileType = file.type;

            fileReader.readAsDataURL(file);

            fileReader.addEventListener('load', function (e) {
                _this5.loadImage(e.target.result);
            });
        }
    }, {
        key: 'renderBarTitle',
        value: function renderBarTitle() {
            if (this.state.status === 0) {
                return null;
            }

            return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                'div',
                { className: 'pre-image-bar-title' },
                __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                    'span',
                    {
                        'data-type': 'reset',
                        onClick: this.handleControl
                    },
                    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_antd__["a" /* Icon */], { type: 'reload' })
                ),
                __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                    'span',
                    {
                        'data-type': 'delete',
                        onClick: this.handleControl
                    },
                    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_antd__["a" /* Icon */], { type: 'delete' })
                )
            );
        }
    }, {
        key: 'renderBarContent',
        value: function renderBarContent() {
            if (this.state.status === 0) {
                return null;
            }

            return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                'div',
                { className: 'pre-image-bar-content' },
                __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_antd__["e" /* Slider */], {
                    min: 0,
                    max: 1,
                    step: 0.01,
                    onChange: this.handleChangeScale,
                    value: this.state.scale
                })
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var _props3 = this.props,
                width = _props3.width,
                height = _props3.height,
                dpr = _props3.dpr;
            var _state4 = this.state,
                canvasWidth = _state4.canvasWidth,
                canvasHeight = _state4.canvasHeight,
                status = _state4.status,
                scale = _state4.scale;


            var preImageClass = __WEBPACK_IMPORTED_MODULE_7_classnames___default()('pre-image', {
                'pre-image-default': status === 0,
                'pre-image-uploaded': status === 1
            });

            var viewWidth = width / dpr;
            var viewHeight = height / dpr;

            return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_8_antd__["d" /* Popover */],
                {
                    title: this.renderBarTitle(),
                    content: this.renderBarContent(),
                    getPopupContainer: function getPopupContainer() {
                        return _this6.preImage;
                    },
                    mouseLeaveDelay: 0.5,
                    trigger: 'hover'
                },
                __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                    'div',
                    {
                        className: preImageClass,
                        ref: function ref(_ref5) {
                            _this6.preImage = _ref5;
                        },
                        onMouseDown: this.handleDragStart
                    },
                    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('canvas', {
                        style: { display: 'none' },
                        ref: function ref(_ref) {
                            _this6.store = _ref;
                        },
                        width: width,
                        height: height
                    }),
                    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('canvas', {
                        style: { display: 'none' },
                        ref: function ref(_ref2) {
                            _this6.reference = _ref2;
                        },
                        width: canvasWidth * dpr,
                        height: canvasHeight * dpr
                    }),
                    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                        'div',
                        {
                            className: 'pre-image-wrapper',
                            style: {
                                width: viewWidth,
                                height: viewHeight,
                                overflow: 'hidden'
                            }
                        },
                        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('canvas', {
                            style: {
                                position: 'absolute',
                                left: (viewWidth - canvasWidth) * 0.5,
                                top: (viewHeight - canvasHeight) * 0.5
                            },
                            width: canvasWidth,
                            height: canvasHeight,
                            ref: function ref(_ref3) {
                                _this6.controller = _ref3;
                            }
                        }),
                        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
                            'div',
                            {
                                className: 'pre-image-file-choose',
                                onClick: this.handleFile
                            },
                            __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_antd__["a" /* Icon */], { type: 'plus' })
                        )
                    ),
                    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('input', {
                        style: { display: 'none' },
                        className: 'pre-image-file-button',
                        ref: function ref(_ref4) {
                            _this6.fileButton = _ref4;
                        },
                        type: 'file',
                        onChange: this.handleGetFile
                    })
                )
            );
        }
    }]);

    return PreImage;
}(__WEBPACK_IMPORTED_MODULE_5_react__["Component"]);

PreImage.defaultProps = {
    /**
     * 容器宽度
     */
    width: 200,

    /**
     * 容器高度
     */
    height: 200,

    /**
     * 默认图片地址
     * 注意：此处不要涉及到跨域，否则需要服务端支持
     */
    url: '',

    /**
     * 如果是用于移动端头片or 其他场景，这里需要修改这个 dpr
     * 例如你要处理1张 400*400的图片，这可能占用了很大的操作空间
     * 那么这个值可以控制我们的操作容器和被操作的图片尺寸
     * 如果 dpr=2 -> ${width|height}/dpr, 这样操作容器的宽高都会缩小一半，但是实际保存的图片依旧是 width * height
     */
    dpr: 1,

    /**
     * 默认缩放比例
     */
    scale: 1,

    /**
     * 默认最大 N kb
     */
    maxsize: 10 * 1024 * 1024,

    /**
     * 图片质量
     */
    quality: 100,

    /**
     * 允许的文件类型
     */
    accept: ['jpg', 'jpeg', 'png', 'gif'],

    error: {
        accept: '文件类型错误，只支持: {accept}',
        size: '超过最大尺寸: {size}MB.'
    }
};

PreImage.propTypes = {
    width: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.number,
    height: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.number,
    url: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string,
    dpr: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.number,
    scale: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.number,
    maxsize: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.number,
    accept: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string),
    error: __WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_6_prop_types___default.a.string)
};

var _default = PreImage;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(PreImage, 'PreImage', 'E:/test/active-cms/client/components/pc/preImage/PreImage.jsx');

    __REACT_HOT_LOADER__.register(_default, 'default', 'E:/test/active-cms/client/components/pc/preImage/PreImage.jsx');
}();

;

/***/ }),

/***/ 1240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);



/**
 * @file BasicInfo.js
 * @author denglingbo
 *
 */
var BasicInfo = function () {
    function BasicInfo() {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, BasicInfo);

        // 每次点击开始的坐标
        this.click = BasicInfo.defaultValue;

        // 开始坐标
        this.start = BasicInfo.defaultValue;

        // 相对移动的值
        this.pos = BasicInfo.defaultValue;
    }

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(BasicInfo, [{
        key: "reset",
        value: function reset() {
            this.click = BasicInfo.defaultValue;
            this.start = BasicInfo.defaultValue;
            this.pos = BasicInfo.defaultValue;
        }
    }, {
        key: "click",
        set: function set(value) {
            this._click = value;
        },
        get: function get() {
            return this._click;
        }
    }, {
        key: "start",
        set: function set(value) {
            this._start = value;
        },
        get: function get() {
            return this._start;
        }
    }, {
        key: "pos",
        set: function set(value) {
            this._pos = value;
        },
        get: function get() {
            return this._pos;
        }
    }], [{
        key: "defaultValue",
        set: function set(val) {
            this._default = val;
        },
        get: function get() {
            return this._default || {
                x: 0,
                y: 0
            };
        }
    }]);

    return BasicInfo;
}();

var _default = BasicInfo;


/* harmony default export */ __webpack_exports__["a"] = (_default);
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(BasicInfo, "BasicInfo", "E:/test/active-cms/client/components/pc/preImage/BasicInfo.js");

    __REACT_HOT_LOADER__.register(_default, "default", "E:/test/active-cms/client/components/pc/preImage/BasicInfo.js");
}();

;

/***/ }),

/***/ 1241:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

});