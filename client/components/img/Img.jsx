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
            <div>
            <img
                src={'https://static.yatang.cn/fmf/BBC0011/staticresource/img/20170821163422188_217.jpg'}
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
