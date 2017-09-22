/**
 * @file Floor.tsx
 * @author denglingbo
 *
 * Des
 */
import * as React from 'react';

interface Props {
    children?: React.ReactNode,
    attrs?: {style?: any}
}

class Fix extends React.Component<Props, undefined> {
    render() {
        const { attrs = {} } = this.props;
        const { style = {} } = attrs;
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

export default Fix;
