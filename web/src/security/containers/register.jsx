import { connect } from 'react-redux'
import baseUrl from '../../config.js'
//import fetch from 'isomorphic-fetch'
import {securityService} from '../services/securityService.jsx'
import Register from '../components/register.jsx'
import {registerLoading,registerSuccess,registerError} from '../actions/securityAction.jsx'

function mapStateToProps(state) {
    return {
        errorData: state.register.errorData,
        data:state.register.data,
        passed:state.register.passed,
        loading:state.register.loading
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
                dispatch(registerError({errorMsg:'请填写用户名。'}));
                return;
            }

            if(password==''||password.trim()==''){
                dispatch(registerError({errorMsg:'请填写密码。'}));
                return;
            }
            
            dispatch(registerLoading());
            fetch(baseUrl('register'),{
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
                                        dispatch(registerSuccess());
                                        securityService.setCurrentUserInfo(user);
                                        this.context.router.history.replace('/app/chart');
                                    });
                                    window.socket.emit('userLogin',{id:user.id,name:user.name});
                                }catch(e){
                                    dispatch(registerError({errorMsg:'注册失败，请重新注册。'}));
                                }

                                //this.context.router.history.replace(`${this.context.router.route.match.url}/chart`);
                               
                            });
                        }else{
                            res.json().then(error=>{
                                dispatch(registerError(error))
                            });
                        }
                    }
                )
                .catch(
                    error=>dispatch(registerError(error))
                );
        }
    }
}

// Connected Component
const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);

export default App;