import { connect } from 'react-redux'
import baseUrl from '../../config.js'
//import fetch from 'isomorphic-fetch'
import {securityService} from '../services/securityService.jsx'
import Login from '../components/Login.jsx'
import {loginLoading,loginSuccess,loginError} from '../actions/securityAction.jsx'

function mapStateToProps(state) {
    return {
        errorData: state.login.errorData,
        data:state.login.data,
        passed:state.login.passed,
        loading:state.login.loading
    }
}
// Map Redux actions to component props
function mapDispatchToProps(dispatch,state) {
    return {
        handleSubmit:function (ev){
            ev.preventDefault();
            var name = this._userName.value,
                password = this._userPassword.value;
            
            if(name==''||name.trim()==''){
                dispatch(loginError({errorMsg:'请填写用户名。'}));
                return;
            }
            
            if(password==''||password.trim()==''){
                dispatch(loginError({errorMsg:'请填写密码。'}));
                return;
            }
            dispatch(loginLoading());
            fetch(baseUrl('login'),{
                method: "POST",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    name:name,
                    password:password
                })
            })
                .then(
                    res=>{
                        if(res.ok){
                            res.json().then(user=>{
                              try{
                                  window.socket.on('onlineIdAddSuccess',()=>{
                                      dispatch(loginSuccess());
                                      securityService.setCurrentUserInfo(user);
                                      this.context.router.history.replace('/app/chart');
                                  });
                                  window.socket.emit('userLogin',{id:user.id,name:user.name});
                              }catch (e){
                                  dispatch(loginError({errorMsg:'登录失败，请重新登录。'}));
                              }
                            });
                        }else{
                            res.json().then(error=>{
                                dispatch(loginError(error));
                            });
                        }
                    }
                )
                .catch(
                    error=>dispatch(loginError(error))
                );
        }
    }
}

// Connected Component
const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default App;