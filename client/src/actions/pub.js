/**
 * @file pub
 * @author denglingbo
 *
 */
import ActionType from './ActionType';

/**
 * 修改 rect
 * @param {*} title
 */
export const setRect = (rect) => dispatch => dispatch({
    type: ActionType.SET_PUB_RECT,
    payload: rect,
});

/**
 * 设置激活的DOM 的信息
 * @param data
 */
export const setActiveInfo = (data) => dispatch => dispatch({
    type: ActionType.SET_PUB_ACTIVE_INFO,
    payload: data,
});

/**
 * 清空激活的 被操作组件 的信息
 */
export const clearActiveInfo = () => dispatch => dispatch({
    type: ActionType.CLEAR_PUB_ACTIVE_INFO,
});
