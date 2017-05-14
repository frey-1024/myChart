function onlineUsers(state = {users: []}, action) {
    var prevUsers, i;
    switch (action.type) {
        case 'LOADING_USERS':
            return {loading: action.loading, users: state.users};
        case 'ADD_ONLINE_USER':
            prevUsers = [...state.users];
            for (i in prevUsers) {
                if (prevUsers[i].id == action.user.id) {
                    return {loading: state.loading, users: [...state.users]};
                }
            }
            return {loading: state.loading, users: [...state.users,action.user]};

        case 'GET_ONLINE_USERS_BY_INIT':
            return {loading: action.loading, users: action.users};

        case 'ONLINE_USER_LEAVED':
            prevUsers = [...state.users];
            for (i in prevUsers) {
                if (prevUsers[i].id == action.user.id) {
                    prevUsers.splice(i, 1);
                    break;
                }
            }
            return {loading: state.loading, users: prevUsers};
        default:
            return state;
    }
}
function chartMessages(state = {messages: [], height: 540, menu: {left: 0, top: 0, open: false}}, action) {
    switch (action.type) {
        case 'LOADING_MESSAGES':
            return {
                messages: state.messages,
                loading: action.loading,
                isScroll: action.isScroll,
                moreThanMsg: state.moreThanMsg,
                menu: {left: 0, top: 0, open: false},
                height: state.height
            };
        case 'ADD_MESSAGE':
            return {
                messages: [...state.messages, action.message],
                loading: state.loading,
                isScroll: state.isScroll,
                moreThanMsg: state.moreThanMsg,
                menu: {left: 0, top: 0, open: false},
                height: state.height
            };
        case 'GET_MESSAGES_BY_INIT':
            return {
                messages: [...action.messages],
                loading: action.loading,
                isScroll: state.isScroll,
                moreThanMsg: action.moreThanMsg,
                menu: {left: 0, top: 0, open: false},
                height: state.height
            };
        case 'UPDATE_MESSAGES':
            return {
                messages: [...action.messages, ...state.messages],
                loading: action.loading,
                isScroll: state.isScroll,
                moreThanMsg: action.moreThanMsg,
                menu: {left: 0, top: 0, open: false},
                height: state.height
            };
        case 'SCROLL_MESSAGES':
            return {
                messages: state.messages,
                loading: state.loading,
                isScroll: action.isScroll,
                moreThanMsg: state.moreThanMsg,
                menu: {left: 0, top: 0, open: false},
                height: state.height
            };
        case 'CHANGE_MESSAGE_HEIGHT':
            return {
                messages: state.messages,
                loading: state.loading,
                isScroll: action.isScroll,
                moreThanMsg: state.moreThanMsg,
                menu: {left: 0, top: 0, open: false},
                height: action.height
            };
        case 'CUSTOM_MENUS':
            return {
                messages: state.messages,
                loading: state.loading,
                isScroll: state.isScroll,
                moreThanMsg: state.moreThanMsg,
                menu: action.menu,
                height: state.height
            };
        case 'DELETE_MESSAGE':
            var prevMessages = [...state.messages];
            for (var i in prevMessages) {
                if (prevMessages[i].id == action.messageId) {
                    prevMessages.splice(i, 1);
                    break;
                }
            }
            return {
                messages: prevMessages,
                loading: state.loading,
                isScroll: state.isScroll,
                moreThanMsg: state.moreThanMsg,
                menu: state.menu,
                height: state.height
            };
        default:
            return state;
    }
}
function inputMessage(state = {height: 100}, action) {
    switch (action.type) {
        case 'CHANGE_INPUT_HEIGHT':
            return {
                height: action.height
            };
        default:
            return state;
    }
}
export {onlineUsers, chartMessages, inputMessage}