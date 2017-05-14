/* online users actions */
function loadingUsers(data){
    return {
        type:'LOADING_USERS',
        loading:data.loading
    }
}

function addOnlineUser(user){
    return {
        type:'ADD_ONLINE_USER',
        user
    }
}

function getOnlineUsersByInit(users){
    return {
        type: 'GET_ONLINE_USERS_BY_INIT',
        users
    }
}

// function updateOnlineUsers (users){
//     return {
//         type: 'UPDATE_ONLINE_USERS',
//         users
//     }
// }

function onlineUserLeaved(data){
    return {
        type:'ONLINE_USER_LEAVED',
        user:data
    }
}

/* users messages actions*/

function loadingMessages(data) {
    return {
        type: 'LOADING_MESSAGES',
        loading:data.loading
    }
}

function addMessage(data) {
    return {
        type: 'ADD_MESSAGE',
        message:data
    }
}

function getMessagesByInit(data) {
    return {
        type: 'GET_MESSAGES_BY_INIT',
        messages:data.messages,
        loading:data.loading,
        moreThanMsg:data.moreThanMsg,
        isScroll:data.isScroll
    }
}
function updateMessages(data) {
    return {
        type: 'UPDATE_MESSAGES',
        messages:data.messages,
        loading:data.loading,
        moreThanMsg:data.moreThanMsg,
        isScroll:data.isScroll
    }
}

function scrollMessages(data) {
    return {
        type: 'SCROLL_MESSAGES',
        isScroll:data.isScroll
    }
}

function changeMessageHeight(data) {
    return {
        type: 'CHANGE_MESSAGE_HEIGHT',
        height:data.height
    }
}

function customMenus(menu){
    return {
        type: 'CUSTOM_MENUS',
        menu
    }
}
function deleteMessage(data){
    return {
        type: 'DELETE_MESSAGE',
        messageId:data.messageId
    }
}


/*输入框 action*/
function changeInputHeight(data){
    return {
        type:'CHANGE_INPUT_HEIGHT',
        height:data.height
    }
}

export {
   //online users
    loadingUsers,
    addOnlineUser,
   // updateOnlineUsers,
    getOnlineUsersByInit,
    onlineUserLeaved,

    //users messages
    loadingMessages,
    addMessage,
    getMessagesByInit,
    updateMessages,
    scrollMessages,
    changeMessageHeight,
    customMenus,
    deleteMessage,

    changeInputHeight
};
