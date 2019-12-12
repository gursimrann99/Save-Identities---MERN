export const SET_USERS = 'SET_USERS';
export const REMOVE_USERS = 'REMOVE_USERS';

export function users(users) {
    return {
        type: SET_USERS,
        users
    }
}
export function remove(users){
    return {
        type: REMOVE_USERS,
        users
    }
}