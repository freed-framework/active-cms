/**
 * @file Floor.jsx
 * @author denglingbo
 *
 * Des
 */
/// <reference path="./floor.d.ts" />
import * as React from 'react';
import './floor.scss';

class Floor extends React.PureComponent<AppProps, any> {
    render() {
        const { attrs = {} } = this.props;
        const { style = {}, anchor } = attrs;

        return (
            <div
                id={anchor}
                className="as-floor"
                style={{
                    ...(style && {...style.layout, 'background-position': 'center center'})
                }}
            >
                {this.props.children}
            </div>
        )
    }
}

export default Floor;
