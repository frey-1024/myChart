import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Redirect, Link} from 'react-router-dom'

import Bundle from './bundle';
import {RedirectWithStatus} from '../routers/customRouterComponent.jsx';
import LoginContainer from 'bundle-loader?lazy!../../security/containers/login.jsx'
import RegisterContainer from 'bundle-loader?lazy!../../security/containers/register.jsx'
import ChartComponent from 'bundle-loader?lazy!../../chart/components/chart.jsx'
import $cookie from '../../core/util/cookie'
import {securityService} from '../../security/services/securityService.jsx'
import '../style/header.scss'
const Login = () => (
    <Bundle load={LoginContainer}>
        {(Login) => <Login />}
    </Bundle>
);
const Chart = () => (
    <Bundle load={ChartComponent}>
        {(Chart) => <Chart />}
    </Bundle>
);
const Register = () => (
    <Bundle load={RegisterContainer}>
        {(Register) => <Register />}
    </Bundle>
);
export default class App extends Component{
    constructor(props) {
        super(props);
        this.signOutCurrentUser = this.signOutCurrentUser.bind(this)
    }
    signOutCurrentUser=()=>{
        $cookie.removeAll();
        this.context.router.history.replace(`${this.context.router.route.match.url}/login`);
    };
    render(){
        const currentUser= securityService.getCurrentUserInfo();
        const matchUrl=this.context.router.route.match.url;
        return (
                <div>
                    <Route path={`${matchUrl}/login`} component={Login}/>
                    <Route path={`${matchUrl}/register`} component={Register}/>
                    <Route path={`${matchUrl}/chart`} component={Chart}/>
                    <RedirectWithStatus to={`${matchUrl}/login`} status ={!currentUser}/>
                    <RedirectWithStatus to={`${matchUrl}/chart`} status ={currentUser}/>
                </div>
        );
    };
}
App.contextTypes = {
    router: React.PropTypes.object.isRequired
};