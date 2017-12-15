/**
 * @file user.js
 * @author shijh
 *
 * 用户信息
 */

import ActionType from './ActionType';
import { user } from '../../src/services';

export const getUser = () => dispatch => (
    new Promise((resolve) => {
        user().then((res) => {
            dispatch({
                type: ActionType.GET_USER,
                payload: res.data
            })
            resolve(res)
        })
    })
)
