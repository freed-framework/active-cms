/**
 * @file PropsEdit.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import BasicEdit from './basicEdit';
import './propsEdit.scss';

class PropsEdit extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { compKey } = this.props;

        if (compKey === 'basic') {
            return (
                <BasicEdit
                    {...this.props}
                />
            )
        }

        return null;
    }
}

export default PropsEdit;
