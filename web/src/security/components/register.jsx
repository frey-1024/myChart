import React,{Component,PropTypes} from 'react'
import SignOutNav from '../../core/components/signOutNav.jsx'
import '../style/login.scss'
// React component
class Register extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {errorData,loading} = this.props;
        var handleSubmit = this.props.handleSubmit.bind(this);
        return (
            <div>
                <SignOutNav isLoadingBar={loading}/>
                <div className="container">
                    <div className="login-wrapper">
                        <form onSubmit={handleSubmit}>
                            <div className="text-center p-b-lg" style={{'paddingTop':'120px'}}>
                                <img className="user-head"
                                     src="https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=83465891,510538758&fm=85&s=BDA9783350756184170855EF0300E020"/>
                            </div>
                            {!loading && errorData && errorData.error && ( <div className="login-waring">
                                <i className="fa fa-warning"></i> <span>{errorData.error}</span>
                            </div>)}
                            <div>
                                <input type="text" ref={userName => this._userName = userName} className="input-control"
                                       placeholder="名字"/>
                            </div>
                            <div>
                                <input type="password" ref={userPassword => this._userPassword = userPassword}
                                       className="input-control" placeholder="密码"/>
                            </div>
                            <div className="text-center p-t-md">
                                <button className="btn btn-primary" disabled={loading} type="submit"
                                        style={{width:'290px'}}>注册
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
Register.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Register;
