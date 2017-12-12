/// <reference path="./list.d.ts" />
import * as React from 'react';
import config from './config';
import './list.scss';

class List extends React.Component<ListProps, any> {
    static config: Config = config;

    static defaultProps = {
        cols: 2,
    }

    render() {
        const { id, cols, style, module } = this.props;

        return (
            <div
                id={id}
                className={`tmc-module tmc-list tmc-list-cols-${cols}`}
                data-module={module}
                style={{
                    ...(style && {...style.layout})
                }}
            >
                { this.props.children }
            </div>
        );
    }
}

export default List;
