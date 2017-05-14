import React, {Component} from 'react'

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.props.getAllOnlineUsers();
    }

    render() {
        const {onlineUsers,loading} = this.props;
        return (<div className="online-wrapper">
            <div className="online-list">
                <strong className="list-header">
                    <i className="fa fa-check-circle text-info m-r-sm"> </i>
                    在线列表
                </strong>
                <ul className="list-content">
                    {loading&&<li className="text-center"><i className="fa fa-spin fa-spinner"></i></li>}
                    {onlineUsers.map((user, index) =>
                        <li key={user.id}>
                            <img className="user-header"
                                 src="https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=83465891,510538758&fm=85&s=BDA9783350756184170855EF0300E020"/>
                            <span>{user.name}</span>
                        </li>
                    )}
                </ul>
            </div>
        </div>);
    }
}
