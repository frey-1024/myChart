import React,{Component} from 'react';
import '../style/header.scss'

export default class LoadingBar extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        const {isLoading} = this.props;
        var barClass='butterbar';
        if(isLoading){
            barClass+=' active';
        }
        return (
            <div className={`${barClass}`}>
                <span className="bar"></span>
            </div>
        );
    };
}