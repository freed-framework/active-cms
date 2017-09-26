/**
 * @file Floor.tsx
 * @author denglingbo
 *
 * Des
 */
import * as React from 'react';
/// <reference path="../../declaration.d.ts">
// import Style from './index.scss';

interface Props {
    children?: React.ReactNode,
    attrs?: {style?: any, distance?: string}
}

class Fix extends React.Component<Props, undefined> {

    render() {
        const { attrs = {} } = this.props;
        const { style = {}, distance = 0 } = attrs;
        return (
            <div
                className='as-fix'
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
