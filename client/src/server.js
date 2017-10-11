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


/**
 * 获取列表
 * params 参数包含
 * - pageSize {number} 每页多少条
 * - page {number} 当前第几页
 */
export const listsPage = (params) => http.get(`${apiHost}/page/lists`, params);

/**
 * 通过id删除指定页面
 * - id {string} 页面id
 */
export const deletePage = (id) => http.get(`${apiHost}/page/remove/${id}`);

/**
 * 通过id fork 页面
 * params 参数包含
 * - id {string} 页面id
 * - title {string} 页面title
 */
export const forkPage = (params) => http.post(`${apiHost}/page/update/fork`, params);