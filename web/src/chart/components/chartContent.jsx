import React, {Component, PropTypes} from 'react'
import ChartMessage from '../containers/chartMessage.jsx'
import InputMessage from '../containers/inputMessage.jsx'
import GetDragValue from '../../core/components/dragMoveValue.jsx'
import '../style/chart.scss'
// React component
class ChartContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        //const {cacheHeight,moveByDrag} = this.props;
        var cacheHeight = this.props.cacheHeight.bind(this);
        var moveByDrag = this.props.moveByDrag.bind(this);
        return (
            <div className="content-wrapper">
                <div className="chart-header">
                    <strong>聊天内容</strong>
                </div>
                
                <ChartMessage/>
                
                <GetDragValue moveCallBack={moveByDrag} upCallBack={cacheHeight}/>
                
                <InputMessage/>
            </div>
        )
    }
}
export default ChartContent;