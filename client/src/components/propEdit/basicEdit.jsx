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

                <div className="as-editor-basic-props-width">
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

                <div className="as-editor-basic-props-height">
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
            </div>
        )
    }
}

BasicEdit.defaultProps = {
    style: {},
}

export default BasicEdit;
