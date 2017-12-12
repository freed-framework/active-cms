/// <reference path="./img.d.ts" />
import * as React from 'react';
import config from './config';
// <TODO> 暂时使用当前组件项目下
import componentPropsHoc from '../../common/hoc/componentPropsHoc';
import LazyLoad from '../lazy-load/index.js';
import redirect from 'freed-multi/lib/native/redirect.js';
import './img.scss';

@componentPropsHoc({
    config,
})
class Img extends React.PureComponent<ImgProps, any> {
    constructor(props: ImgProps) {
        super(props);
    }

    handleClick = () => {
        redirect(this.props.url, {});
    }

    render() {
        const { id, style = {}, src = '', extendsProps = {}, isEdit, dataTable = null, className } = this.props;

        const styleProps = {
            ...(style && { ...style.layout }),
            ...(extendsProps && extendsProps.style && { ...extendsProps.style.layout })
        };

        const child = isEdit ?
            ( <img src={src} /> ) :
            (
                <LazyLoad overflow>
                    <img src={src} />
                </LazyLoad>
            );

        return (
            <div
                id={id}
                className={`${className} tmc-module tmc-img`}
                {...(dataTable && { ...dataTable })}
                onClick={this.handleClick}
                style={styleProps}
            >
                { child }
                { src === '' && this.props.children }
            </div>
        )
    }
}

export default Img;
