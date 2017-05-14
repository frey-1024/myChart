import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {globalLoadingWidthSignIn} from './coreReducer.jsx'
import {login, register, onlineUsersUpdate} from '../../security/reducers/securityReducer.jsx'
import {onlineUsers,chartMessages,inputMessage} from '../../chart/reducers/chartReducer.jsx'

const appReducers = combineReducers({
    routing: routerReducer,
    login,
    register,
    globalLoadingWidthSignIn,
    onlineUsersUpdate,
    onlineUsers,
    chartMessages,
    inputMessage
});
export default appReducers;
