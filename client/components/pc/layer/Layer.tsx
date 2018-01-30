/**
 * @file Floor.jsx
 * @author denglingbo
 *
 * Des
 */
import * as React from 'react';
import config from './config';
import './layer.scss';

class Layer extends React.PureComponent<any, any> {
    static config: Config = config;

    render() {
        const { style = {}, id } = this.props;

        return (
            <div
                id={id}
                className="tc-layer"
                data-module={this.props.module}
            >
                {this.props.children}
            </div>
        )
    }
}

export default Layer;
