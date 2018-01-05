/**
 * @file Floor.jsx
 * @author denglingbo
 *
 * Des
 */
/// <reference path="./layer.d.ts" />
import * as React from 'react';
import config from './config';
import componentPropsHoc from '../../common/hoc/componentPropsHoc';
import './layer.scss';

@componentPropsHoc({
    config,
})
class Layer extends React.PureComponent<LayerProps, any> {
    render() {
        const {
            id,
            style = {},
            dataTable,
            className,
        } = this.props;

        return (
            <div
                id={id}
                className={className}
                {...(dataTable && { ...dataTable })}
                style={{
                    ...(style && {...style.layout, 'backgroundPosition': 'center center', 'backgroundRepeat': 'no-repeat'})
                }}
            >
                {this.props.children}
            </div>
        )
    }
}

export {
    config,
}

export default Layer;
