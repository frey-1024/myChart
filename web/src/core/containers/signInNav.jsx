import { connect } from 'react-redux'
import SignInNav from '../components/signInNav.jsx'
function mapStateToProps(state) {
    return {
        loading:state.globalLoadingWidthSignIn.loading
    }
}
function mapDispatchToProps(dispatch,state) {
    return {}
}

// Connected Component
const signInNavContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInNav);

export default signInNavContainer;