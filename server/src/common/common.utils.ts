/**
 * @file common.utils.ts
 * @author shijh
 *
 * 公共工具
 */

import * as _ from 'lodash';

/**
 * 成功请求
 * @param data
 */
export const success = (data = {}, message = '请求成功') => {
    if (data === null) {
        data = {}
    }
    return {
        code: 200,
        message,
        data
    }
}

/**
 * 请求失败
 * @param data
 */
export const fail = (data = {}, message = '请求失败') => {
    if (data === null) {
        data = {}
    }
    return {
        code: 500,
        message,
        data
    }
}

/**
 * 用户未登录
 * @param data
 */
export const notFound = (data = {}, message = '用户未登录') => {
    if (data === null) {
        data = {}
    }
    return {
        code: 401,
        message,
        data
    }
}

/**
 * 用户未授权
 */
export const authorization = (data = {}, message = '用户未授权') => {
    if (data === null) {
        data = {}
    }
    return {
        code: 404,
        message,
        data
    }
}

/**
 * 登录失效
 */
 export const expired = (data = {}, message = '登录过期') => {
    if (data === null) {
        data = {}
    }
    return {
        code: 406,
        message,
        data
    }
}
