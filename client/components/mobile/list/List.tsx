/**
 * @file List.tsx
 * @author denglingbo
 *
 * 商品列表
 */
import * as React from 'react';

export interface ListProps {
    children: Array<any>;
    module?: string;
    id: string;

    data?: Array<any>;

    attrs?: {
        style?: any;
    }
}

export interface ListState {
    data: Array<any>;
}

class List extends React.Component<ListProps, ListState> {
    constructor(props: ListProps) {
        super(props);

        this.state = {
            data: props.data,
        }
    }

    render() {
        const { attrs = {} } = this.props;
        const { style = {} } = attrs;

        return (
            <div
                {...this.props}
                style={{...style.layout}}
                className="tmc-list"
            >
            </div>
        );
    }
}

export default List;
