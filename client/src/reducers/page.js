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

    // 获取的 App 组件的完整数据
    tile: {},

    // 页面源数据
    content: [],

    activeId: null,
});

export default (state = initState, action) => {
    switch (action.type) {
        case ActionType.GET_PAGE_DATA: {
            return fromJS(action.payload);
        }

        case ActionType.GET_PAGE_ACTIVE: {
            return state.get('activeId');
        }

        case ActionType.CLEAR_PAGE_ACTIVE: {
            return state.set('activeId', null);
        }

        case ActionType.SET_PAGE_ACTIVE: {
            return state.set('activeId', action.payload);
        }

        case ActionType.SET_PAGE_CONTENT: {
            return state.set('content', action.payload);
        }

        case ActionType.SET_PAGE_TILE_DATA: {
            return state.set('tile', fromJS(action.payload));
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
