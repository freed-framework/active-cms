/**
 * @file basicEdit.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import { editComponent } from '../../pages/editor/App';
import ColorPicker from '../colorPicker';

class AttrEdit extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            src: props.src
        }
    }

    handleChange = (event) => {
        const attr = event.currentTarget.getAttribute('data-attr');

        this.setState({
            [attr]: event.currentTarget.value,
        });

        editComponent(event, 'attr');
    }

    render() {
        const { target, guid, label } = this.props;

        return (
            <div>
                {/* <div>{target}</div> */}
                <div className="ec-editor-basic-props ec-editor-basic-props-attr">
                    <label htmlFor="">{label}</label>
                    <input
                        type="text"
                        data-guid={guid}
                        data-target={target}
                        data-attr="src"
                        onChange={this.handleChange}
                        value={this.state.src}
                    />
                </div>
            </div>
        )
    }
}

AttrEdit.defaultProps = {
    style: {},
}

export default AttrEdit;
