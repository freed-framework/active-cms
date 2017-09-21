/**
 * @file Floor.jsx
 * @author denglingbo
 *
 * Des
 */
import * as React from 'react';

interface FixerProps {
    children: any,
}

class Fixer extends React.Component<FixerProps, undefined> {
    render() {
        return (
            <div className="as-fixer">
                Fixer layout

                {this.props.children}
            </div>
        )
    }
}
export default Fixer;
