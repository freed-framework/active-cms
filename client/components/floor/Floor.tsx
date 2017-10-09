/**
 * @file Floor.jsx
 * @author denglingbo
 *
 * Des
 */
/// <reference path="./floor.d.ts" />
import * as React from 'react';
import './floor.scss';

class Floor extends React.PureComponent<Props, any> {
    render() {
        const { attrs = {}, id } = this.props;
        const { style = {} } = attrs;

        return (
            <div
                id={id}
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
