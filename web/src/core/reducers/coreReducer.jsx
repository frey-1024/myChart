function globalLoadingWidthSignIn(state = {loading:false}, action){
    switch (action.type) {
        case 'LOADING_WIDTH_SIGN_IN':
            return {loading:action.loading};
        default:
            return state;
    }
}
export {globalLoadingWidthSignIn}