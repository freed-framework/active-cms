import Immutable from 'immutable';
import ActionType from '../actions/ActionType';

const initState = Immutable.fromJS({
    data: null
});

export default (state = initState, action) => {
    switch (action.type) {
        case ActionType.GET_USER:
            return state.set('data', action.payload);

        default:
            return state;
    }
}