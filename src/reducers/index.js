import { combineReducers } from 'redux';
import { SET_USERS, REMOVE_USERS } from '../actions';

function users(state = [], action) {
    switch (action.type) {
        case SET_USERS:
            return action.users;
        case REMOVE_USERS:
            return [];
        default:
            return state;
    }
}


const rootReducers = combineReducers({ users });

export default rootReducers;