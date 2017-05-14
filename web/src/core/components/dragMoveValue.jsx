import React, {Component} from 'react'

export default class GetDragValue extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = ()=> {
        var moveCallBack = this.props.moveCallBack,
            upCallBack = this.props.upCallBack,
            dragElement = this.refs.dragIcon;
        dragElement.onmousedown = function (ev) {
            var disX = ev.clientX,
                disY = ev.clientY;
            if (dragElement.setCapture) {
                dragElement.setCapture();
            }
            document.onmousemove = function (ev) {
                moveCallBack({
                    left: ev.clientX - disX,
                    top: ev.clientY - disY
                });
            };
            document.onmouseup = function (ev) {
                document.onmousemove = null;
                if (dragElement.releaseCapture) {
                    dragElement.releaseCapture()
                }
                upCallBack();
            };
            return false;
        };
    };

    render() {
        return (<div className="drag-wrapper" ref="dragIcon">
            <div className="drag-line"></div>
        </div>);
    }
}