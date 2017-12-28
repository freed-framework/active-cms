/**
 * @file pub.js
 * @author denglingbo
 *
 */

import { fromJS } from 'immutable';
import ActionType from '../actions/ActionType';

const initState = fromJS({
    rect: null,
    activeInfo: null,
});

export default (state = initState, action) => {
    switch (action.type) {
        case ActionType.SET_PUB_RECT: {
            return state.set('rect', action.payload);
        }

        case ActionType.SET_PUB_ACTIVE_INFO: {
            return state.set('activeInfo', action.payload);
        }

        case ActionType.CLEAR_PUB_ACTIVE_INFO: {
            return state.set('activeInfo', null);
        }

        default:
            return state;
    }
}
