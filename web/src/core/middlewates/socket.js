import {addOnlineUser,onlineUserLeaved, addMessage,deleteMessage } from '../../chart/actions/chartAction.jsx'
import {securityService} from '../../security/services/securityService.jsx'

function createSocketMiddleware(socket) {
  var eventFlag = false;
  return store => next => action => {
    if (!eventFlag) {
      eventFlag = true;
      //添加上线用户
      socket.on('addOnlineUser', function(user) {
        next(addOnlineUser(user));
      });
      //更新聊天记录
      socket.on('addMessage', function(data) {
        next(addMessage(data));
      });
      
      socket.on('deleteMessageListener', function(data) {
        next(deleteMessage(data));
      });
      
      socket.on('onlineUserLeaved', function(user) {
        next(onlineUserLeaved(user));
      });
    }
    return next(action);
  }
}

export default createSocketMiddleware;
