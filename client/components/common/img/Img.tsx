/**
 * @file Img.tsx
 * @author denglingbo
 *
 * Des
 */
import * as React from 'react';

interface Props {
    children?: React.ReactNode,
    attrs?: {
        style?: any;
        src?: string;
        distance?: string;
    }
}

class Img extends React.Component<Props, undefined> {
    render() {
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
            </div>
        )
    }
}
export default Img;
