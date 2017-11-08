/// <reference path="./col.d.ts" />
import * as React from 'react';

export default class Img extends React.Component<ColProps, any> {
    render() {
        const { attrs = {}, id } = this.props;
        const { style = {}, src = '' } = attrs;

        return (
            <div
                id={id}
                className="tmc-list-col"
                data-module={this.props.module}
                style={{
                    ...(style && {...style.layout})
                }}
            >
                {this.props.children}
            </div>
        )
    }
}
