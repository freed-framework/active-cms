/// <reference path="./list.d.ts" />
import * as React from 'react';
import config from './config';
import componentPropsHoc from '../../common/hoc/componentPropsHoc';
import './list.scss';

@componentPropsHoc({
    config,
})
class List extends React.PureComponent<ListProps, any> {
    static defaultProps = {
        cols: 2,
    }

    render() {
        const { id, cols, style, dataTable = null, className } = this.props;

        return (
            <div
                id={id}
                className={`${className} tmc-module tmc-list tmc-list-cols-${cols}`}
                {...(dataTable && { ...dataTable })}
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
