/**
 * @file PropsEdit.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import Basic from './Basic';
import Position from './position';
import Attr from './attr';
import Radio from './Radio';
import multiData from './multiData';

import './propsEdit.scss';

class PropsEdit extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { compKey } = this.props;
        if (compKey === 'basic') {
            return <Basic {...this.props} />;
        } else if (compKey === 'position') {
            return <Position {...this.props} />;
        } else if (compKey === 'attrs') {
            return <Attr {...this.props} />;
        } else if (compKey === 'radio') {
            return <Radio {...this.props} />
        } else if (compKey === 'multiData') {
            return <multiData {...this.props} />
        }
        return null;
    }
}

export default PropsEdit;
