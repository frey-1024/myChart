import { connect } from 'react-redux'
//import fetch from 'isomorphic-fetch'
import baseUrl from '../../config.js'
import ChartMessage from '../components/chartMessage.jsx'
import {loadingMessages,getMessagesByInit,updateMessages,customMenus,deleteMessage} from '../actions/chartAction.jsx'
import {globalLoadingWidthSignIn} from '../../core/actions/coreAction.jsx'
function mapStateToProps(state) {
    return {
        messages: state.chartMessages.messages,
        isScroll:state.chartMessages.isScroll,
        loading:state.chartMessages.loading,
        moreThanMsg:state.chartMessages.moreThanMsg,
        menu:state.chartMessages.menu,
        height:state.chartMessages.height
    }
}
function mapDispatchToProps(dispatch,state) {
    return {
        getAllMessages:function(latestData,isInit){
            dispatch(loadingMessages({loading:true, isScroll:false}));
            dispatch(globalLoadingWidthSignIn({loading:true}));
            fetch(baseUrl('chart/messages'), {
                method: "POST",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(latestData)
            }).then(res=> {
                if (res.ok) {
                    res.json().then(messages=> {
                        var messageActionData={
                            messages:messages,
                            isScroll:false,
                            loading:false,
                            moreThanMsg:messages.length>9
                        };
                        if(isInit){
                            dispatch(getMessagesByInit(messageActionData));
                        }else{
                            dispatch(updateMessages(messageActionData));
                        }
                        dispatch(globalLoadingWidthSignIn({loading:false}));
                    });
                } else {res.json().then(error=> {
                    dispatch(loadingMessages({loading:false, isScroll:false}));
                    dispatch(globalLoadingWidthSignIn({loading:false}));
                });}
            }).catch(error=> {
                dispatch(loadingMessages({loading:false, isScroll:false}));
                dispatch(globalLoadingWidthSignIn({loading:false}));
            });
        },
        customMenusInit:()=>{
            var isOpened = false;
            document.oncontextmenu=function(ev){
                const elementMessage=ev.target;
                if(elementMessage.className=='note-content is-self'){
                    ev.preventDefault();
                    ev.stopPropagation();
                    isOpened=true;
                    dispatch(customMenus({open:true,left:ev.clientX,top:ev.clientY,messageId:elementMessage.id}));
                }else if(isOpened){
                    isOpened=false;
                    dispatch(customMenus({open:false}));
                }
            };
            document.onclick=function(){
                if(!isOpened){
                    return;
                }
                isOpened=false;
                dispatch(customMenus({open:false}));
            }

        },
        deleteCurrentMessage:(messageId)=>{
            fetch(baseUrl('delete/message/'+messageId), {
                method: "DELETE",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res=> {
                if (res.ok) {
                    res.json().then(data=> {
                        dispatch(deleteMessage({messageId:data.messageId}));
                        window.socket.emit('deleteMessage',{messageId:data.messageId});
                    });
                } else {res.json().then(error=> {

                   // dispatch(loadingMessages({loading:false, isScroll:false}));
                   // dispatch(globalLoadingWidthSignIn({loading:false}));
                });}
            }).catch(error=> {
               // dispatch(loadingMessages({loading:false, isScroll:false}));
               // dispatch(globalLoadingWidthSignIn({loading:false}));
            });
        }
    }
}

// Connected Component
const chartMessageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChartMessage);

export default chartMessageContainer;