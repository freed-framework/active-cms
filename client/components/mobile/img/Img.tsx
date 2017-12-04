/// <reference path="./img.d.ts" />
import * as React from 'react';
import config from './config';
import './img.scss';
import Native from '../native/index.js';
import LazyLoad from '../lazy-load/index.js';

class Img extends React.Component<ImgProps, any> {
    static config: Config = config;

    constructor(props: ImgProps) {
        super(props);
    }

    handleClick = () => {
        console.log('IMG: ', this.props.url);
        Native.redirect(this.props.url);
    }

    render() {
        const { id, style = {}, src = '', extendsProps = {}, isEdit } = this.props;

        const styleProps = {
            ...(style && { ...style.layout }),
            ...(extendsProps && extendsProps.style && { ...extendsProps.style.layout })
        };

        const child = isEdit ?
            ( <img src={src} /> ) :
            (
                <LazyLoad
                    overflow
                >
                    <img src={src} />
                </LazyLoad>
            );

        return (
            <div
                id={id}
                className="tmc-img"
                data-module={this.props.module}
                onClick={this.handleClick}
                style={styleProps}
            >
                { child }
            </div>
        )
    }
}

export default Img;
