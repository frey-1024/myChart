import React, {Component, PropTypes} from 'react'
import SignInNav from '../../core/containers/signInNav.jsx'
import ChartContent from '../containers/chartContent.jsx'
import OnlineUsers from '../containers/onlineUsers.jsx'

class Chart extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <SignInNav/>
                <div className="container chart-wrapper">
                    <OnlineUsers/>
                    <ChartContent/>
                </div>
            </div>
        )
    }
}
export default Chart;