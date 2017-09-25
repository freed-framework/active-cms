/**
 * @file PropsEdit.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import BasicEdit from './basicEdit';
import PositionEdit from './positionEdit';
import AttrEdit from './attrEdit';

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
        } else if (compKey === 'attrs') {
            return <AttrEdit {...this.props} />;
        }
        return null;
    }
}

export default PropsEdit;
