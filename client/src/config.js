/**
 * @file config.js
 * @author denglingbo
 *
 */

/**
 * 后端请求接口
 * @type {string}
 */
import ENV from '../../conf/env';

export const apiHost = `${ENV.domain}/api`;
// export const apiHost = 'http://172.30.40.16:3000/api';

/**
 * 上传图片基本配置
 * @type {{baseUrl: string, multiple: boolean, chooseAndUpload: boolean, dataType: string, fileFieldName: string}}
 */
export const uploadImage = {
    baseUrl: `${apiHost}/image`,
    multiple: true,
    chooseAndUpload: true,
    dataType: 'multipart/form-data',
    fileFieldName: 'file',
}

// Multiple
// Single
