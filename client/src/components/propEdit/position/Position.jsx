/**
 * @file PositionEdit.jsx
 * @author shijh
 *
 * 元素位置编辑
 */
import React, { PureComponent } from 'react';
import { InputNumber } from 'antd';

import { editComponent, editComponentByType } from '../../../pages/editor/App';

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

    // handleChange = (event) => {
    //     console.log(event)
    //     const attr = event.currentTarget.getAttribute('data-attr');

    //     this.setState({
    //         [attr]: event.currentTarget.value,
    //     });

    //     editComponent(event);
    // }

    handleChange = ({option, value}) => {
        const { target, guid } = this.props;
        this.setState({
            [option]: value
        })
        editComponentByType({guid, attr: option, target, value});
    }

    render() {
        const { target, guid } = this.props;
        const { top, right, buttom, left } = this.state;

        return (
            <div>
                <div>{target}</div>

                <div className="ec-editor-basic-props ec-editor-basic-props-top">
                    <label htmlFor="">上</label>
                    <InputNumber
                        min={1}
                        type="text"
                        data-guid={guid}
                        data-target={target}
                        data-attr="top"
                        onChange={(value) => this.handleChange({option: 'top', value})}
                        value={top}
                    />
                </div>

                <div className="ec-editor-basic-props ec-editor-basic-props-left">
                    <label htmlFor="">左</label>
                    <InputNumber
                        min={1}
                        data-guid={guid}
                        data-target={target}
                        data-attr="left"
                        onChange={(value) => this.handleChange({option: 'left', value})}
                        value={left}
                    />
                </div>

                <div className="ec-editor-basic-props ec-editor-basic-props-right">
                    <label htmlFor="">右</label>
                    <InputNumber
                        min={1}
                        data-guid={guid}
                        data-target={target}
                        data-attr="right"
                        onChange={(value) => this.handleChange({option: 'right', value})}
                        value={right}
                    />
                </div>

                <div className="ec-editor-basic-props ec-editor-basic-props-buttom">
                    <label htmlFor="">下</label>
                    <InputNumber
                        min={1}
                        data-guid={guid}
                        data-target={target}
                        data-attr="buttom"
                        onChange={(value) => this.handleChange({option: 'buttom', value})}
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
