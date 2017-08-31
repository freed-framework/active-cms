/**
 * @file PropsEdit.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import { editComponent } from '../../App';
import './propsEdit.scss';

class PropsEdit extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            value: props.defaultValue,
        }

        this.handleChange = ::this.handleChange;
    }

    handleChange(event) {
        this.setState({
            value: event.currentTarget.value,
        });

        editComponent(event);
    }

    render() {
        const { guid, type } = this.props;

        return (
            <div>
                <label htmlFor="">{type}</label>
                <input
                    type="text"
                    data-guid={guid}
                    data-attr={type}
                    onChange={this.handleChange}
                    value={this.state.value}
                />
            </div>
        )
    }
}

export default PropsEdit;
