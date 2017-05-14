import { connect } from 'react-redux'
import OnlineUsers from '../components/onlineUsers.jsx'
import {loadingUsers,getOnlineUsersByInit} from '../actions/chartAction.jsx'
import baseUrl from '../../config.js'
function mapStateToProps(state) {
    return {
        onlineUsers:state.onlineUsers.users,
        loading:state.onlineUsers.loading
    }
}

function mapDispatchToProps(dispatch,state) {
    return {
        getAllOnlineUsers:function() {
            dispatch(loadingUsers({loading: true}));
            fetch(baseUrl('online/users'), {
                method: "GET",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res=> {
                if (res.ok) {
                    res.json().then(users=> {
                        dispatch(getOnlineUsersByInit(users));
                    });
                } else {
                    res.json().then(error=> {
                        dispatch(loadingUsers({loading: false}));
                    });
                }
            }).catch(error=> {
                dispatch(loadingUsers({loading: false}));
            });
        }
    }
}

// Connected Component
const onlineUsersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OnlineUsers);

export default onlineUsersContainer;