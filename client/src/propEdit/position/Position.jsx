/**
 * @file PositionEdit.jsx
 * @author shijh
 *
 * 元素位置编辑
 */
import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { editComponentByGuid } from '../../pages/editor/App';

class PositionEdit extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            top: props.style.top,
            left: props.style.left,
            right: props.style.right,
            buttom: props.style.buttom
        }
    }

    handleSubmitPosition = (event) => {
        if (event.keyCode !== 13) return;
        // 要修改某个元素的对应关系, layout, main, ...
        const { target, guid } = this.props;
        const attr = event.currentTarget.getAttribute('data-attr');
        const value = event.currentTarget.value;
        const keys = ['componentProps', 'style', target, attr];

        this.setState({
            [attr]: value,
        });

        editComponentByGuid(
            guid,
            keys,
            value,
        );
    }

    /**
     * 回车修改input数据
     */
    handleChangePosition = (event) => {
        const attr = event.currentTarget.getAttribute('data-attr');
        const value = event.currentTarget.value;

        this.setState({
            [attr]: value,
        });
    }

    render() {
        const { top, right, buttom, left } = this.state;

        return (
            <div>
                <div>Tips: 点击区域若为绝对定位，请将外层布局的定位设置为相对定位并设置高度</div>
                <div className="ec-editor-basic-props ec-editor-basic-props-top">
                    <label htmlFor="">上</label>
                    <input
                        type="text"
                        data-attr="top"
                        onChange={this.handleChangePosition}
                        onKeyUp={this.handleSubmitPosition}
                        value={top}
                    />
                </div>

                <div className="ec-editor-basic-props ec-editor-basic-props-left">
                    <label htmlFor="">左</label>
                    <input
                        type="text"
                        data-attr="left"
                        onChange={this.handleChangePosition}
                        onKeyUp={this.handleSubmitPosition}
                        value={left}
                    />
                </div>

                <div className="ec-editor-basic-props ec-editor-basic-props-right">
                    <label htmlFor="">右</label>
                    <input
                        type="text"
                        data-attr="right"
                        onChange={this.handleChangePosition}
                        onKeyUp={this.handleSubmitPosition}
                        value={right}
                    />
                </div>

                <div className="ec-editor-basic-props ec-editor-basic-props-buttom">
                    <label htmlFor="">下</label>
                    <input
                        type="text"
                        data-attr="buttom"
                        onChange={this.handleChangePosition}
                        onKeyUp={this.handleSubmitPosition}
                        value={buttom}
                    />
                </div>
            </div>
        )
    }
}

PositionEdit.defaultProps = {
    style: {},
}

export default PositionEdit;
