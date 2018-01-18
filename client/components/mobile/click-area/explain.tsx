import React, { Component } from 'react';
import ReactDom from 'react-dom';

export default class Explain extends Component<any, any> {
    wrapEle: any;
    popup: any;
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {//新建一个div标签并塞进body
        this.wrapEle = document.querySelector(".ec-editor-canvas-inner") || document.body;
        this.popup = document.createElement("div");
        this.wrapEle.appendChild(this.popup);
        this._renderLayer();
    }

    componentDidUpdate() {
        this._renderLayer();
    }

    componentWillUnmount() {//在组件卸载的时候，保证弹层也被卸载掉
        ReactDom.unmountComponentAtNode(this.popup);
        this.wrapEle.removeChild(this.popup);
    }

    handleClick = (e: any) => {
        const { onClose } = this.props;

        onClose && onClose(e);
    }

//     handleMask = (e) => {
//         const { maskClosable = false } = this.props;
// console.log(e)
//         if(maskClosable) {
//             this.handleClick();
//         }
//     }

    _renderLayer() {//将弹层渲染到body下的div标签
        ReactDom.render(this._renderDiv(), this.popup);
    }
// this.handleMask
    _renderDiv(): any {
        const { children, title, okText, width, top } = this.props;
        return (
            <div>
                <div
                    className="ec-modal-mask"
                ></div>
                <div
                    className="ec-modal-wrap"
                    role="dialog"
                >
                    <div
                        role="document"
                        className="ec-modal"
                        style={{"width": width, "top": top}}
                    >
                        <div className="ec-modal-content">
                            <div className="ec-modal-header">
                                <div className="ec-modal-title">{title || '提示'}</div>
                            </div>
                            <div className="ec-modal-body">
                                { children }
                            </div>
                            <div
                                className="ec-modal-footer"
                                onClick={this.handleClick}
                            >
                                <button type="button" className="ec-btn">
                                    <span>{okText || '确认'}</span>
                                </button>
                            </div>
                        </div>
                        <div style={{ "width": "0px", "height": "0px", "overflow": "hidden" }}>sentinel</div>
                    </div>
                </div>
            </div>
        )
    }

    render(): any {
        return null;
    }
}
