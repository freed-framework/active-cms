import Http from 'freed-spa/src/util/http';

const http = new Http();

const apiHost = 'http://www.iting.top/api';

/**
 * 页面相关
 */

/**
 * 新增页面
 *
 * params 参数包含
 * - title 页面标题
 * - content 页面内容
 */
export const addPage = (params) => http.post(`${apiHost}/page`, params);

/**
 * 获取指定页面
 */
export const getPage = (id) => http.get(`${apiHost}/page/query/${id}`);

/**
 * 编辑指定页面
 * params 参数包含
 * - id 页面id
 * - page 页面内容
 */
export const editPage = (params) => http.post(`${apiHost}/page/update`, params);

/**
 * 发布和不发布页面
 * params 参数包含
 * - id {string} 页面id
 * - type {boolean} 发布或者不发布页面
 */
export const publishPage = (params) => http.post(`${apiHost}/page/publish`, params);
