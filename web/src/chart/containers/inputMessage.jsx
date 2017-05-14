import { connect } from 'react-redux'
import InputMessage from '../components/inputMessage.jsx'
import {scrollMessages} from '../actions/chartAction.jsx'
import {securityService} from '../../security/services/securityService.jsx'
function mapStateToProps(state) {
    return {
        height: state.inputMessage.height
    }
}
function changeMessage(dispatch,self){
    dispatch(scrollMessages({isScroll:true}));
    if(self._info.value==''||self._info.value.trim()==''){
        return;
    }
    var currentUser=securityService.getCurrentUserInfo();
    window.socket.emit('serverMessageUpdate',{content: self._info.value,userId:currentUser.id,userName:currentUser.name});
    self._info.value='';
}

function mapDispatchToProps(dispatch,state) {
    return {
        handleSubmitInfo:function (ev){
            changeMessage(dispatch,this);
        },
        handleKeyPress:function (ev) {
            var keyCode = ev.which || ev.keyCode;
            if (keyCode == 13 && !ev.shiftKey) {
                changeMessage(dispatch, this);
                ev.preventDefault();
            }
        }
    }
}

// Connected Component
const inputMessageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(InputMessage);

export default inputMessageContainer;