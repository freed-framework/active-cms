/// <reference path="./img.d.ts" />
import * as React from 'react';

class Img extends React.Component<ImgProps, any> {
    render() {
        const { attrs = {}, id } = this.props;
        const { style = {}, src = '' } = attrs;

        return (
            <div
                id={id}
                className="tmc-img"
                data-module={this.props.module}
                style={{
                    ...(style && {...style.layout})
                }}
            >
                <img src={src} />
                {/* {this.props.children} */}
            </div>
        )
    }
}

export default Img;
