import React, {Component, PropTypes} from 'react'
import '../style/chart.scss'
// React component
class ChartContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {height} = this.props;
        var handleSubmitInfo = this.props.handleSubmitInfo.bind(this);
        var handleKeyPress = this.props.handleKeyPress.bind(this);
        return (
            <div className="chart-footer" style={{height:height+'px'}}>
                <div className="input-wrapper">
                    <textarea ref={info => this._info = info} placeholder="Information"
                              onKeyPress={handleKeyPress}></textarea>
                </div>
                <div className="submit-wrapper">
                    <div className="expend-height"></div>
                    <a className="send-message" href="javascript:;" onClick={handleSubmitInfo}>
                        <i className="fa fa-send"> </i>
                    </a>
                </div>
            </div>
        )
    }
}
export default ChartContent;