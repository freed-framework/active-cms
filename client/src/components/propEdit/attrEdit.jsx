/**
 * @file basicEdit.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import { editComponent } from '../../pages/editor/App';

class AttrEdit extends PureComponent {
    constructor(props) {
        super(props);
        const { target, attribute } = props;

        this.state = {
            [target]: attribute[target]
        }
    }

    handleChange = (event) => {
        const attr = event.currentTarget.getAttribute('data-attr');
        const {target} = this.props;

        this.setState({
            [target]: event.currentTarget.value,
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
                        onChange={this.handleChange}
                        value={this.state[target]}
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
