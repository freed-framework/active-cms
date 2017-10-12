/**
 * @file LayerCake
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import { is } from 'immutable';
import classNames from 'classnames';

class LayerCake extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        console.log(nextProps)
    }

    render() {
        console.log(this.state.data)
        return null;
    }
}

export default LayerCake;
