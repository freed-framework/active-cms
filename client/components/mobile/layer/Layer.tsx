/**
 * @file Floor.jsx
 * @author denglingbo
 *
 * Des
 */
/// <reference path="./layer.d.ts" />
import * as React from 'react';
import './layer.scss';

class Layer extends React.PureComponent<Props, any> {
    render() {
        const { id, style = {} } = this.props;

        return (
            <div
                id={id}
                className="tmc-layer"
                data-module={this.props.module}
                style={{
                    ...(style && {...style.layout, 'backgroundPosition': 'center center'})
                }}
            >
                {this.props.children}
            </div>
        )
    }
}

export default Layer;
