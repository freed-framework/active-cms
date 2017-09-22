/**
 * @file Floor.tsx
 * @author denglingbo
 *
 * Des
 */
import * as React from 'react';

interface Props {
    children?: React.ReactNode,
    attrs?: {style?: any, src?: string},
}

class Img extends React.Component<Props, undefined> {
    render() {
        console.log(this.props)
        const { attrs = {} } = this.props;
        const { src = '', style = {} } = attrs;
        return (
            <div>
            <img
                src={src}
                style={{
                    ...(style && {...style.layout})
                }}
            />
                {this.props.children}
            </div>
        )
    }
}
export default Img;
