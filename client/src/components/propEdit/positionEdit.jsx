/**
 * @file PositionEdit.jsx
 * @author shijh
 *
 * 元素位置编辑
 */
import React, { PureComponent } from 'react';
import { editComponent } from '../../pages/editor/App';

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

    handleChange = (event) => {
        const attr = event.currentTarget.getAttribute('data-attr');

        this.setState({
            [attr]: event.currentTarget.value,
        });

        editComponent(event);
    }

    render() {
        const { target, guid } = this.props;

        return (
            <div>
                <div>{target}</div>

                <div className="as-editor-basic-props as-editor-basic-props-top">
                    <label htmlFor="">上</label>
                    <input
                        type="text"
                        data-guid={guid}
                        data-target={target}
                        data-attr="top"
                        onChange={this.handleChange}
                        value={this.state.top}
                    />
                </div>

                <div className="as-editor-basic-props as-editor-basic-props-left">
                    <label htmlFor="">左</label>
                    <input
                        type="text"
                        data-guid={guid}
                        data-target={target}
                        data-attr="left"
                        onChange={this.handleChange}
                        value={this.state.left}
                    />
                </div>

                <div className="as-editor-basic-props as-editor-basic-props-right">
                    <label htmlFor="">右</label>
                    <input
                        type="text"
                        data-guid={guid}
                        data-target={target}
                        data-attr="right"
                        onChange={this.handleChange}
                        value={this.state.right}
                    />
                </div>

                <div className="as-editor-basic-props as-editor-basic-props-button">
                    <label htmlFor="">下</label>
                    <input
                        type="text"
                        data-guid={guid}
                        data-target={target}
                        data-attr="button"
                        onChange={this.handleChange}
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
