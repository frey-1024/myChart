// login Reducer
export function login(state = {}, action) {
    switch (action.type) {
        case 'LOGIN_LOADING':
            return {loading:true};
        case 'LOGIN_SUCCESS':
            return {loading:false};
        case 'LOGIN_ERROR':
            return {loading:false,errorData:action.errorData};
        default:
            return state
    }
}
// register Reducer
export function register(state = {}, action) {
    switch (action.type) {
        case 'REGISTER_LOADING':
            return {loading:true};
        case 'REGISTER_SUCCESS':
            return {loading:false};
        case 'REGISTER_ERROR':
            return {loading:false,errorData:action.errorData};
        default:
            return state
    }
}
export function onlineUsersUpdate(state = [], action) {
    switch (action.type) {
        case 'ONLINE_USERS_UPDATE':
            return action.users;
        case 'DEFAULT_ONLINE_USERS':
            return action.users;
        default:
            return state;
    }
}