import React,{Component} from 'react'

export default class elementIf extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        if(this.props.status){
            return (
                <div>
                    {React.Children.map(this.props.children, function (child) {
                        return <li>{child}</li>;
                    })}
                </div>
            )
        }else{
            return <div></div>
        }
    }
}