import React, {Component} from 'react'
export default class CustomMenu extends Component {
    constructor(props) {
        super(props);
    }
    deleteMessage=()=>{
        this.props.deleteCallBack(this.props.menu.messageId);
    };
    render() {
        const {menu} = this.props;
        var menuStyle={};
        if (menu.open && menu.messageId) {
            menuStyle.display='block';
            menuStyle.left=menu.left+'px';
            menuStyle.top=menu.top+'px';
        }else{
            menuStyle.display='none';
        }
        return (
            <ul className="custom-menu" style={menuStyle}>
                <li>
                    <a onClick={this.deleteMessage} href="javascript:;">
                        <i className="fa fa-trash m-r-sm"></i>
                        删除此信息
                    </a>
                </li>
                <li>
                    <a href="javascript:;">
                        <i className="fa fa-edit m-r-sm"></i>
                        编辑此信息 (暂时没做)
                    </a>
                </li>
                <li>
                    <a href="javascript:;">
                        <i className="fa fa-copy m-r-sm"></i>
                        复制此信息 (暂时没做)
                    </a>
                </li>
            </ul>
        );
    }
}