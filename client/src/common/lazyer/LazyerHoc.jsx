/**
 * @file Lazyer.js
 * @author denglingbo
 *
 * Des
 */

import React from 'react';
import Lazyer from './Lazyer';

const LazyerHoc = WarppedComponent => class extends Lazyer {
    render() {
        return (
            <WarppedComponent
                {...this.props}
                {...this.state.mod}
            >
                {this.props.children}
            </WarppedComponent>
        )
    }
}

export default LazyerHoc;
