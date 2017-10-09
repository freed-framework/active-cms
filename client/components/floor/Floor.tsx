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
        const { attrs = {}, guid } = this.props;
        const { style = {} } = attrs;

        return (
            <div
                data-guid={guid}
                className="as-floor"
                style={{
                    ...(style && {...style.layout})
                }}
            >
                {this.props.children}
            </div>
        )
    }
}

export default Floor;
