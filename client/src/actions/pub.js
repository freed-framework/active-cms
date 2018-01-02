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
