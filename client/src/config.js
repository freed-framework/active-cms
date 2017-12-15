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
// export const ssrHost = `${ENV.domain}/ssr`;
// export const apiHost = 'http://172.30.46.6:3000/api';
// export const ssrHost = 'http://localhost:12345/ssr';

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
