/**
 * @file Floor.tsx
 * @author denglingbo
 *
 * Des
 */
import * as React from 'react';

interface Props {
    children: any,
}

class Fixer extends React.Component<Props, undefined> {
    render() {
        return (
            <div className="as-fixer">
                {this.props.children}
            </div>
        )
    }
}

export default Fixer;
