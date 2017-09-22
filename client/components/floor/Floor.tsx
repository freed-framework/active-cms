/**
 * @file Floor.jsx
 * @author denglingbo
 *
 * Des
 */

import * as React from 'react';
import './floor.scss';

export interface AppProps {
    children?: any,
    attrs?: {style?: any}
}

class Floor extends React.PureComponent<AppProps, any> {
    render() {
        const { attrs = {} } = this.props;
        const { style = {} } = attrs;

        return (
            <div
                onClick={() => {
                    console.log(123333333333333333333333)
                }}
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
