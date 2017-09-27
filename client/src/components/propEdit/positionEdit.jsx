/**
 * @file PositionEdit.jsx
 * @author shijh
 *
 * 元素位置编辑
 */
import React, { PureComponent } from 'react';
import { InputNumber } from 'antd';

import { editComponent, editComponentByOption } from '../../pages/editor/App';

class PositionEdit extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            top: props.style.top,
            left: props.style.left,
            right: props.style.right,
            button: props.style.button
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
        editComponentByOption({guid, attr: option, target, value});
    }

    render() {
        const { target, guid } = this.props;

        return (
            <div>
                <div>{target}</div>

                <div className="as-editor-basic-props as-editor-basic-props-top">
                    <label htmlFor="">上</label>
                    <InputNumber
                        min={1}
                        type="text"
                        data-guid={guid}
                        data-target={target}
                        data-attr="top"
                        onChange={(value) => this.handleChange({option: 'top', value})}
                        value={this.state.top}
                    />
                </div>

                <div className="as-editor-basic-props as-editor-basic-props-left">
                    <label htmlFor="">左</label>
                    <InputNumber
                        min={1}
                        data-guid={guid}
                        data-target={target}
                        data-attr="left"
                        onChange={(value) => this.handleChange({option: 'left', value})}
                        value={this.state.left}
                    />
                </div>

                <div className="as-editor-basic-props as-editor-basic-props-right">
                    <label htmlFor="">右</label>
                    <InputNumber
                        min={1}
                        data-guid={guid}
                        data-target={target}
                        data-attr="right"
                        onChange={(value) => this.handleChange({option: 'right', value})}
                        value={this.state.right}
                    />
                </div>

                <div className="as-editor-basic-props as-editor-basic-props-button">
                    <label htmlFor="">下</label>
                    <InputNumber
                        min={1}
                        data-guid={guid}
                        data-target={target}
                        data-attr="button"
                        onChange={(value) => this.handleChange({option: 'button', value})}
                        value={this.state.button}
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
