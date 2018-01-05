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
        const {
            id,
            cols,
            style,
            dataTable,
            className
        } = this.props;

        return (
            <div
                id={id}
                className={`${className} tmc-list-cols-${cols}`}
                {...(dataTable && { ...dataTable })}
                style={{
                    ...(style && {...style.layout, 'backgroundPosition': 'top center', 'backgroundRepeat': 'no-repeat'})
                }}
            >
                { this.props.children }
            </div>
        );
    }
}

export default List;
