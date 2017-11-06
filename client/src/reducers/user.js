import Immutable from 'immutable';
import ActionType from '../actions/ActionType';

const initState = Immutable.fromJS({
    data: 123123
});

export default (state = initState, action) => {
    switch (action.type) {
        case ActionType.GET_USER:
            console.log(action.payload)
            return state.set('data', action.payload);

        default:
            return state;
    }
}