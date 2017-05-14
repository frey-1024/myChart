import { connect } from 'react-redux'
//import fetch from 'isomorphic-fetch'
import ChartContent from '../components/chartContent.jsx'
import {changeMessageHeight,changeInputHeight} from '../actions/chartAction.jsx'

function mapStateToProps(state) {
    return {}
}

const MESSAGE_HEIGHT=540,
      INPUT_HEIGHT=100;
var prevMessageHeight= MESSAGE_HEIGHT,
    prevInputHeight=INPUT_HEIGHT,
    messageHeight=MESSAGE_HEIGHT,
    inputHeight=INPUT_HEIGHT;

function mapDispatchToProps(dispatch,state) {
    return {
        cacheHeight :function() {
            prevMessageHeight = messageHeight;
            prevInputHeight = inputHeight;
        },
        moveByDrag :function(data){
            if (messageHeight < INPUT_HEIGHT && data.top < 0 || messageHeight > MESSAGE_HEIGHT && data.top > 0) {
                return;
            }
            messageHeight = prevMessageHeight + data.top;
            inputHeight = prevInputHeight - data.top;
            dispatch(changeMessageHeight({height:messageHeight}));
            dispatch(changeInputHeight({height:inputHeight}));
        }
    }
}

// Connected Component
const chartContentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChartContent);

export default chartContentContainer;