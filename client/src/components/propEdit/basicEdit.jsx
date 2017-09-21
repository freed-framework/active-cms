/**
 * @file basicEdit.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import { editComponent } from '../../pages/editor/App';

class BasicEdit extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            width: props.style.width,
            height: props.style.height,
            margin: props.style.margin,
            padding: props.style.padding,
            border: props.style.border,
            background: props.style.background
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

                <div className="as-editor-basic-props as-editor-basic-props-width">
                    <label htmlFor="">宽度</label>
                    <input
                        type="text"
                        data-guid={guid}
                        data-target={target}
                        data-attr="width"
                        onChange={this.handleChange}
                        value={this.state.width}
                    />
                </div>

                <div className="as-editor-basic-props as-editor-basic-props-height">
                    <label htmlFor="">高度</label>
                    <input
                        type="text"
                        data-guid={guid}
                        data-target={target}
                        data-attr="height"
                        onChange={this.handleChange}
                        value={this.state.height}
                    />
                </div>

                <div className="as-editor-basic-props as-editor-basic-props-margin">
                    <label htmlFor="">外边距</label>
                    <input
                        type="text"
                        data-guid={guid}
                        data-target={target}
                        data-attr="margin"
                        onChange={this.handleChange}
                        value={this.state.margin}
                    />
                </div>

                <div className="as-editor-basic-props as-editor-basic-props-padding">
                    <label htmlFor="">内边距</label>
                    <input
                        type="text"
                        data-guid={guid}
                        data-target={target}
                        data-attr="padding"
                        onChange={this.handleChange}
                        value={this.state.padding}
                    />
                </div>

                <div className="as-editor-basic-props as-editor-basic-props-border">
                    <label htmlFor="">边框</label>
                    <input
                        type="text"
                        data-guid={guid}
                        data-target={target}
                        data-attr="border"
                        onChange={this.handleChange}
                        value={this.state.border}
                    />
                </div>

                <div className="as-editor-basic-props as-editor-basic-props-background">
                    <label htmlFor="">背景</label>
                    <input
                        type="text"
                        data-guid={guid}
                        data-target={target}
                        data-attr="background"
                        onChange={this.handleChange}
                        value={this.state.background}
                    />
                </div>
            </div>
        )
    }
}

BasicEdit.defaultProps = {
    style: {},
}

export default BasicEdit;
