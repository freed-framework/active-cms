/// <reference path="./list.d.ts" />
import * as React from 'react';

class List extends React.Component<ListProps, any> {
    render() {
        const { attrs = {}, id } = this.props;
        const { style = {}, src = '' } = attrs;

        return (
            <div
                id={id}
                className="tmc-list"
                data-module={this.props.module}
                style={{
                    ...(style && {...style.layout})
                }}
            >
                {this.props.children}
            </div>
        );
    }
}

export default List;
