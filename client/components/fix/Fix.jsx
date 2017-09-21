/**
 * @file Floor.tsx
 * @author denglingbo
 *
 * Des
 */
import * as React from 'react';


class Img extends React.Component {
    render() {
        const { style } = this.props;
        return (
            <div
                className="as-fix"
                style={{
                    ...(style && {...style.layout})
                }}
            >
                {this.props.children}
            </div>
        )
    }
}
export default Img;
