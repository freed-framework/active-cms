/**
 * 页面请求定义
 *
 * @file server.js
 * @author shijh
 */

import Http from 'freed-spa/lib/util/http';
import Login from './components/login';

const http = new Http();
// 拦截器 所有请求头添上Authorization

http.request(
    req => {
        const token = localStorage.getItem('access_token');
        if (token) {
            req.headers.Authorization = `bearer ${token}`;
        }
        return req;
    }
)

http.axios.defaults.timeout = 140000;

/**
 * http response 拦截器
 */
http.response(
    res => {
        if (res.data.code === 401 || res.data.code === 406) {
            Login(res.data.code);
            return Promise.reject(res);
        }
        return Promise.resolve(res);
    },
    err => {
        if (err.response) {
            const status = err.response.status;
            if (status === 401) {
                Login(status);
            }
        }
        return Promise.reject(err);
    }
);

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
export const addPage = (params) => http.post(`${config.domain}/api/page`, params);

/**
 * 获取指定页面
 */
export const getPage = (id) => http.get(`${config.domain}/api/page/query/${id}`);

/**
 * 编辑指定页面
 * params 参数包含
 * - id 页面id
 * - page 页面内容
 */
export const editPage = (params) => http.post(`${config.domain}/api/page/update`, params);

/**
 * 发布和不发布页面
 * params 参数包含
 * - id {string} 页面id
 * - type {boolean} 发布或者不发布页面
 */
export const publishPage = (params) => http.post(`${config.domain}/api/page/publish`, params);


/**
 * 获取列表
 * params 参数包含
 * - pageSize {number} 每页多少条
 * - page {number} 当前第几页
 */
export const listsPage = (params) => http.get(`${config.domain}/api/page/lists`, params);

/**
 * 通过title查询列表
 * params 参数包含
 * - pageSize {number} 每页多少条
 * - page {number} 当前第几页
 * - content {string} 页面title 模糊查询
 */
export const listsPageByTitle = (params) => http.get(`${config.domain}/api/page/queryByTitle`, params)

/**
 * 通过id删除指定页面
 * - id {string} 页面id
 */
export const deletePage = (id) => http.get(`${config.domain}/api/page/remove/${id}`);

/**
 * 通过id fork 页面
 * params 参数包含
 * - id {string} 页面id
 * - title {string} 页面title
 */
export const forkPage = (params) => http.post(`${config.domain}/api/page/update/fork`, params);

/**
 * 获取所有的用户
 */
export const fetchAllUsers = () => http.get(`${config.domain}/api/users`);

/**
 * 分享页面
 * params 参数包含
 * - users {Array<pageId, userId>}
 */
export const sharePage = (params) => http.post(`${config.domain}/api/page/share`, params);

/**
 * 查询分享给自己的页面
 * params 参数包含
 * - pageSize {number} 每页多少条
 * - page {number} 当前第几页
 * - content {string} 页面title 模糊查询
 */
export const shareList = (params) => http.get(`${config.domain}/api/share/lists`, params);

/**
 * 查询本地上传的页面
 * params 参数包含
 * - pageSize {number} 每页多少条
 * - page {number} 当前第几页
 * - content {string} 页面title 模糊查询
 */
export const localList = (params) => http.get(`${config.domain}/api/local`, params);

/**
 * 用户登录
 * params 参数包含
 * - userName {string} 用户名
 * - password {string | number} 密码
 */
export const login = (params) => http.post(`${config.domain}/api/auth/login`, params);

/**
 * 退出登录
 */
export const logout = () => http.get(`${config.domain}/api/users/logout`);

/**
 * 获取当前用户信息
 */
export const user = () => http.get(`${config.domain}/api/users/user`);

/**
 * 上传zip
 * description String 否 活动描述
 * effectTime Date 否 生效时间
 * invalidTime Date 否 有效时间
 * activityName String 否 活动名称
 * uploadUserId String 是 上传用户ID
 * file file 是 zip文件
 */
export const zip = () => http.get(`${config.domain}/api/upload/zip`);

/**
 * 推送页面
 * description String 否 活动描述
 * effectTime Date 否 生效时间
 * invalidTime Date 否 有效时间
 * activityName String 否 活动名称
 * uploadUserId String 是 上传用户ID
 */
export const push = (params) => http.post(`${config.domain}/api/page/push`, params);

/**
 * 删除本地上传页面
 * params 参数包含
 * - id {string} 本地上传页面id
 */
export const deleteLocal = (id) => http.get(`${config.domain}/api/local/remove/${id}`);
