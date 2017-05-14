import React,{Component} from 'react';

export default class LoadMoreMessages extends Component{
    constructor(props) {
        super(props);
    }
    getChartInfo=()=>{
        if(this.props.loading){
            return;
        }
        this.props.getAnotherMessages({createAt:this.props.firstMessage.createAt});
    };
    render(){
        const {moreThanMsg,firstMessage} = this.props;
        if(moreThanMsg&&firstMessage){
            return (
                <div className="text-center">
                   <a href="javascript:;" className="loading-more" onClick={this.getChartInfo}>加载更多 <i className="fa fa-angle-down"></i></a>
                </div>
            );
        }else{
            return (<div className="text-center loading-more"> 没有数据了</div>);
        }

    };
}