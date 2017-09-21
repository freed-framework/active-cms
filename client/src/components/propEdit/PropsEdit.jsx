/**
 * @file PropsEdit.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import BasicEdit from './basicEdit';
import PositionEdit from './positionEdit';

import './propsEdit.scss';

class PropsEdit extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { compKey } = this.props;
        console.log(compKey)
        if (compKey === 'basic') {
            return <BasicEdit {...this.props} />;
        } else if (compKey === 'position') {
            return <PositionEdit {...this.props} />;
        }
        return null;
    }
}

export default PropsEdit;
