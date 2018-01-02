/**
 * @file page.js
 * @author denglingbo
 *
 */
import { fromJS } from 'immutable';
import ActionType from '../actions/ActionType';

const initState = fromJS({
    // 页面标题
    title: '',

    // 封面
    thumbnail: '',

    // 页面元数据
    content: [],

    // 获取的 app 组件的完整数据
    tile: {},
});

export default (state = initState, action) => {
    switch (action.type) {
        case ActionType.GET_PAGE_DATA: {
            return fromJS(action.payload);
        }

        case ActionType.SET_PAGE_CONTENT: {
            return state.set('content', action.payload);
        }

        case ActionType.SET_PAGE_TILE_DATA: {
            return state.set('tile', action.payload);
        }

        case ActionType.SET_PAGE_TITLE: {
            return state.set('title', action.payload);
        }

        case ActionType.SET_PAGE_THUMBNAIL: {
            return state.set('thumbnail', action.payload);
        }

        default:
            return state;
    }
}
