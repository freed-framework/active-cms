/**
 * @file Floor.jsx
 * @author denglingbo
 *
 * Des
 */
import React, { PureComponent } from 'react';
import './floor.scss';

class Floor extends PureComponent {
    render() {
        const { style } = this.props;

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
                floor layout

                {this.props.children}
            </div>
        )
    }
}

export default Floor;
