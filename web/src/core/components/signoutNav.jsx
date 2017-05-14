import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import LoadingBar from './loadingBar.jsx'
import '../style/header.scss'
export default class SignOutNav extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        const {isLoadingBar} = this.props;
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container" style={{height:'50px'}}>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to="/app/login">登录</Link>
                        </li>
                        <li>
                            <Link to="/app/register">注册</Link>
                        </li>
                    </ul>
                </div>
                <LoadingBar isLoading={isLoadingBar}/>
            </nav>
        );
    };
}