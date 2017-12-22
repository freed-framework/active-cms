'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

var _env = require('./env');

var _env2 = _interopRequireDefault(_env);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UploadZip = function UploadZip(_ref) {
    var folderZipPath = _ref.folderZipPath,
        baseUrl = _ref.baseUrl,
        timeStmp = _ref.timeStmp,
        body = _ref.body;

    return new _promise2.default(function (resolve, reject) {

        /**
          * id {string} 页面id
          * uploadUserId {string} 上传用户
          * description {string} 描述
          * effectTime {Date} 生效时间
          * invalidTime {Date} 有效时间
          * activityName {sting} 活动名称
          */
        var id = body.id,
            uploadUserId = body.uploadUserId,
            content = body.content,
            title = body.title,
            zipId = body.zipId,
            field = (0, _objectWithoutProperties3.default)(body, ['id', 'uploadUserId', 'content', 'title', 'zipId']);


        var formData = (0, _extends3.default)({
            uploadUserId: uploadUserId
        }, field, {
            file: {
                value: _fs2.default.createReadStream(folderZipPath),
                options: {
                    filename: timeStmp + '.zip'
                }
            }
        });

        zipId && (formData.id = zipId);

        _request2.default.post({ url: _env2.default.api + '/commonUploadFile/uploadZip', formData: formData }, function (err, httpResponse, res) {
            res = JSON.parse(res) || {};

            if (err) {
                reject(err);
                return;
            }

            (0, _rimraf2.default)(baseUrl, {}, function () {});
            (0, _rimraf2.default)(folderZipPath, {}, function () {});

            resolve(res);
        });
    });
};

var _default = UploadZip;
exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(UploadZip, 'UploadZip', 'src/uploadZip.js');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/uploadZip.js');
}();

;