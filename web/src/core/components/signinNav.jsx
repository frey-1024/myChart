import React,{Component} from 'react';
import $cookie from '../../core/util/cookie'
import {onlineUserLeaved} from '../../chart/actions/chartAction.jsx'
import {securityService} from '../../security/services/securityService.jsx'
import LoadingBar from './loadingBar.jsx'
import '../style/header.scss'

export default class SignInNav extends Component{
    constructor(props) {
        super(props);
        this.signOutCurrentUser = this.signOutCurrentUser.bind(this)
    }
    signOutCurrentUser=()=>{
        var currentUser=securityService.getCurrentUserInfo();
        this.context.router.history.replace('/app/login');
        window.socket.emit('userSignOut', {id:currentUser.id});
        $cookie.removeAll();
    };
    render(){
        const {loading} = this.props;
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container" style={{height:'50px'}}>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <a onClick={this.signOutCurrentUser} href="javascript:;">退出</a>
                        </li>
                    </ul>
                </div>
                <LoadingBar isLoading={loading}/>
            </nav>
        );
    };
}
SignInNav.contextTypes = {
    router: React.PropTypes.object.isRequired,
    store: React.PropTypes.object.isRequired
};