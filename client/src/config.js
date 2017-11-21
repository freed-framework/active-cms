/**
 * @file config.js
 * @author denglingbo
 *
 */

/**
 * 后端请求接口
 * @type {string}
 */
export const apiHost = 'http://www.iting.top/api';
// export const apiHost = 'http://172.30.40.16:3000/api';

/**
 * 上传图片基本配置
 * @type {{baseUrl: string, multiple: boolean, chooseAndUpload: boolean, dataType: string, fileFieldName: string}}
 */
export const uploadImage = {
    baseUrl: 'http://www.iting.top/api/image',
    multiple: true,
    chooseAndUpload: true,
    dataType: 'multipart/form-data',
    fileFieldName: 'file',
}

// Multiple
// Single
