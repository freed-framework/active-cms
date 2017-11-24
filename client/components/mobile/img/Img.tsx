/// <reference path="./img.d.ts" />
import * as React from 'react';
import config from './config';
import './img.scss';

class Img extends React.Component<ImgProps, any> {
    static config: Config = config;

    constructor(props: ImgProps) {
        super(props);
    }

    handleClick = () => {
        // console.log(this.props.url);
        // window.location.href = this.props.url;
    }

    render() {
        const { id, style = {}, src = '', extendsProps = {} } = this.props;

        const styleProps = {
            ...(style && { ...style.layout }),
            ...(extendsProps && extendsProps.style && { ...extendsProps.style.layout })
        };

        return (
            <div
                id={id}
                className="tmc-img"
                data-module={this.props.module}
                onClick={this.handleClick}
                style={styleProps}
            >
                <img src={src} />
            </div>
        )
    }
}

export default Img;
