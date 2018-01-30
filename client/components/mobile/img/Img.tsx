/// <reference path="./Img.d.ts" />
import * as React from 'react';
import redirect from '../../../node_modules/freed-multi/lib/native/redirect';
import config from './config';
import componentPropsHoc from '../../common/hoc/componentPropsHoc';
import LazyLoad from '../lazy-load/index.js';
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
        const {
            id,
            style = {},
            src = '',
            extendsProps = {},
            isEdit,
            dataTable,
            className
        } = this.props;

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
                className={className}
                {...(dataTable && { ...dataTable })}
                onClick={this.handleClick}
                style={styleProps}
            >
                {src === '' ?
                    this.props.children : child
                }
            </div>
        )
    }
}

export default Img;
