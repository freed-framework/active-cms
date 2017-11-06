/**
 * @file user.js
 * @author shijh
 *
 * 用户信息
 */

import ActionType from './ActionType';

export const user = (data) => dispatch => (
    new Promise((resolve) => {
        dispatch({
            type: ActionType.GET_USER,
            data
        })
        resolve(data)
    })
)
