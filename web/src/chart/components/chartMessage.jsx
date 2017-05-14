import React, {Component} from 'react'
import {securityService} from '../../security/services/securityService.jsx'
import LoadMoreMessages from './loadMoreMessages.jsx'
import CustomMenu from './customMenu.jsx'
export default class ChartMessage extends Component {
    constructor(props) {
        super(props);
        this.props.getAllMessages({createAt:new Date()},true);
        this.props.customMenusInit();
    }

    componentDidUpdate=()=> {
        if(this.props.isScroll){
            //始终显示最新的那条信息
            var messageElement = this.refs.chartMessageWrapper;
            messageElement.scrollTop = messageElement.scrollHeight - messageElement.offsetHeight;
        }
    };

    render() {
        const {messages,height,moreThanMsg,loading,menu,deleteCurrentMessage} = this.props;
        const currentUser = securityService.getCurrentUserInfo();
        return (
            <div className="chart-message" ref="chartMessageWrapper" style={{height:height+'px'}}>
                <CustomMenu menu={menu} deleteCallBack={deleteCurrentMessage}/>
                <LoadMoreMessages moreThanMsg={moreThanMsg} loading={loading} firstMessage={messages[0]} getAnotherMessages={this.props.getAllMessages} />
                {
                    messages.map((message)=> {
                        if (message.userId == currentUser.id) {
                            return ( <section className="take-note take-note-self" key={message.id}>
                                <div className="user-head-wrapper">
                                    <img className="user-header"
                                         src="https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=83465891,510538758&fm=85&s=BDA9783350756184170855EF0300E020"/>
                                </div>
                                <div className="note">
                                    <div className="note-header">{message.userName}</div>
                                    <pre className="note-content is-self" id={message.id}>
                                        {message.content}
                                    </pre>
                                </div>
                            </section>);
                        } else {
                            return (<section className="take-note take-note-other" key={message.id}>
                                <div className="user-head-wrapper">
                                    <img className="user-header"
                                         src="https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=83465891,510538758&fm=85&s=BDA9783350756184170855EF0300E020"/>
                                </div>
                                <div className="note">
                                    <div className="note-header">{message.userName}</div>
                                    <pre className="note-content">
                                         {message.content}
                                    </pre>
                                </div>
                            </section>);
                        }
                    })
                }
            </div>
        );
    }
}