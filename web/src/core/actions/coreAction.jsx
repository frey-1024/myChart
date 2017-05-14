function userSignOut() {
    return {
        type: 'USER_SIGN_OUT'
    }
}
function globalLoadingWidthSignIn(data){
    return {
        type: 'LOADING_WIDTH_SIGN_IN',
        loading:data.loading
    }
}

export { userSignOut,globalLoadingWidthSignIn };
