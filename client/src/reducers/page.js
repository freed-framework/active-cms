/**
 * @file page.js
 * @author denglingbo
 *
 */
import { fromJS } from 'immutable';
import ActionType from '../actions/ActionType';

const initState = fromJS({
    title: '',
    thumbnail: '',
    content: [],
});

export default (state = initState, action) => {
    switch (action.type) {
        case ActionType.GET_PAGE_DATA: {
            return fromJS(action.payload);
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
