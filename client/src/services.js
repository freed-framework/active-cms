/**
 * 页面请求定义
 *
 * @file server.js
 * @author shijh
 */

import Http from 'freed-spa/lib/util/http';
import * as Cookies from 'js-cookie';
import Login from './components/login';
import { apiHost, ssrHost } from './config';

const http = new Http();

http.axios.defaults.timeout = 140000;

http.request(
    req => {
        req.headers.token = Cookies.get('token');

        return req
    }
)

/**
 * http response 拦截器
 */
http.response(
    res => {
        if (res.data.code === 401) {
            Login();
            return Promise.reject(res);
        }
        return Promise.resolve(res);
    },
    err => {
        if (err.response) {
            const status = err.response.status;
            if (status === 401) {
                Login();
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
 * 通过title查询列表
 * params 参数包含
 * - pageSize {number} 每页多少条
 * - page {number} 当前第几页
 * - content {string} 页面title 模糊查询
 */
export const listsPageByTitle = (params) => http.get(`${apiHost}/page/queryByTitle`, params)

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

/**
 * 获取所有的用户
 */
export const fetchAllUsers = () => http.get(`${apiHost}/users`);

/**
 * 分享页面
 * params 参数包含
 * - users {Array<pageId, userId>} 
 */
export const sharePage = (params) => http.post(`${apiHost}/page/share`, params);

/**
 * 查询分享给自己的页面
 * params 参数包含
 * - pageSize {number} 每页多少条
 * - page {number} 当前第几页
 * - content {string} 页面title 模糊查询
 */
export const shareList = (params) => http.get(`${apiHost}/share/lists`, params);

/**
 * 用户登录
 * params 参数包含
 * - userName {string} 用户名
 * - password {string | number} 密码
 */
export const login = (params) => http.post(`${apiHost}/users/login`, params);

/**
 * 退出登录
 */
export const logout = () => http.get(`${apiHost}/users/logout`);

/**
 * 上传zip
 * description String 否 活动描述
 * effectTime Date 否 生效时间
 * invalidTime Date 否 有效时间
 * activityName String 否 活动名称
 * uploadUserId String 是 上传用户ID
 * file file 是 zip文件
 */
export const zip = () => http.get(`${apiHost}/upload/zip`);

/**
 * 推送页面
 * description String 否 活动描述
 * effectTime Date 否 生效时间
 * invalidTime Date 否 有效时间
 * activityName String 否 活动名称
 * uploadUserId String 是 上传用户ID
 */
export const push = (params) => http.post(`${apiHost}/page/push`, params);
