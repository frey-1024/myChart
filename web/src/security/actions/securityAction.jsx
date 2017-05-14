
const loginLoading = () => ({ 
    type: 'LOGIN_LOADING'
});
const loginSuccess = () => ({
    type: 'LOGIN_SUCCESS'
});
const loginError = data => ({ 
    type: 'LOGIN_ERROR',
    errorData:{error:data.errorMsg} 
});


const registerLoading = () => ({ 
    type: 'REGISTER_LOADING'
});
const registerSuccess = () => ({ 
    type: 'REGISTER_SUCCESS'
});
const registerError = data => ({ 
    type: 'REGISTER_ERROR', 
    errorData:{error:data.errorMsg} 
});

const userUpdate = users=>({
    type: 'ONLINE_USERS_UPDATE',
    users
});

export {
    loginLoading,
    loginSuccess,
    loginError,

    registerLoading,
    registerSuccess,
    registerError,
    userUpdate
};