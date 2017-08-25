/**
 * @file Floor.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';

class Floor extends PureComponent {
    render() {
        return (
            <div className="as-floor">
                floor layout

                {this.props.children}
            </div>
        )
    }
}

export default Floor;
